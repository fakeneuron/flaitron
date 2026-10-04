---
title: gates-unattended-fidelity
status: completed
tags: []
created: 2026-09-10
related-tasks: [CORE-EPIC-558, CORE-558.1, CORE-558.2, CORE-535.5, CORE-551, CORE-552, CORE-555]
blocked-by:
  - CORE-558.2
---

# CORE-558.3 | gates-unattended-fidelity

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-558]]

## 🎯 Goal

Restore any load-bearing pause / `--unattended` / `--fast` process `SPEC/gates.md` lost or made ambiguous in [[CORE-535.5]]'s split, and confirm `cue-vocabulary.md` + `gate-discipline.md` are still reachable and match their `gates.md` pointers — merged to current truth, never reverted.

## ✅ Acceptance

- [x] Every pause / `--fast` / `--unattended` behavior stated in `SPEC/gates.md` before [[CORE-535.5]] is either still stated in `gates.md` or has a named, reachable home in `cue-vocabulary.md` / `gate-discipline.md` — verified by diff against `b75a55d`, with each unrelocated line classified relocated / reworded / superseded / restored
- [x] Pointer-check: every markdown link and every `§"Section"` citation in `gates.md`, `cue-vocabulary.md`, and `gate-discipline.md` resolves to an existing file and an existing heading (or an established bold-lead anchor)
- [x] [[CORE-551]]'s **Applies to** roster is intact and still names `/ft-file-followup`; [[CORE-552]]'s `/ft-epic-discovery` refusal is intact and readable
- [x] [[CORE-536]]'s post-shrink additions are intact and internally consistent — the `--fast` surface count reads **four** at every site in these three files
- [x] [[CORE-557]]'s surface (`SPEC.md` §"🧪 Phase 3" and the skill Phase 3 restatements) is untouched by this task
- [x] Byte delta measured and handed to [[CORE-558.5]] (raise needed, or still under the 40,000 cap)

## 🧩 Subtasks

- [x] Diff `SPEC/gates.md` at HEAD against `b75a55d:SPEC/gates.md`; mechanically classify every substantive deleted line against today's `SPEC.md` + `SPEC/**` + `claude/skills/**`
- [x] Per-section size comparison to locate the sections that actually lost body, not just moved
- [x] Hand-classify the unrelocated clusters (cue vocabulary · destructive escalation · Phase 1→2 · skip rule · `--fast` · `--unattended` · Rationalizations · Red Flags)
- [x] Run a link + `§"Section"` citation validator over the three gate modules; resolve every apparent dangling hit
- [x] Confirm post-shrink features intact: [[CORE-551]] Applies-to, [[CORE-552]] refusal, [[CORE-536]] matrix / `[unattended]` implies `--fast` / four-surface count
- [x] Targeted scope-limiter sweep — pre-shrink "still runs / still applies / still wins" clauses that today's text dropped
- [x] Phase 2: restore the one dropped scope-limiter to `gates.md` §"`--fast` operator override"
- [x] Phase 3: re-run the citation validator; re-measure `wc -c SPEC/gates.md`
- [x] Phase 4: doc-drift sweep + PLAN.md stub flip + archive

## 🔗 Related

