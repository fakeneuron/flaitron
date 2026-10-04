---
title: tier-mirror-and-sweep-coverage audit
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-489, CORE-489.2, CORE-489.3, CORE-489.4]
---

# CORE-489.N | tier-mirror-and-sweep-coverage audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-489]]

## 🎯 Goal

Verify the completed `CORE-EPIC-489` (`tier-mirror-and-sweep-coverage`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-489.N — audit CORE-EPIC-489` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-489.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-489.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-489` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-489.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-489]] — parent epic
- [[CORE-489.2]] — cohort child (xheavy-mirror-sweep)
- [[CORE-489.3]] — cohort child (sweep-coverage-gaps)
- [[CORE-489.4]] — cohort child (adopter-template-reconcile)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-489.N`; Step 2 pre-flight passed cleanly. `CORE-EPIC-489` is active under `## Medium` with all three implementation children (`.2`, `.3`, `.4`) closed 2026-08-29 and no open siblings — a full cohort, not an early audit. The epic has no `.1` Discovery child by design: its children were supplied by the `audit-repo 2026-08-28` sweep rather than an in-repo Discovery pass, so the cohort is `.2`/`.3`/`.4` + terminal `.N`.

- [x] Read relevant source files

- [x] **Best Practices Review**

- [x] **Archive skim**

- [x] **Drift check**

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (read from `.flowtron/tasknote/archive/core/`):

- **[[CORE-489.2]]** `xheavy-mirror-sweep` — +3/−2 across two files. `docs/DOGFOOD.md:78` gained `- 🔭 XHEAVY (exploratory — manual-only)` in the Step 2 cue-render checklist; `docs/GLOSSARY.md:85` widened the `[model]` entry from the primary trio to the full four-rung ladder with the manual-only clause; `docs/GLOSSARY.md:151` maintenance stamp refreshed `CORE-463.5 (2026-08-23)` → `CORE-489.2 (2026-08-29)`. Explicitly scoped *out*: `SPEC/gates.md:92` (verified not drift — 🧩 owns its own row at :87) and the primary-trio references in `docs/AGENT-NEUTRALITY.md` / `docs/PLATFORMS.md` / `claude/CAPABILITIES.md` (correct as written — they map effort ladders to the trio, and `[xheavy]` is outside the trio by contract).
- **[[CORE-489.3]]** `sweep-coverage-gaps` — +2/−0 across two files. `.flowtron/tasknote/README.md:59` added `docs/VISION.md` as the **18th** AI-referenced-docs entry; `AGENTS.md:29` extended the `SPEC/` bullet to name `SPEC/procedures/` agent-neutral SOPs (a [[CORE-397]] omission).
- **[[CORE-489.4]]** `adopter-template-reconcile` — +2/−1, single hunk in `templates/tasknote-README.md:15-19`. Lead-in `Three variants:` → `Five variants:`; inserted the Sidequest bullet (`/ft-file-followup --park`, `sidequest-template.md`, `.flowtron/sidequest/<ID>.md`). Four other `templates/` files deliberately left off as non-tasknote-shaped.

**Archive skim.** Followed [[CORE-489.3]]'s `docs/VISION.md` edit back to its origin: [[CORE-194.1]] Discovery §Q3 resolved *"Mirror into SPEC §'What flowtron does NOT provide' as PR-shape subsection; **VISION stays lazy**"*, and [[CORE-194.2]]'s acceptance carried the line verbatim: *"`_project/tasknote/README.md` AI-referenced docs list updated: … VISION.md **NOT** added (lazy per Q3 resolution)"*. This is load-bearing for the audit — see Implementation Notes finding 3.

**Drift check.** All nine cohort deliverable sites re-read at HEAD; every one intact and unmoved:

| Site | State at HEAD |
| --- | --- |
| `docs/DOGFOOD.md:75-79` | 5-row cue checklist, 🔭 XHEAVY present ✓ |
| `SPEC/gates.md:241` | canonical row; DOGFOOD label matches character-for-character ✓ |
| `docs/GLOSSARY.md:85` | four-rung ladder + manual-only clause ✓ |
| `docs/GLOSSARY.md:151` | stamp reads `CORE-489.2 (2026-08-29)` ✓ |
| `.flowtron/tasknote/README.md:59` | `docs/VISION.md` entry present (18 total) ✓ |
| `AGENTS.md:29` | `SPEC/procedures/` named ✓ |
| `templates/tasknote-README.md:15` | `Five variants:` + exactly 5 bullets ✓ |
| `templates/` directory | 10 files; matches `SPEC.md:58` roster clause exactly ✓ |
| `.flowtron/sidequest/<ID>.md` path | matches `SPEC/tasknote-selection.md:84` + `park-mode.md:99-100` ✓ |

**No clarifications needed.** Assumptions: (a) the cohort is `.2`/`.3`/`.4` — the absent `.1` is by design, not a missing child; (b) audit scope is the union of the three children's touched surfaces plus anything that cross-references them; (c) findings requiring a scope or policy decision are logged for `/ft-file-followup`, not resolved inline.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey**

- [x] **Minimal refactor gate**

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Verification pass, no code surface. **No inline fixes applied** — see the "why not inline" note below.

**Cohort coherence — clean.** `CORE-489.2` and `CORE-489.4` sit coherently: naming, bullet shape, and cross-refs all match their neighbours, and the deliberate scope-outs each child recorded hold up on re-inspection. Specifically re-verified and confirmed **not** drift:

- `templates/PLAN.md` illustrative entries show `[heavy]`/`[medium]`/`[light]` only. Consistent with `CORE-489.2`'s documented call — `[xheavy]` is manual-only and outside the primary trio by contract (`SPEC/model.md:74-86`), so an adopter-facing example set that omits it is correct, not stale.
- `claude/AGENTS-snippet.md:29`, `docs/AGENT-NEUTRALITY.md:50/:54`, `claude/CAPABILITIES.md:29/:36/:56` — all trio-scoped or effort-ladder mappings; `:50` already names `CORE-482.3`'s `[xheavy]` in its rationale.
- `SPEC.md:58` templates roster ↔ `ls templates/` — 10 files, exact match after `CORE-489.4`.

**Three findings, all downstream of `CORE-489.3`'s one-line addition of `docs/VISION.md` to the AI-referenced-docs list.** They are one issue at three depths:

**Finding 1 — `docs/CONVENTIONS.md:70` now states a falsehood.** The bullet reads: *"an assistant mid-task should not have to load `VISION.md` — which is deliberately **outside** the cold-start doc set (see `.flowtron/tasknote/README.md` §'AI-referenced docs')"*. As of `CORE-489.3`, `VISION.md` is **inside** that set. The sentence's parenthetical cites the very list that now contradicts it. `docs/CONVENTIONS.md` **is itself entry #9 on the sweep list**, so `CORE-489.3`'s own Phase 4 doc-drift sweep walked it and recorded "no change" — a per-entry verdict that was wrong at the moment it was written. This is precisely the cumulative miss the epic-audit sweep exists to catch.

**Finding 2 — `claude/skills/ft-release/SKILL.md:567` (§7.1 Pair K) states the same falsehood, and no sweep could have caught it.** The Pair K rationale ends: *"…and the Phase 4 cold-start doc sweep never walks `docs/VISION.md` at all (deliberately — `.flowtron/tasknote/README.md` §'AI-referenced docs'; CORE-194.1 Q3)"*. Now false. Worse than Finding 1 structurally: `claude/skills/*/SKILL.md` is **explicitly excluded** from the AI-referenced-docs set (`.flowtron/tasknote/README.md` closing paragraph; `docs/GLOSSARY.md:13`), so no Phase 4 sweep — per-task or epic-audit — reaches it. The claim is load-bearing for Pair K's stated justification: it is the reason given for why Pair K's citation-rot check must exist as a release-time guard at all.

