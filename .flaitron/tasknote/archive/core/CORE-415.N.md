---
title: cue-emoji-legibility audit
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-415, CORE-415.1, CORE-415.2, CORE-415.3, CORE-415.4]
---

# CORE-415.N | cue-emoji-legibility audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-415]]

## 🎯 Goal

Verify the completed `CORE-EPIC-415` (`cue-emoji-legibility`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing — **N/A: no follow-up candidates.** All four findings were small, in-scope, and fixed inline
- [x] Single `feat: CORE-415.N — audit CORE-EPIC-415` commit lands
- [x] PLAN.md line for `CORE-415.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-415.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-415` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-415.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-415]] — parent epic (cue-emoji-legibility)
- [[CORE-415.1]] — epic Discovery (scoping table + design-surface inventory)
- [[CORE-415.2]] — the contract child (`SPEC/gates.md` + `SPEC.md`)
- [[CORE-415.3]] — the propagation child (8 downstream emission sites)
- [[CORE-415.4]] — viz verification pass (conditional child, closed as no-op)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-415` active in `## Medium`; children `.1`–`.4` all `[x]`; `.N` the only open child. No open siblings, so the skill's early-audit gate did not fire.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-415.N`; pre-flight passed (flowtron self-host layout, clean working tree, `.N` is the epic's reserved terminal audit child). Full cohort closed 2026-08-08 across four commits — a same-day cohort is exactly the case where per-child Phase 4 sweeps can each be locally correct while the cohort carries cumulative drift.

- [x] Read relevant source files — all four archived cohort tasknotes (`CORE-415.1`–`.4`), the four cohort commits (`815e56a`, `3ee4e6a`, `8a27d0d`, `bbf0d0e`) diffed at HEAD, `SPEC/gates.md` (full, post-cohort), `SPEC.md` §"Operator-cue glossary" / §"🧪 Phase 3", `SPEC/model.md`, `SPEC/procedures/ft-task.md`, `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`, `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-release/SKILL.md` §7.4, `docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md`, `docs/GLOSSARY.md`, `.flowtron/tasknote/README.md`

- [x] **Best Practices Review** — N/A for module boundaries (markdown contract surface; the one inline code-adjacent check was a read-only verification that `viz/` was untouched). The applicable analogue — **contract-layer coherence** — is what this audit assesses, and is recorded in Implementation Notes.

- [x] **Archive skim** — self-referential for the cohort itself (the four children *are* the archive entries). Non-cohort precedents consulted for the hygiene findings: CORE-381 (`phase4-status-flip` — asserts the YAML flip and backfilled 359 archives), CORE-393 (`phase4-closure-hygiene` — folded the Acceptance tick-through into the Phase 4 box), CORE-042.4 (retired the nav-chip flip; chip is render-derived), CORE-355 (straggler lesson in enumeration mirrors), CORE-065 (two-banner cap).

- [x] **Drift check** — clean. Every path the cohort's notes cite still resolves at HEAD: `SPEC/gates.md:67` §"Glyph layers and reuse", `:141` §"Emphasized inline ask shape", `:137`/`:138` the 🟢/👁️ rows, `SPEC.md:469`/`:572`/`:593`, `SPEC/model.md:131-133`, `SPEC/procedures/ft-task.md:249-251`, `docs/GLOSSARY.md:93`, `docs/DOGFOOD.md:63`, `docs/AGENT-COMPAT.md:137`. No SPEC contract contradicted by this audit's plan.

- [x] No clarifications needed — audit scope is the full four-child cohort, all closed, no partial-cohort ambiguity.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory (deliverable per child, read from the archived notes and verified against the commits).**