- [[CORE-EPIC-558]] — parent epic (`post-shrink-fidelity`)
- [[CORE-558.1]] — epic Discovery that scoped this child (Deep Pre-pass Q1–Q5 settle the method)
- [[CORE-558.2]] — `blocked-by:` predecessor; established the diff → classify → restore-the-lost method
- [[CORE-535.5]] — the shrink under review: cue inventory + discipline split out of `gates.md`
- [[CORE-551]] — post-shrink feature to preserve: `--unattended` filing authority (`/ft-file-followup` in "Applies to")
- [[CORE-552]] — post-shrink feature to preserve: `/ft-epic-discovery` refuses `--unattended`
- [[CORE-555]] — precedent authorizing growth: instruction clarity outranks byte discipline
- [[CORE-558.5]] — follow-up consuming this task's byte delta

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the PLAN.md line exactly and the baseline is decisive: `SPEC/gates.md` went 51,809 → 34,963 chars, but every section that stayed in the file **grew** (Operator-gate cues 113%, Phase 1→2 117%, Conditional skip rule 114%, `--fast` 117%), and the two sections that left (Rationalizations, Red Flags) landed in `gate-discipline.md` larger than they arrived. The shrink was a relocation, later swept by [[CORE-536]]. One genuine scope-limiter loss remains — a one-clause restore, not a re-scope. [[CORE-558.1]] explicitly sanctioned a "no restore" outcome for a child whose shrink held.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown contract prose, no code module boundaries. The boundary that governs here is the [[CORE-535.5]] split itself (machinery in `gates.md`, inventory in `cue-vocabulary.md`, discipline in `gate-discipline.md`); the restore respects it — the clause lands in the section that already owns the `--fast` delegation prose, and nothing is pasted back into a skill body.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Method

Diffed `SPEC/gates.md` at HEAD (34,963 chars) against `b75a55d:SPEC/gates.md`
(51,809 chars — `feat: CORE-535.4`, the parent of [[CORE-535.5]]). Every
substantive deleted line (normalized whitespace, >25 chars) was tested for a
verbatim home across today's `SPEC.md` + every `SPEC/**.md` + every
`claude/skills/**.md`; **177 lines** had none. As in [[CORE-558.2]], a missing
verbatim match means "moved and reworded" far more often than "lost", so the
177 were read in context and classified by hand. Three cross-checks backed the
line diff: a per-`##`-section size comparison, a strong-modal-imperative
survival sweep (`must` / `never` / `always` / `cannot` / `is not permitted`),
and a targeted scope-limiter sweep ("still runs / still applies / still wins").

### B. Per-section size — the shrink was a relocation, not a compression

| Section | Pre (`b75a55d`) | HEAD | |
|---|---|---|---|
| (preamble) | 901 | 1,265 | 140% |
| `## Operator-gate cues` | 4,220 | 4,780 | 113% |
| `## Operator-cue vocabulary` | 16,342 | 1,165 | → `cue-vocabulary.md` (15,138) |
| `## Phase 1→2 exit gate` | 2,580 | 3,025 | 117% |
| `## Conditional skip rule` | 3,016 | 3,449 | 114% |
| `` ## `--fast` operator override `` | 2,112 | 2,477 | 117% |
| `` ## `--unattended` operator posture `` | 11,382 | 9,844 | 86% |
| `## Rationalizations` | 7,346 | — | → `gate-discipline.md` |
| `## Red Flags` | 2,657 | — | → `gate-discipline.md` |
| `## Destructive-action escalation` | — | 2,312 | promoted from a `###` under vocabulary |
| `## Flag precedence and surface matrix` | — | 4,302 | new ([[CORE-536]]) |
| `## Gate discipline — read before skipping a gate` | — | 1,541 | new trigger prose |

Every section that stayed in the file **grew**. The only one that shrank is
`--unattended` (−1,538), and that is deduplication, not loss: its Park-conversions
table became prose plus a pointer to the new §"Flag precedence and surface
matrix", which carries the same rows with more columns. The two evicted
sections are *larger* in `gate-discipline.md` than they were here (Red Flags
gained six symptom lines; Rationalizations went 17 → 21 excuse rows).

### C. Classification of the 177 unrelocated lines