**Finding 3 (root) — `CORE-489.3` reversed `CORE-194.1` Q3 without citing it.** Q3 explicitly resolved *"VISION stays lazy"*, and `CORE-194.2`'s acceptance line encoded it as *"VISION.md **NOT** added (lazy per Q3 resolution)"*. `CORE-489.3` added it anyway — acting on `audit-repo 2026-08-28`'s "VISION.md absent from the closure sweep list" — and its tasknote shows no awareness the exclusion was deliberate. The reversal may well be *right*; what is missing is the overturn being made explicit. The underlying cause is that one list serves **two distinct roles** its own header conflates: *"Canonical docs that AI sessions consume as **cold-start ground truth** — the project-declared doc set **walked at every Phase 4 closure**"*. Q3 was arguing the first role (don't force a lazy doc into cold-start load); `audit-repo` flagged a gap in the second (the sweep skips flowtron's own scope-boundary statement). Both are correct about different things. Findings 1 and 2 are the two labeled mirrors of the old decision left stranded by the reversal — and `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors" is, with some irony, the section that predicted exactly this failure mode.

**Why no inline fix.** The wording of Findings 1 and 2 is *determined by* Finding 3's resolution, and both readings are live. Keep `VISION.md` on the list → both sentences need rewording, and the list's dual role wants an explicit split. Revert `CORE-489.3`'s line → both sentences become correct again and no edit is needed. Editing the two mirrors now would silently ratify one branch of a decision that has never been put to the operator. Logged for filing instead.

**Follow-up candidates** (file after audit closure, one `/ft-file-followup` each):

1. **`vision-sweep-role-split`** *(recommended first — subsumes the other two)* — Decide whether `docs/VISION.md` belongs on the AI-referenced-docs list, and disentangle the list's two roles (cold-start ground truth vs. Phase 4 sweep set) so a doc can be swept without being cold-start-loaded. Reconciles `CORE-194.1` Q3 against `audit-repo 2026-08-28`; whichever way it lands, record the overturn explicitly.
2. **`vision-lazy-claim-mirrors`** — Reword `docs/CONVENTIONS.md:70` and `claude/skills/ft-release/SKILL.md:567` to match whatever #1 decides. Mechanical once #1 lands; may become a no-op if #1 reverts.
3. **`skill-layer-sweep-blindspot`** — Finding 2's structural half: `claude/skills/*/SKILL.md` carries factual claims *about* swept docs but is itself unswept, so contract-layer changes can strand skill-body rationale indefinitely. Consider a `/ft-release` §7.1 pair or a targeted grep guard. Lowest priority; genuinely optional.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions**

- [x] (frontend) Asked the user for visual confirmation

**Testing Notes:**

Documentation-appropriate verification; no test surface (no code changed).

- **CI `drift` job, run locally in full** — all seven checks green: wrapper-name invariant **OK**, shipped-skill parity (claude ↔ codex) **OK**, Pair A templates-roster clause **OK**, Pair B Claude-flags ↔ Codex-descriptions **OK**, Pair C template back-link depth **OK**, Pair E roster-row coverage **OK**, Pair E roster-flag coverage **OK**.
- **Cohort deliverable re-read** — all nine sites verified intact at HEAD (Discovery Notes drift-check table).
- **Cross-reference sweep** — `grep -rn --include='*.md' "AI-referenced"` across the repo excluding `archive/`: 30 hits reviewed individually. Two carry stale factual claims (Findings 1 and 2); the remaining 28 are correct, including `docs/GLOSSARY.md:13`'s exclusion statement (`SPEC/` modules and `claude/skills/*` — still accurate) and `docs/GLOSSARY.md:151`'s own never-add-me clause.
- **Count-claim sweep** — `grep -rniE "(three|four|five|six) variants"` returns exactly one hit, `templates/tasknote-README.md:15` "Five variants:", matching its five bullets. `SPEC.md:58`'s roster clause matches `ls templates/` (10 files) exactly. No count claim anywhere states a size for the AI-referenced-docs list, so `CORE-489.3`'s 17→18 growth stranded no numeric assertion.
- **Residual tier sweep** — all 18 AI-referenced entries grepped for three-rung tier enumerations. Five files carry tier mentions; every one is trio-scoped or effort-ladder-scoped and correct per `SPEC/model.md:74-86`. Zero residual drift from the `[xheavy]` rollout.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces at the 📦 gate

**Doc-drift sweep verdicts** — 18 AI-referenced entries:

- `docs/CONVENTIONS.md` — **drift found, not fixed** (Finding 1): the §"Canonical source with labeled mirrors" bullet at :70 asserts `docs/VISION.md` is "deliberately outside the cold-start doc set", contradicted by `CORE-489.3`'s own addition of that file to this list. Left as-is deliberately — the correct wording depends on the unresolved decision in Finding 3; filed as follow-up candidate #2.
- `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — **no change** (17 entries). Each checked against both cohort themes: residual three-rung tier claims (none — the five files carrying tier mentions are all trio- or effort-ladder-scoped and correct by contract) and stranded claims about the sweep list's own membership (none besides `docs/CONVENTIONS.md`). `claude/CAPABILITIES.md`'s last-verified stamp reads `v5.21.0 · 2026-08-27 (dogfooded)` — current for this release line, no bump landed in this cohort.

**Final Summary:**

The `CORE-EPIC-489` cohort landed its three deliverables correctly and they hold at HEAD — but the epic's own theme reproduced itself one level up, and the audit caught it. `CORE-489.2` (`[xheavy]`🔭 into DOGFOOD's cue checklist + GLOSSARY's `[model]` entry + stamp refresh) and `CORE-489.4` (`templates/tasknote-README.md` "Three"→"Five variants" + the missing Sidequest bullet) are clean: all nine deliverable sites intact, every deliberate scope-out re-verified as correct rather than stale, zero residual three-rung tier drift across all 18 AI-referenced docs, and `SPEC.md:58`'s templates roster an exact match for the 10-file `templates/` directory.

`CORE-489.3` is where the finding sits. Adding `docs/VISION.md` as the 18th sweep entry — the fix `audit-repo 2026-08-28` asked for — silently reversed `CORE-194.1` §Q3's explicit *"VISION stays lazy"* resolution, which `CORE-194.2`'s acceptance had encoded as *"VISION.md **NOT** added (lazy per Q3 resolution)"*, and stranded two labeled mirrors of the old decision: `docs/CONVENTIONS.md:70` ("deliberately outside the cold-start doc set") and `claude/skills/ft-release/SKILL.md:567` (Pair K's "the Phase 4 cold-start doc sweep never walks `docs/VISION.md` at all"). Both now state the opposite of what the list says. The first is entry #9 on the sweep list, so `CORE-489.3`'s own Phase 4 sweep walked it and recorded "no change" — the verdict was wrong when written. The second is a skill body, structurally unreachable by any sweep. The root cause is that one list carries two roles its header conflates — *cold-start ground truth* and *the set walked at every Phase 4 closure*. Q3 was defending the first; `audit-repo` was fixing a gap in the second; both were right about different things, which is why the reversal read as a routine gap-fill.

No inline fix applied, deliberately: the correct wording for both stranded mirrors is determined by a decision — does `VISION.md` stay on the list? — that has never been put to the operator, and editing them now would ratify one branch silently. Three follow-up candidates logged, sequenced so the decision comes first (`vision-sweep-role-split`), the mechanical rewording follows it (`vision-lazy-claim-mirrors`, possibly a no-op), and the structural blind spot is optional (`skill-layer-sweep-blindspot`). Verification: CI `drift` job run locally, all seven checks green; 30 `AI-referenced` cross-references reviewed individually (28 correct); count-claim and residual-tier sweeps both clean. Docs verdict: 1 of 18 entries carries drift found-but-deliberately-unfixed, 17 no change. Maintainability effect: the cohort's own doc-drift blind spot is now written down with its root cause and a sequenced resolution, so the next reader of `docs/CONVENTIONS.md:70` finds a filed decision rather than a confident sentence that quietly stopped being true.

**Parent-flip: confirmed.** Operator approved at the 📦 gate. `CORE-EPIC-489` flipped to stub form and the full cohort (`.2`, `.3`, `.4`, `.N`) moved atomically to the top of `## Completed`; `## Medium` retains other entries, so no `(none)` placeholder was needed.

**Archived:** 2026-08-29