| Child | Model | Deliverable | Commit / footprint |
|---|---|---|---|
| `.1` cue-emoji-legibility discovery | [heavy]🧠 | Scoped the epic; filed `.2`–`.4` (43w / 40w / 39w). Key operator decision captured: **keep 👁️, strengthen emission shape** — narrowing the epic from glyph-swap to shape work | `815e56a` — PLAN.md +7 |
| `.2` emoji-surface-contract | [heavy]🧠 | Measured 31 semantic glyphs; explicit **no-change** verdicts for layers 2/3; new §"Emphasized inline ask shape" + §"Glyph layers and reuse"; non-cue residual named | `3ee4e6a` — `SPEC.md` +20/-6, `SPEC/gates.md` +105/-14 |
| `.3` emitter-propagation | [medium]🧩 | Classified all 20 non-archive 👁️ sites by claim type (shape / suppression / existence); retyped 6 falsified + 2 optional mirrors | `8a27d0d` — 8 files, +30/-11 |
| `.4` viz-glyph-tolerance | [light]🔧 | Verification pass: independently confirmed no `viz/`-parsed glyph set moved across the cohort's commits | `bbf0d0e` — no code/doc change |

**Cohort-level verification run independently (not inherited from the children's notes):**

- **Full-repo `👁️` sweep** (39 non-archive hits): every **shape** claim carries the emphasized form; every **suppression** / **existence** claim is untouched. Zero stale `prefix` / `inline emoji only` / `inline prose, not a banner` phrasings survive in shipped files. `.3`'s classification held.
- **Cross-reference resolution**: all six repo-wide references to `§"Emphasized inline ask shape"` and `§"Glyph layers and reuse"` resolve to real headings (`SPEC/gates.md:141` under `### Inline asks:128`; `:67` under `## Operator-cue vocabulary:47`). No heading level skipped.
- **`viz` untouched**: `git show --stat` across all four cohort commits shows zero files under `viz/`. `.4`'s premise verified at source, not by citation.
- **`docs/DOGFOOD.md` cue-render list complete**: all 14 cues present including 👇 `HERE` — CORE-355's straggler fix is intact and was not regressed by `.3`'s edit to the 👁️ line.
- **`viz` suite**: 18 files / 245 tests green, before and after this audit's edits.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — for the one contract edit, matched the sibling row's own shape: the 👁️ row states its shape in the Shape column and defers the argument to the `####` subsection. The 🟢 fix mirrors that exactly rather than inventing new phrasing. For the three archive-hygiene edits, followed CORE-381's established backfill precedent.

- [x] **Minimal refactor gate** — no refactor. Four localized fixes, each restating something the repo already asserts elsewhere; no rule, glyph, gate, or banner added. Deferred: nothing.

- [x] Implemented the minimal solution — 4 files, 1 contract cell + 3 archive-hygiene fixes; **zero glyph changes, zero new contract**

- [x] Updated/added tests for non-trivial behavior — N/A (markdown; no executable surface). `viz` suite run as a regression check.

**Implementation Notes:**

**Cohort coherence verdict: strong.** The three-child split (contract → propagation → viz verification) held its boundaries exactly. `.2` touched only its two owned files; `.3` touched neither of them; `.4` touched nothing. Naming is consistent across the cohort (§"Emphasized inline ask shape" / §"Glyph layers and reuse" are referred to by identical section names at all six citation sites), style parity holds (downstream sites *state* the shape and *link* the rationale, keeping the argument single-sourced), and no contradictory cross-refs survive. `.3`'s decision to preserve the phrase "prose ask" — a defined ask-*modality* term, not a shape claim — was the cohort's best single judgment call and is correct.

Four findings, all small and in scope, **all fixed inline**. No `/ft-file-followup` candidates.

**Finding 1 (Medium) — `SPEC/gates.md:137`: the 🟢 row's Shape cell contradicted its own Notes cell.** `.2` gave 🟢 a *conditional* shape ("when emitted standalone it takes the emphasized shape below") but left the Shape column reading the pre-change `inline ask prefix` — while retyping the 👁️ row's Shape cell directly beneath it. A reader consulting the Shape column, whose entire job is to state the shape, got an answer the same row's Notes cell contradicted. This is internal drift inside the cohort's own primary deliverable, and precisely the class `.2`'s own Acceptance #5 ("so the SPEC.md/gates.md pair carries no internal drift") was written to prevent — it just scoped the check to the cross-file pair and missed the within-row case.

**Fix:** Shape cell → `inline ask prefix (**emphasized** when standalone)`. Faithful restatement of the same row's Notes cell; adds no rule.

**Verified while investigating:** no standalone 🟢 emitter exists today. Both emission sites ride inside the 📦 bundle (`SPEC.md:693` post-closure protocol; `claude/skills/ft-release/SKILL.md:448` §7.4) and inherit banner salience, and `/ft-micro-task` explicitly carries no 🟢 at all (`SPEC.md:695` carve-out). So `.2`'s standalone-🟢 clause is forward-looking contract closing a shape hole, not a rule with stale emitters — which is why `.3`'s 👁️-only propagation sweep was correct to leave the downstream 🟢 sites alone. The defect was confined to the one table cell.

**Finding 2 (Medium) — `CORE-415.4` archived with YAML `status: in-progress`.** SPEC §"🚀 Phase 4: Closure" and `/ft-micro-task` SKILL.md Step 4 line 106 both mandate the `in-progress` → `completed` flip before the move; CORE-381 asserted it and backfilled 359 archives to match. Checked whether this was a wiring gap rather than an execution slip — it is not: the skill's instruction is explicit and correctly placed. A one-off miss on `.4`'s run.

**Fix:** frontmatter flipped to `completed`. (The nav chip's `🟢 In progress` text is left alone — CORE-042.4 retired that write; the chip is render-derived from YAML.)

**Finding 3 (Medium) — `CORE-415.2` archived with all 16 Acceptance + Subtask boxes unticked**, while its own Phase 4 box asserts "every `## ✅ Acceptance` criterion ticked". CORE-393 folded that tick-through into the Phase 4 box specifically to stop this. The note was internally self-contradicting: its narrative claimed completion its checkboxes denied.

**Fix:** all 16 ticked — but only after verifying each against the landed diff rather than trusting the Final Summary. All nine Acceptance criteria are demonstrably satisfied (§"Emphasized inline ask shape" exists at `gates.md:141` under `### Inline asks`; §"Glyph layers and reuse" at `:67` with the 🧩 block replaced by a 3-line pointer at `:215`; the residual list matches the criterion's nine glyphs exactly; both `SPEC.md` mirrors landed; `git show --stat 3ee4e6a` confirms the scope boundary at exactly the two owned files). All eight subtasks likewise verified against the diff.

**Finding 4 (Low) — `CORE-415.1`'s final subtask box unticked** (`Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote`) though demonstrably performed — the note is archived, the sweep is recorded, and the PLAN line is in stub form. **Fix:** ticked.

**Observation (no action) — `.1`'s doc-drift sweep covered 13 of 14 declared entries.** `docs/WORKTREES.md` was omitted from `.1`'s Phase 4 table, and both `.1` and `.2` phrase their Acceptance line as "all 13 entries" against a set that has held 14. Harmless in effect — `.1` was a pure PLAN-filing task, so the verdict would have been "no change", and `.2`/`.3` both swept the full 14 — but it is exactly the cumulative slice-local staleness the fixed doc-drift line exists to surface. Not retro-edited: an archived sweep table is a historical record of what that session actually checked, and rewriting it would launder the miss rather than record it. Logged here instead.

**Observation (no action) — dogfood stamps vs. the changed cue-render protocol.** `.3` added a bold-rendering check to `docs/DOGFOOD.md`'s cue-render list, so the three `dogfooded` rows in `docs/AGENT-COMPAT.md` (`v5.15.0 · 2026-08-02`) now certify a protocol one item shorter than the current one. No action needed: `/ft-release` SKILL.md §5's standing dogfood gate forces per-row resolution at the next release cut, so existing machinery covers it. Bumping the stamps here without a real dogfood run is what `docs/AGENT-COMPAT.md` §"Reading the cells" forbids.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for the changed files (markdown). Ran the full `viz` suite as a regression check, before and after the edits: **18 files / 245 tests passed** both times.

- [x] Ran lint/type-check on changed code — N/A (no executable surface); structural + invariant passes recorded below.

- [x] **Quality assertions** — no code changed; applied to the contract/archive surface instead, below.

- [x] (frontend) Asked the user for visual confirmation — N/A. No frontend surface: this audit edits documents *describing* an ask, and no `viz/` file was touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Invariant 1 — zero glyph changes.** The one contract edit inserts only the words `(**emphasized** when standalone)` into a table cell. No glyph added, removed, or reassigned anywhere in the cohort's surface; the epic's headline property survives the audit intact.

**Invariant 2 — zero new contract.** Each of the four fixes restates something the repo already asserts: Finding 1 restates the same table row's Notes cell; Findings 2-4 restate what SPEC §Phase 4 and the tasknotes' own Phase 4 boxes already claim. No rule, gate, banner, or checklist box was added.

**Invariant 3 — archive edits verified before applying, not assumed.** Findings 3 and 4 tick boxes on archived notes, so each ticked criterion was checked against the landed diff (`git show 3ee4e6a`, `git show --stat`) and current file state rather than against the note's own Final Summary. Post-edit: all four cohort archives read `status: completed` with 0 unticked boxes.

**Invariant 4 — archive structural integrity.** The sed tick-through was anchored to lines matching `^- \[ \] ` within the Acceptance/Subtasks ranges; verified afterwards that `## ✅ Acceptance` / `## 🧩 Subtasks` headings, blank lines, and all criterion text are byte-identical apart from the box character.

**Regression check.** `npm --prefix viz test` → 18 files / 245 tests passed, both before and after the edits (6.8s / 7.2s).

**Contract quality assertions:**

- *No avoidable duplication* — the 🟢 Shape cell states the shape and the existing Notes cell keeps the detail; the `####` subsection remains the single source of the argument.
- *No dead contract* — the standalone-🟢 clause has no emitter today, but it closes a real shape hole and is reachable the moment a 🟢 is emitted outside 📦. Verified deliberately rather than assumed (three candidate sites checked).
- *No unexplained complexity* — no new section, term, or rule.
- *No unnecessary surface growth* — zero glyphs, gates, banners. The CORE-065 two-banner cap is untouched.
- *No stale cross-references* — all six references to the cohort's two new sections resolve; heading nesting verified.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries walked; verdicts below

| Doc | Verdict |
|---|---|
| `README.md` | no change — no cue-shape or glyph-count surface (zero 👁️/`CONFIRM`/emphasized hits) |
| `SPEC.md` | no change — `.2` synced all three 👁️ surfaces; its 🟢 glossary row (`:468`) states the cue's *role*, not its shape, so Finding 1's fix does not falsify it |
| `docs/MIGRATION.md` | no change — adoption/bump procedures only |
| `claude/AGENTS-snippet.md` | no change — zero hits |
| `codex/AGENTS-snippet.md` | no change — wiring commands only |
| `docs/CONVENTIONS.md` | no change — zero hits |
| `CONTRIBUTING.md` | no change — zero hits |
| `SECURITY.md` | no change — zero hits |
| `docs/AGENT-NEUTRALITY.md` | no change — the audit adds no Claude-specific surface; its `prose ask` ledger row remains the authority behind `.3`'s preserved terminology |
| `docs/PLATFORMS.md` | no change — its single 👁️ hit (`:301`, Grok `--fast` equivalence) is a suppression claim |
| `claude/CAPABILITIES.md` | no change — single hit (`:30`) is suppression-only. Stamp `v5.15.0 · 2026-08-02 (dogfooded)` verified: version current, date correctly pinned to the last real dogfood run — bumping it without one is forbidden by `docs/AGENT-COMPAT.md` §"Reading the cells" |
| `docs/AGENT-COMPAT.md` | no change — `.3`'s bold-degradation paragraph (`:136-145`) is accurate and its cross-link resolves. Matrix stamps track dogfood runs, not doc edits, so they are correctly untouched (see the dogfood-protocol observation in Implementation Notes) |
| `docs/EXTERNAL-AGENTS.md` | no change — delegation/handoff surface untouched |
| `docs/WORKTREES.md` | no change — isolation convention untouched. **Walked explicitly**, since this is the entry `.1`'s sweep omitted |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or annotated (#4 `N/A` — no follow-up candidates), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath `CORE-EPIC-415` pending the parent-flip decision, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces in the 📦 bundle (parent-flip prompt forces the gate per the skill's bundled-prompt override)

**Final Summary:**

Audited the closed `CORE-EPIC-415` (`cue-emoji-legibility`) cohort and found the epic's substantive work sound — **four small hygiene and consistency defects, all fixed inline, no follow-ups to file**.

**The cohort holds up.** The contract → propagation → verification split kept its boundaries exactly: `.2` touched only its two owned files, `.3` touched neither of them, `.4` touched nothing. Verified independently rather than by citation — the full-repo 👁️ sweep (39 non-archive hits) shows every *shape* claim carrying the emphasized form and every *suppression* / *existence* claim correctly untouched; all six references to the two new `SPEC/gates.md` sections resolve to real headings at the right nesting level; `git show --stat` across all four commits confirms zero `viz/` files, so `.4`'s premise is true at source. `.3`'s call to preserve the phrase "prose ask" — a defined ask-*modality* term rather than a shape claim — was the cohort's sharpest judgment and remains correct.

**The one real coherence defect (Finding 1).** `SPEC/gates.md:137`'s 🟢 row stated `inline ask prefix` in the Shape column while its own Notes cell in the same row said the standalone case "takes the emphasized shape below". `.2` retyped the 👁️ Shape cell directly beneath it but left 🟢's at the pre-change value — so the column whose job is to state the shape contradicted its own row. This is exactly what `.2`'s Acceptance #5 ("the SPEC.md/gates.md pair carries no internal drift") was written to prevent; it just scoped the check across files and missed within a row. Fixed by restating the Notes cell in the Shape cell, adding no rule. While investigating I confirmed **no standalone 🟢 emitter exists** — both sites ride inside 📦 (`SPEC.md:693`, `ft-release/SKILL.md:448`) and `/ft-micro-task` carries no 🟢 at all — which independently validates `.3`'s decision to sweep 👁️ only. The defect was one table cell, not a missed propagation.

**Three archive-hygiene defects.** `.4` was archived with `status: in-progress` (SPEC §Phase 4 and `/ft-micro-task` Step 4 both mandate the flip; CORE-381 asserted it and backfilled 359 archives). `.2` was archived with all 16 Acceptance + Subtask boxes unticked while its own Phase 4 box asserted "every criterion ticked" — the artifact contradicted itself, which is the state CORE-393 folded that box in to prevent. `.1` had its final subtask box unticked though demonstrably done. All fixed; the `.2` tick-through was applied only after checking each criterion against the landed diff rather than against the note's own summary. Checked whether `.4`'s miss was a wiring gap — it is not; the skill's instruction is explicit and correctly placed, so it was an execution slip.

**Two observations logged, deliberately not acted on.** `.1`'s doc-drift sweep covered 13 of 14 declared entries (`docs/WORKTREES.md` omitted; both `.1` and `.2` phrase the criterion as "all 13"). Harmless — `.1` was pure PLAN filing, so the verdict would have been "no change", and `.2`/`.3` both swept all 14 — but it is the cumulative staleness this audit's fixed line exists to catch, and I walked `docs/WORKTREES.md` explicitly above to close it. Not retro-edited: an archived sweep table records what that session actually checked, and rewriting it would launder the miss. Separately, `.3`'s new bold-rendering check in `docs/DOGFOOD.md` means the three `dogfooded` stamps at `v5.15.0` now certify a protocol one item shorter than the current one; `/ft-release` §5's standing dogfood gate forces per-row resolution at the next cut, so no action here.

**Verification.** 4 files changed (1 contract cell + 3 archive-hygiene). Zero glyph changes and zero new contract — the epic's headline property survives the audit. All four cohort archives now read `status: completed` with 0 unticked boxes; archive structural integrity confirmed post-edit (headings, blanks, and criterion text byte-identical apart from the box character). `viz` suite green at 18 files / 245 tests before and after.

**Maintainability effect.** The cohort's contract surface is now internally consistent row-by-row, not just file-to-file, and the four archived tasknotes are honest artifacts — their checkboxes agree with their narratives, so a future `/ft-audit` or archive skim reading them gets accurate state rather than having to re-derive it from commits.

**Archived:** 2026-08-08