| Cluster | Pre lines | Verdict |
|---|---|---|
| Module blurb + intro paragraph | 7–15 | **Reworded and improved** — now names the two siblings and their triggers. Keep. |
| §"Operator-gate cues" opener + trigger table + `--fast` pointer | 19, 35, 37 | **Reworded in place**; the two-banner cap became its own stated-here-cited-everywhere paragraph. Keep. |
| Glyph layers / labeling convention / non-cue residual | 67–121 | **Relocated near-verbatim** → `cue-vocabulary.md` §"Glyph layers and reuse". The layer table is byte-identical; only the internal §-citation was repaired. Keep. |
| Event cues · Inline asks · Emphasized inline ask shape · Accepted gate replies · Landmark cues · Next-task cues | 123–281 | **Relocated** → `cue-vocabulary.md`. Spot-verified the load-bearing clauses individually: "Reuse across *unrelated* concepts is not permitted", "inverts its purpose", "`okay` and `looks good` are **not** members", "`yes` is accepted even when the prompt does not print it", "✋ ACTION never escalates", "mirror the model tier ladder 1:1", "survives non-render" — all present. Keep. |
| Glyph-provenance sentences (CORE-353.3 reversing CORE-254's two-glyph lock; CORE-308; CORE-482.3 "one-glyph widening") | 264–280 | **Trimmed** — but the bar they encoded survives at `gates.md:66`: *"adding to that module's cue table is a vocabulary change and needs the deliberation CORE-254.2 / CORE-308 / CORE-353.3 each gave it."* Not a loss. |
| `### Destructive-action escalation` | 282–334 | **Promoted to `##` and kept whole** in `gates.md` — deliberately left behind by the split as the cap's one bounded exception. Keep. |
| §"Phase 1→2 exit gate" `--fast` drift carve-out | 381–386 | **Superseded** by [[CORE-536]] — Re-scope now downgrades to an ⚠️ inline notice rather than always firing. Today's Flag-interaction paragraph is the current truth. Correctly gone. |
| §"Conditional skip rule" glob list + overrides | 400–410 | **Reworded and expanded** — [[CORE-536]] split the credential-keyword clause out of the Security/secrets bullet and added the documentation-extension exemption. Keep. |
| §"`--fast`" three-bullet surface list | 424–447 | **Reworded** — per-surface effects moved to the matrix; the two properties the section owns (de-escalation-by-explicit-input, delegation-not-removed-pause) stayed. **One clause lost — see §D.** |
| §"What is inherited" three-row table | 480–494 | **Reworded** to prose covering four surfaces; the "transfer needs a transferee" argument and the one-line statement survive verbatim. Keep. |
| §"Park conversions" six-row table + 👁️ / ✋ / conversion paragraphs | 500–549 | **Relocated** into §"Flag precedence and surface matrix" (rows) + kept prose (the why). The CORE-503 refusal reasoning moved whole to `gate-discipline.md` §"Refused carve-outs". Keep. |
| §"What a park is" · §"Pre-scaffold stops" · §"never relaxes" · §"`/ft-close-epic` under the posture" | 550–655 | **Untouched.** Keep. |
| §"Rationalizations" + §"Red Flags" | 656–740 | **Relocated and expanded** → `gate-discipline.md`. Scope statement, "prose not a gate" framing, and every symptom line present; four new rows cover [[CORE-536]]'s relaxations. Keep. |

Strong-modal sweep: after discounting the heuristic's line-wrap noise, exactly
one imperative has no home today — *"The flag silences routine signal trips; it
does not silence drift"* — and that is [[CORE-536]] superseding it, not the
shrink dropping it.

### D. The one restore

**`--fast`'s 👁️ suppression lost its scope-limiter.** Pre-shrink
(`b75a55d:SPEC/gates.md:437`):

> **👁️ frontend visual-confirmation (suppressed).** The 👁️ ask is
> suppressed; *lint/type-check on changed code still runs.* The operator owns
> the visual-confirmation responsibility on fast-mode runs.

The middle clause is in no gate module at HEAD. What remains is the matrix row
`👁️ CONFIRM (Phase 3) | Suppressed — the present operator owns the check` and
the prose calling the suppression a delegation. Neither says what `--fast`
does **not** reach, and the row is labelled by its phase, so "Phase 3
suppressed" is an available misreading of the canonical surface.

It is load-bearing because of who reads it. The clause survives in exactly one
place — `claude/skills/ft-task/SKILL.md:180` — and `/ft-task` is not the only
runner that accepts `--fast`: `/ft-micro-task` and `/ft-goal-task` do too, and
neither body carries it (verified by grep). Those two runners load `gates.md`
for the flag contract and would have to reconstruct the bound from memory. This
is the exact shape [[CORE-EPIC-558]] exists to catch — a scope-limiter dropped
in a compression, where what is left over-reads rather than under-reads.

Restore: one clause in `gates.md` §"`--fast` operator override", the section
that already owns the delegation prose. No skill body is edited (cite-don't-restate,
[[CORE-535.4]]), and `ft-task`'s existing sentence is left alone — it is a
correct skill-local restatement, and its Phase 3 line is [[CORE-557]]'s surface.

Everything else the sweep surfaced resolved to relocated, reworded, or
superseded. **One restore; no ceiling raise** (see §F).

### E. Pointer-check (Acceptance #2)

Ran a link + `§"Section"` citation validator over all three gate modules. Every
markdown link target resolves on disk. Every `§"…"` citation resolves once two
classes of apparent hit are discounted:

- **Line-wrapped citations** — a citation broken across a newline (`§"Flag
  precedence and surface\nmatrix"`) is a scanner artifact, not a document defect.
- **Shortened and bold-lead anchors** — `§"Event cues"` for the heading
  `## Event cues (inline operator prompts)` (likewise `§"Inline asks"`,
  `§"Landmark cues"`); and two citations that resolve to bold-lead paragraphs
  rather than headings: `cue-vocabulary.md:162 §"Labeling convention"` →
  `cue-vocabulary.md:28`, and `gates.md:508` → `blocked.md` §"Parked state" →
  `blocked.md:67`. Both bold-lead forms **pre-date the shrink** (the same two
  citations point at the same two bold leads at `b75a55d`) and both are an
  established convention in this repo, so neither is [[CORE-535.5]] drift.

`gates.md`'s two sibling-summary sections were checked against the siblings'
actual heading lists: all six §-names it attributes to `cue-vocabulary.md` and
all three it attributes to `gate-discipline.md` exist. **Zero dangling
citations.**

### F. Post-shrink features + drift check

- [[CORE-551]] — **Applies to** roster intact at `gates.md:522-529`, naming
  `/ft-file-followup` on `tasknote-selection.md` §"Filing commits". ✅
- [[CORE-552]] — `/ft-epic-discovery` refusal intact and reasoned in the same
  paragraph ("there is no such conversation to have with nobody present"). ✅
- [[CORE-536]] — matrix + precedence ladder present; `[unattended]` implies
  `--fast` (never the posture) present; the `--fast` surface count reads
  **four** at all three sites in these files (`gates.md:296`, `gates.md:307`,
  `gate-discipline.md:32`) — no stale "three" survives. ✅
- **Baseline verified:** `b75a55d` is `feat: CORE-535.4 — skills-cite-dont-restate`,
  the parent of [[CORE-535.5]], and its `gates.md` measures 51,809 chars —
  matching [[CORE-558.1]] §A exactly. No drift in the cited SHA.
- **[[CORE-557]] boundary:** its surface is `SPEC.md` §"🧪 Phase 3" and the
  skill Phase 3 restatements. This task edits `SPEC/gates.md` only and touches
  no skill body, so the surfaces do not overlap. Recorded because the restore
  is 👁️-adjacent by topic.
- **Budget:** `gates.md` is 34,963 of a 40,000 cap ([[CORE-555]]) — ~5,000
  chars of headroom against a one-clause restore. **No ceiling raise needed
  from this child**; [[CORE-558.5]] can record a no-op for `gates.md`.

### G. Clarifications

No clarifications needed. Explicit assumptions: (1) pre-shrink text is
evidence, not source of truth — a clause [[CORE-536]] deliberately superseded
stays gone (`SPEC/tasknote-selection.md` method, [[CORE-558.1]] Q1);
(2) relocation to a sibling module is fidelity-preserving, since both siblings
are reachable and their triggers are stated in `gates.md` (Q2); (3) a restore
lands in the SPEC module, never as paste-back into a skill (Q4, [[CORE-535.4]]).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` (markdown contract prose; flowtron ships no validator for SPEC text, and adding one is refused by `docs/VISION.md` §"What we won't accept")

**Implementation Notes:**

One edit, one paragraph, one file: `SPEC/gates.md` §"`--fast` operator
override" gains **"Each delegation is bounded to its own check."** — the
restore identified in Discovery §D.

**Pattern survey.** The section already states two properties in the same
shape ("Two properties the matrix's rows depend on and this section owns…"),
each a bold-lead paragraph that bounds or qualifies a matrix row. The restore
extends that shape rather than inventing one: bold lead, one bound per
delegation, a pointer to the section that owns the other half. Placement
follows the [[CORE-535.5]] boundary — the bound is *machinery* (what a flag
does and does not reach), so it belongs in `gates.md`, not in
`cue-vocabulary.md`, which is inventory.

**Merged to current truth, not reverted** ([[CORE-558.1]] Q4). Pre-shrink text
bounded one delegation (👁️); [[CORE-536]] since added a second (the Re-scope
notice). The restored paragraph bounds both symmetrically, which is the same
test [[CORE-536]] applied to the "supersets autonomy, not delegations" hinge —
if the bound were a special case for 👁️, it would not state cleanly for the
second delegation. It does.

**Minimal refactor gate.** No refactor. No surrounding prose was retouched, no
matrix row edited, and no skill body changed — `claude/skills/ft-task/SKILL.md`
keeps its own correct restatement of the clause (cite-don't-restate holds:
skills may carry a skill-local imperative, and this one is not paste-back).
[[CORE-557]]'s surface is untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — the change is markdown contract prose. No `viz/` source and no `tools/` source was touched, so neither `npm --prefix viz test` nor `node --test tools/update-adopters.test.mjs` covers this diff.

- [x] Ran lint/type-check on changed code — `N/A` (no code). Substituted the structural checks that do apply: the link + `§"Section"` citation validator, `git diff --check`, and an `.editorconfig` pass.

- [x] **Quality assertions** — `N/A` for the code-shaped items (no code changed); the contract-prose equivalents were checked — see Testing Notes. **Quality assertions (original text)** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface; `SPEC/gates.md` is contract prose)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Command / method | Result |
|---|---|---|
| Citation validator | link + `§"Section"` resolver over `gates.md`, `cue-vocabulary.md`, `gate-discipline.md` | 0 dangling links; the one citation the restore adds (`§"Phase 1→2 exit gate"`) resolves to an existing `##` heading in the same file; the pre-existing wrap/bold-anchor artifacts are unchanged in number and identity (Discovery §E) |
| Whitespace / EOL | `git diff --check`; final-byte check | clean; file ends `0a`, no trailing whitespace, LF throughout |
| Budget | `wc -c SPEC/gates.md` | **34,963 → 35,382 (+419)**, against the 40,000 cap ([[CORE-555]]) — ~4,600 chars of headroom remain |
| Surface-count consistency | `grep "exactly four"` | still 2 in `gates.md`, 1 in `gate-discipline.md`; the restore adds no fifth surface and changes no count |
| Cross-doc contradiction | swept the 18 AI-referenced docs for `--fast` + 👁️ restatements | `README.md:248`, `docs/PLATFORMS.md:388/416/453`, `claude/CAPABILITIES.md:30`, `docs/EXTERNAL-AGENTS.md:61/65` all say *"suppresses the 👁️ visual-confirmation ask"* — the restore makes their scope explicit rather than contradicting it. No drift. |

**Contract-prose quality assertions.** No avoidable duplication — the bound is
stated once, in the section that owns the delegation prose, and no other
surface repeats it (the matrix rows and the skill bodies are pointers or
skill-local imperatives, not copies). No unexplained complexity: one bold-lead
paragraph in the established shape of its neighbours. No public-surface growth:
no new cue glyph, no new gate, no new flag, no new heading — the two-banner cap
and the four-surface count are untouched. No stale documentation left behind:
`docs/CONTEXT-BUDGET.md`'s per-module measurement (`gates.md 34,963`) is
release-refreshed by design — its §"Ledger" stamp reads *"Refreshed by
`/ft-release` §7.1 in the same cut that reads it"* — so a per-task drift there
is expected, not a miss.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` · `AGENTS.md` · `SPEC.md` · `docs/MIGRATION.md` ·
  `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` ·
  `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` ·
  `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` ·
  `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` ·
  `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` ·
  `docs/VISION.md` — **no change** (18/18). The seven that restate the `--fast`
  surface were read rather than assumed: each says the flag *suppresses the 👁️
  ask*, which the restore bounds rather than contradicts. `SPEC/gates.md` is a
  lazy module and sits outside the sweep set by declaration; the restore adds no
  agent-specific reference, so `docs/AGENT-NEUTRALITY.md`'s `gates.md` count is
  unchanged.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Reviewed `SPEC/gates.md` for process lost or over-tightened by
[[CORE-535.5]]'s split and found the shrink held: the 51,809 → 34,963 drop was
a **relocation**, not a compression. Every section that stayed in the file grew
(113–117%), the two that left are larger in `gate-discipline.md` than they
arrived, and [[CORE-536]] had already swept the result for stale restatements.
One genuine loss survived that sweep — the scope-limiter bounding what `--fast`
does *not* suppress — and it is restored.

**The find.** Pre-shrink, `--fast`'s 👁️ bullet read *"The 👁️ ask is
suppressed; lint/type-check on changed code still runs."* The middle clause
existed in no gate module at HEAD; what remained was a matrix row labelled by
its phase (`👁️ CONFIRM (Phase 3) | Suppressed`), which over-reads. It survived
in exactly one skill body — `claude/skills/ft-task/SKILL.md:180` — while
`/ft-micro-task` and `/ft-goal-task`, which also accept `--fast`, carry it
nowhere and read `gates.md` for the flag contract. Restored as one bold-lead
paragraph bounding **both** delegations (the 👁️ ask and [[CORE-536]]'s Re-scope
notice), merged to current truth rather than reverted.

**Evidence.** `SPEC/gates.md` +419 chars (34,963 → 35,382; 1 file, +9 lines,
0 deletions). Classification: 177 substantive pre-shrink lines with no verbatim
home, hand-sorted into 14 clusters — 13 relocated / reworded / superseded, 1
restored. Cross-checks: per-`##`-section size table, a strong-modal-imperative
survival sweep (one hit, and it was [[CORE-536]] superseding it, not the
shrink), and a "still runs / still applies / still wins" scope-limiter sweep
(four clauses pre-shrink, three survive, one restored). Verification: 0 dangling
links and 0 dangling `§"Section"` citations across all three gate modules; the
`--fast` surface count reads **four** at every site; `git diff --check` clean.

**Post-shrink features confirmed intact:** [[CORE-551]]'s **Applies to** roster
(including `/ft-file-followup`), [[CORE-552]]'s `/ft-epic-discovery` refusal,
and [[CORE-536]]'s matrix, precedence ladder, and `[unattended]`-implies-`--fast`
rule. [[CORE-557]]'s Phase 3 surface untouched.

**Refactors:** none made, none deferred. **Documentation:** 18/18 no change.
**For [[CORE-558.5]]:** `gates.md` needs **no ceiling raise** — 35,382 against
40,000 leaves ~4,600 chars of headroom.

**Maintainability effect.** The `--fast` contract now states its bounds where it
states its reach, so the two runners without a skill-local copy no longer have
to infer them; and the fidelity method itself is now twice-proven — [[CORE-558.2]]
found three restores in `SPEC.md`, this child found one in `gates.md`, and both
converged by the same diff-then-classify pass rather than by reading impressions.

**Archived:** 2026-09-10
