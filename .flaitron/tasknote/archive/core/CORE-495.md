---
title: visual-confirm-park
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-473.2, CORE-473.3, CORE-494]
touches:
  - SPEC.md
  - SPEC/gates.md
  - SPEC/blocked.md
  - SPEC/loop.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/
  - claude/skills/ft-goal-task/
  - claude/commands/
  - claude/CAPABILITIES.md
  - claude/AGENTS-snippet.md
  - docs/PLATFORMS.md
  - docs/EXTERNAL-AGENTS.md
  - README.md
supersedes:
  - CORE-473.2
---

# CORE-495 | visual-confirm-park

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-473.2]] · [[CORE-473.3]] · [[CORE-494]]

## 🎯 Goal

Convert the Phase 3 👁️ `CONFIRM` ask into a park under `--unattended` — a new
`visual-confirm` code in `SPEC.md`'s `park-reason` closed set, a sixth row in the
gate-conversion tables, and the narrowing of the strict `--fast`-superset claim
that currently makes the ask vanish with nobody to own it.

## ✅ Acceptance

- [x] `SPEC.md` §"Tasknote frontmatter" → "Park reason" tables a **`visual-confirm`** code, placed with the gate conversions, and the "first five are the gate conversions" prose is corrected to six
- [x] `SPEC/gates.md` §"`--unattended` operator posture" → "Park conversions" carries a **sixth row** for 👁️ `CONFIRM`, and its "Inherited from `--fast`, unchanged" claim is narrowed from three surfaces to two
- [x] `SPEC/gates.md` states the **reason** for the narrowing: 📦 force-skip and 🛠️ no-op *remove a pause*; 👁️ suppression *transfers an obligation* to a present operator, and `--unattended` denies there is one
- [x] `SPEC/gates.md` §"`--fast` operator override" (👁️ bullet) and §"Emphasized inline ask shape" ("`--fast` is unchanged") both name the conversion, so no surface still reads as blanket inheritance
- [x] `SPEC/gates.md` gains one **Rationalization** row and one **Red Flag** line for the specific excuse this change refutes (per [[CORE-386]]'s standing rule for gate-surface edits)
- [x] `claude/skills/ft-task/unattended-mode.md` §"Conversion map" carries the 👁️ row with per-runner columns (`/ft-micro-task` = n/a — it has no separate 👁️ ask), and §"What the posture adds" is narrowed to match the contract
- [x] The **trigger predicate** is stated as: whenever Phase 3 would emit a 👁️ ask, park. No second judgment split is invented
- [x] Runner wiring: `/ft-task` Step 5 Phase 3 and `/ft-goal-task` Step 6 branch on `unattended-mode` rather than suppressing; both Step 0 flag markers stop claiming all `--fast` suppressions apply
- [x] `SPEC/blocked.md`'s park-code count, `SPEC/loop.md`'s 👁️ collapse bullet, and `SPEC/procedures/ft-task.md`'s unattended-mode primitive + Phase 3 bullet are all consistent with the new contract
- [x] Mirror surfaces updated per `/ft-release` §7.1 **Pair I** and the roster pairs: `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` (3 sections), `claude/AGENTS-snippet.md`, the three command stubs, `README.md`, `docs/EXTERNAL-AGENTS.md`
- [x] `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" names the `[unattended]` row-level marker and its deny-by-default expectation, resolving `SPEC.md`'s dangling pointer (CORE-494 handoff, operator-approved)
- [x] No new cue glyph, no new banner, no validator — `AWAITING APPROVAL` count unchanged and the cue table untouched
- [x] Every added link and cited §heading resolves; no trailing whitespace; `viz` suite + typecheck + lint still clean

## 🧩 Subtasks

- [x] `SPEC.md` — add the `visual-confirm` row to the `park-reason` table; fix the "first five" count
- [x] `SPEC/gates.md` — Park-conversions row, the inherited-surfaces narrowing + its rationale, the 👁️ bullet in §"`--fast` operator override", the §"Emphasized inline ask shape" clause, one Rationalization row, one Red Flag line
- [x] `SPEC/blocked.md` — park-code count seven → eight
- [x] `SPEC/loop.md` — 👁️ gate-collapse bullet gains the posture clause (per-cycle ask still suppressed; the one-time post-loop ask parks)
- [x] `SPEC/procedures/ft-task.md` — unattended-mode primitive row (five → six, narrowed inheritance) + Phase 3 bullet
- [x] `claude/skills/ft-task/unattended-mode.md` — §"What the posture adds" narrowing + §"Conversion map" sixth row and its note
- [x] Runner wiring — `claude/skills/ft-task/SKILL.md` (Step 0 marker, Step 5 Phase 3) and `claude/skills/ft-goal-task/SKILL.md` (Step 0 marker, Step 6 one-time ask)
- [x] Mirror sweep — `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` ×3, `claude/AGENTS-snippet.md`, `claude/commands/ft-task.md` + `ft-goal-task.md`, `README.md`
- [x] `docs/EXTERNAL-AGENTS.md` — item 2's "a gate that survives `--fast`" claim + the `[unattended]` marker bullet
- [x] Phase 3 — verify by command: banner-count parity, glyph set-diff, link/anchor resolution, whitespace, viz suite + typecheck + lint
- [x] Phase 4 — doc-drift sweep, PLAN line flip, archive

## 🔗 Related

- [[CORE-473.2]] — `supersedes:`. Established the posture and fixed the conversion cardinality at **five**, inheriting all three `--fast` surfaces unchanged. This note overturns that third inheritance and moves the count to six
- [[CORE-473.3]] — `depends-on:` — minted the `park-reason:` key and its closed set; `visual-confirm` is the first code added to it since
- [[CORE-494]] — predecessor; its closure explicitly deferred the `docs/EXTERNAL-AGENTS.md` marker question to this task
- [[CORE-386]] — `related-decision:` — the standing rule that a `SPEC/gates.md` change arrives with Rationalizations / Red Flags rows
- [[CORE-460.3]] — `related-decision:` — Pair I; any flag-roster surface that already commits to a partial roster must be updated with the contract

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is verified by direct read at HEAD, not inferred. `SPEC/gates.md:458-460` states the posture inherits *all three* `--fast` surfaces "exactly as written", 👁️ suppression among them; `:462-473` tables five park conversions with no 👁️ row. So an `--unattended` run on a frontend task drops the one cue `SPEC/gates.md:152` calls "the only cue that **gates task completion**" and reaches closure with nothing recorded. Both edit surfaces the PLAN line names exist and carry the claims it describes.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The defect, stated precisely.** `--fast`'s three surfaces are not the same kind
of thing, and the posture inherited them as if they were:

| `--fast` surface | What it actually does |
|---|---|
| 📦 force-skip | **Removes a pause.** The run proceeds; the operator reviews the commit afterwards |
| 🛠️ no-op for routine trips | **Removes a pause.** Same shape — the default already skips them |
| 👁️ suppression | **Transfers an obligation.** `SPEC/gates.md:423` says so in its own words: *"The operator owns the visual-confirmation responsibility on fast-mode runs."* |

A transfer needs a transferee. `--unattended` exists to declare there is none. So
inheriting the third surface inherits a transfer to nobody — the obligation is not
deferred, it is dropped, silently, on the one cue the same file calls the only one
that gates task completion. That is the narrowing the PLAN line asks for.

**The superset claim survives, correctly scoped.** `--unattended` still never
blocks and never fires an ask into an empty session — the property the word
"superset" was reaching for. What it is *not* is a blanket inheritance of all three
surfaces. Formulated for the contract: **`--unattended` supersets `--fast`'s
autonomy, not its delegations.** Converting 👁️ to a park does not weaken autonomy;
it applies the posture's own single added behavior to a sixth gate.

**Trigger predicate — operator-confirmed, Option A.** Whenever Phase 3 would emit a
👁️ ask, park with `visual-confirm`. No second split is invented. The judgment of
*whether a change needs visual confirmation* already lives upstream in the Phase 3
box — a task with no rendered surface records `N/A` and never emits 👁️ (see
[[CORE-494]]'s own Phase 3, which did exactly that), so it never parks. Adding a
"gating vs. corroborating" split would mint a second judgment surface and a fresh
rationalization ("it's probably fine visually") on the exact surface `SPEC/gates.md`
§"Rationalizations" exists to close.

**Archive skim** (`grep -l` over `.flowtron/tasknote/archive/core/` for
`unattended-mode.md` / `park-reason` → 9 hits; `gates.md` → 25). Load-bearing:

- **[[CORE-473.1]]** — the epic Discovery that *chose* the inheritance being narrowed here. Its resolution table records the reason: *"`--unattended` implies `--fast` (strict superset) — one flag for a consumer to pass; removes the half-configured-unattended footgun."* That goal is preserved: the operator still passes one flag and never both. Only the claim about what the flag inherits changes.
- **[[CORE-473.3]]** — minted `park-reason:` with the closed set explicitly extensible: *"a new stop cause adds a row to this table, never a free-form value."* `visual-confirm` is the first exercise of that clause, so the shape is prescribed rather than designed here. It also fixed the placement convention: gate conversions group first, `dependency` and `interrupted` after.
- **[[CORE-473.1]] → `/ft-release` §7.1 Pair I** — the non-obvious wiring obligation: `claude/CAPABILITIES.md` flag rows and the three `docs/PLATFORMS.md` §"Non-Claude capability triggers" tables are gated against each other, so a flag-semantics change that skips them fails the release gate. Recorded on the subtask list rather than discovered late.
- **[[CORE-386]]** — a `SPEC/gates.md` change arrives with Rationalizations / Red Flags rows. [[CORE-473.3]] argued it was exempt because it *described a stop rather than permitting one*; this task is not exempt by that test — it removes a suppression an assistant could argue back into place, which is precisely a rationalization surface.
- **[[CORE-494]]** — the immediately prior task, and it hands one item over by name: its doc-drift sweep recorded that whether `docs/EXTERNAL-AGENTS.md` should cite the `[unattended]` row marker *"belongs with `CORE-495`'s posture edit."*

**Drift check.** All cited paths, anchors, and quotes verified by direct read at
HEAD (v5.21.0). No pre-existing drift in the `--unattended` surface itself. Two
findings:

1. **Scope necessarily reaches `SPEC/gates.md`, not only the SKILL fragment.** The PLAN line names `unattended-mode.md` §Conversion map, but that file's own header states it *"is its executable interpretation, not a second copy"* and that *"the contract lives in `SPEC/gates.md`."* Editing only the fragment would fork the contract. Recorded as necessary completion of the named scope, not as scope growth.
2. **A dangling pointer created by [[CORE-494]], assigned here.** `SPEC.md:185` says operator-less callers *"are expected to **deny by default**: an unmarked row is undecided, not approved"* and cites `docs/EXTERNAL-AGENTS.md` — which never mentions the `[unattended]` marker anywhere. The pointer resolves to a document, not to the claim it promises. Absorbing the fix was put to the operator (Q2) and approved.

**Clarifying questions (AskUserQuestion, 2 asked, both answered with the recommended option).**

| # | Question | Answer | Consequence |
|---|---|---|---|
| Q1 | 👁️ park trigger: any emitted ask, or an ✋-style gating/corroborating split | **Any emitted 👁️ ask** | One row, no new judgment surface, no new rationalization. Cost accepted: an unattended run that genuinely warrants a visual check ends in a park rather than a commit — which is the honest outcome |
| Q2 | Absorb [[CORE-494]]'s deferred `docs/EXTERNAL-AGENTS.md` marker pointer, or file it separately | **Absorb** | One bullet in a file this task already edits; `SPEC.md:185`'s pointer stops dangling |

**Assumptions asserted.** The code token is `visual-confirm` — the spelling the PLAN
line fixes, lowercase kebab and named after the *stop* rather than the glyph, per
[[CORE-473.3]]'s stated convention. `/ft-micro-task` takes no 👁️ row: its own body
(`SKILL.md:42`) states it *"has no separate 👁️ ask"*, so the conversion-map column is
n/a rather than a park. No SPEC version bump — `/ft-release` owns versioning.

**Deliberate non-scope (filed, not forgotten).** (a) **No viz change** — `park-reason:`
is not parsed by `viz/src/parser.ts` and `visual-confirm` adds no grammar. (b) **No
template change** — [[CORE-473.3]] settled that `park-reason:` follows the `loop-*`
module-only precedent, with no scaffold stub. (c) **`docs/GLOSSARY.md`** — carries no
`park-reason` or `--unattended` entry today, so there is nothing to keep in sync;
minting the first one is an audit-follow-up decision per its own Maintenance clause.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (contract prose only; no executable surface changed, and `park-reason:` has no validator by [[CORE-473.3]]'s decision)

**Implementation Notes:**

**Pattern survey — extended three shipped shapes, invented none.** The
`park-reason` addition is [[CORE-473.3]]'s own extension clause exercised for the
first time (*"a new stop cause adds a row to this table"*), placed with the gate
conversions so the "first N are the gate conversions" grouping still reads. The
conversion row is the [[CORE-473.2]] table shape verbatim. The Rationalizations /
Red Flags pair is [[CORE-386]]'s standing requirement for a `SPEC/gates.md`
change — and unlike `.3`, this task is *not* exempt by its own test: removing a
suppression leaves an excuse an assistant can argue back into place.

**Minimal refactor gate — one structural addition, deliberate.** `SPEC/gates.md`
gained a heading, `### "What is inherited, and what is not"`, because the
narrowing needed somewhere to live that both the `--fast` section and the SKILL
fragment could cite; wedging it into the existing "Inherited from `--fast`,
unchanged" sentence would have left the *reason* unstated and the next reader
free to re-derive the old claim. Everything else extends an existing sentence or
table. No file created, no glyph minted, no validator.

**The argument, recorded once and cited everywhere.** `--fast`'s three surfaces
are not the same kind of thing: 📦 force-skip and 🛠️ no-op **remove a pause**,
while 👁️ suppression **transfers an obligation** to the operator standing there.
A transfer needs a transferee; `--unattended` exists to say there is none. Every
other edit in this diff is that sentence applied to one surface.

**Edit surface — 18 files, +117/−53, contract + wiring + rosters:**

| Layer | Files | Change |
|---|---|---|
| Contract | `SPEC.md`, `SPEC/gates.md`, `SPEC/blocked.md`, `SPEC/loop.md`, `SPEC/procedures/ft-task.md` | `visual-confirm` code + count fix; the new §"What is inherited, and what is not", the sixth conversion row and its trigger note, the `--fast` 👁️ bullet, the emphasized-ask clause, one Rationalization pair and one Red Flag; park-code count seven→eight; the loop's one-time-ask clause; the SOP's neutral `unattended mode` primitive + Phase 3 bullet |
| Runners | `claude/skills/ft-task/unattended-mode.md`, `ft-task/SKILL.md`, `ft-goal-task/SKILL.md`, `ft-micro-task/SKILL.md` | Fragment §"What the posture adds" + conversion-map row, per-runner columns and the goal-loop note; both Step 0 markers; `/ft-task` Step 5 Phase 3 branch; `/ft-goal-task` Step 6 park |
| Rosters + docs | `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` ×3, `claude/AGENTS-snippet.md`, 3 command stubs, `claude/skills/ft-flowtron/SKILL.md`, `README.md`, `docs/EXTERNAL-AGENTS.md` | Pair I + Pair E + Pair J surfaces re-stated against the narrowed claim |

**`/ft-micro-task` takes no park.** Its own Step 0 states it emits no separate 👁️
ask, so the conversion-map column is n/a. Its superset sentence was still
corrected — a skill that inherits a claim it cannot exercise still restates the
claim.

**One neutrality correction caught by verification, not by eye.** The first draft
of the `visual-confirm` table cell named `--fast`, which would have put a
Claude-specific flag token into a **sixth** `SPEC.md` section while
`docs/AGENT-NEUTRALITY.md:40`'s ledger row enumerates exactly five. Reworded to
name the stop rather than the flag — which also matches how every neighbouring
cell in that table is written. Token count verified back to 6 across the same 5
sections.

**Downstream-impact reconciliation — none required.** The only other active PLAN
entry is `CORE-493` (a `viz` memoization fix in `tools/update-adopters.mjs`),
which shares no surface with the gate contract. `## High` and
`## Future Opportunities` are empty.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` **28 files / 521 passed**; `node --test tools/update-adopters.test.mjs` **45 passed, 0 failed**. Both are release gates, run as regression proof rather than because this diff touches them

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) and `npm --prefix viz run lint` (`eslint src`) both clean; `node --check` clean on both `tools/*.mjs`

- [x] **Quality assertions** — no avoidable duplication: the narrowing argument is stated **once** in `SPEC/gates.md` §"What is inherited, and what is not" and every other surface cites or compresses it rather than re-deriving it. No dead prose (each edited passage was a live claim that is now false without the edit). No unnecessary public-surface growth — one code token, one table row, one heading; zero new flags, glyphs, banners, files, or validators. No stale code-facing documentation: `viz/src/parser.ts` does not parse `park-reason:`, so the parser's contract is untouched

- [x] (frontend) N/A — markdown contract prose only; no rendered surface was changed, so there is nothing to confirm visually

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Acceptance here is structural, so each criterion was verified by command rather
than by reading:

| Check | Command | Result |
|---|---|---|
| Two-banner cap intact | `grep -c 'AWAITING APPROVAL'`, HEAD vs working, all four gate-bearing files | `SPEC.md` 0→0 · `SPEC/gates.md` **12→12** · `blocked.md` 0→0 · `loop.md` 0→0 |
| No new cue glyph minted | Python set-diff of all `So`/`Sk` code points, HEAD vs working, across all 18 changed files | Additions only: `👁` (5 files), `📦` + `🛠` (1 file). All three are **existing canonical cues**, new to *those files* only — same finding shape [[CORE-473.3]] recorded for `⏸`/`🛠`. Nothing minted, nothing lost |
| Every added link resolves | extract `](…)` from added diff lines, `os.path.exists` each | **5/5** |
| Every cited §heading resolves | grep each `§"…"` on an added line for a real `#+` heading | **24/24**, including the new §"What is inherited, and what is not" |
| Neutrality-ledger site count | count `--fast` tokens + their containing sections in `SPEC.md`, HEAD vs working | 6→7 on the first draft (a **6th** section against `docs/AGENT-NEUTRALITY.md:40`'s enumerated five) → reworded → **6→6 across the same 5 sections** |
| Whitespace | `git diff --check` + trailing-space grep | clean / none |
| Release gates | `viz` suite + typecheck + lint; `tools` suite + 2 × `node --check` | 521 + 45 tests pass; all checks clean |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — its `--unattended` bullet claimed a strict `--fast` superset; now names the 👁️ delegation as the surface that converts |
| `AGENTS.md` | no change — repo layout + validation commands; carries no posture claim. Its six validation commands were the ones run |
| `SPEC.md` | **updated** — `visual-confirm` in the `park-reason` closed set, the "first six" count, and the §"🧪 Phase 3" conversion clause |
| `docs/MIGRATION.md` | no change — zero `unattended` / `👁️` / `park-reason` hits; adoption and bump procedure only |
| `claude/AGENTS-snippet.md` | **updated** — the adopter-facing posture paragraph enumerated five gates and claimed blanket inheritance |
| `codex/` · `cursor/` · `grok/AGENTS-snippet.md` | no change — verified by grep: none of the three mentions `--unattended` at all. Thin wiring pointing at the canonical bodies |
| `docs/CONVENTIONS.md` | no change — its one `--unattended` hit is the mirror-pattern illustration ("a mirror is an application, not a copy"), unaffected by what the posture inherits |
| `CONTRIBUTING.md` | no change — solo-maintenance model |
| `SECURITY.md` | no change, and this one needed a real look: `:88` says *"do not suppress the remaining pause (`--fast`, or the `--unattended` posture) on a first run against contributor-authored content."* Still true, and this change makes the posture strictly **less** suppressive — it removes a suppression rather than adding one. No new injection surface: a park is a file write the assistant makes about its own stop |
| `docs/AGENT-NEUTRALITY.md` | no change — **and it is the reason one edit was reworked.** Its `:40` ledger row enumerates five `SPEC.md` sections carrying `--fast`; the first draft of the `visual-confirm` cell would have added a sixth. Reworded to name the stop instead, restoring the count. The `:41` row (`SPEC/procedures/ft-task.md`, "1 site each") also holds — that SOP's `--unattended` token count is unchanged at 2, because its new Phase 3 clause uses the **neutral** primitive *unattended mode*, not the Claude spelling |
| `docs/PLATFORMS.md` | **updated** — all three §"Non-Claude capability triggers" tables (Grok / Codex / Cursor), per `/ft-release` §7.1 **Pair I** |
| `claude/CAPABILITIES.md` | **updated** — the `--unattended` flag row, Pair I's other half. Its last-verified stamp stands: no version bump here |
| `docs/AGENT-COMPAT.md` | no change — its 👁️ passage governs the *emission shape* of an ask that is actually emitted. A converted ask is not emitted, so the degradation matrix is untouched |
| `docs/EXTERNAL-AGENTS.md` | **updated, twice.** The orchestration contract's park rule assumed every conversion is "a gate that survives `--fast`" — false of the one that converts *because* `--fast` suppresses it. Separately, [[CORE-494]]'s handoff: a new deny-by-default bullet names the `[unattended]` row marker, resolving `SPEC.md:185`'s pointer that previously landed on a document not carrying the claim. List renumbered 1–7 |
| `docs/WORKTREES.md` | no change — isolation convention; orthogonal to gate posture |
| `docs/VISION.md` | no change — the conversion ships contract, not runtime. No scheduler, daemon, or validator added, so no boundary moved. Pair K's labeled mirrors still point at unmoved bullets |

**Outside the sweep set, considered.** `SPEC/gates.md`, `SPEC/blocked.md`,
`SPEC/loop.md`, `SPEC/procedures/ft-task.md`, and five `claude/skills/*/SKILL.md`
bodies were **edited as deliverables** — they sit outside the sweep set by the
volume decision in `.flowtron/tasknote/README.md`, not by irrelevance.
`docs/GLOSSARY.md` carries no `park-reason` or `--unattended` entry today, so
there is nothing to keep in sync; minting the first is an audit-follow-up call
under its own Maintenance clause.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

A Phase 3 visual-confirmation ask no longer vanishes when nobody is watching. Under
`--unattended` it parks the tasknote with `park-reason: visual-confirm — …`, so a
caller reading the repo learns that a rendered surface changed and no one looked —
where before the run committed and said nothing.

The fix required overturning one line of [[CORE-473.2]]. That task made
`--unattended` a *strict* superset of `--fast`, inheriting all three of its
surfaces, and the third one is not like the other two: 📦 force-skip and 🛠️ no-op
**remove a pause**, while 👁️ suppression **transfers an obligation** — `SPEC/gates.md`
said as much in its own words (*"the operator owns the visual-confirmation
responsibility on fast-mode runs"*). A transfer needs a transferee, and this posture
exists precisely to declare there is none, so inheriting it dropped the obligation
rather than moving it. The contract now says **`--unattended` supersets `--fast`'s
autonomy, not its delegations**, and that one sentence is what all eighteen files
restate. Nothing about autonomy weakened: a park is a stop, not a pause.

- **Contract** (5 files). `visual-confirm` joins the `park-reason` closed set — the first exercise of [[CORE-473.3]]'s *"a new stop cause adds a row"* clause. `SPEC/gates.md` gains one heading (§"What is inherited, and what is not"), a sixth Park-conversions row, two Rationalization rows, and a Red Flag, per [[CORE-386]]'s standing rule; `blocked.md`, `loop.md`, and the agent-neutral SOP follow.
- **Trigger is the emission condition, deliberately.** Whenever Phase 3 *would* emit 👁️, park — no gating-vs-corroborating split. The operator was offered the ✋-style split and declined it: a second judgment surface would mint exactly the "the tests probably cover it" excuse the Rationalizations section exists to close. A task with no rendered surface records `N/A`, emits nothing, and never parks.
- **Wiring** (13 files). Both runner Step 0 markers, `/ft-task` Phase 3, `/ft-goal-task`'s one-time post-loop check, and every roster that had committed to the old claim — Pair I's `CAPABILITIES` ↔ `PLATFORMS` ×3, Pair E's `ft-flowtron` table, three command stubs, the adopter snippet, `README`. `/ft-micro-task` emits no 👁️ ask, so its column is n/a — but its inherited sentence was still corrected.
- **Verification by command, not by eye.** 521 viz tests + 45 updater tests pass; `tsc`, `eslint`, and both `node --check`s clean. `AWAITING APPROVAL` 12→12 on `gates.md` (two-banner cap intact); glyph set-diff shows only existing canonical cues appearing in new files, nothing minted; 5/5 added links and 24/24 cited §headings resolve; `git diff --check` clean.
- **One correction the checks caught.** The first draft named `--fast` inside the `park-reason` table, which would have put a Claude-specific token in a sixth `SPEC.md` section against `docs/AGENT-NEUTRALITY.md`'s enumerated five. Reworded to name the stop — better prose anyway, since no neighbouring cell cites a flag.
- **[[CORE-494]]'s handoff cleared.** `SPEC.md`'s `[unattended]` row told operator-less callers to deny by default and pointed at `docs/EXTERNAL-AGENTS.md`, which never mentioned the marker. That doc's orchestration contract now carries it as its own rule.
- **Maintainability effect.** An orchestrator draining flowtron rows unattended can no longer close a UI task nobody looked at, and gets a distinguishable code when it stops. The narrowing is stated once with its reason attached, so the next reader who notices `--unattended` implies `--fast` finds the argument instead of re-deriving the old claim — which is how [[CORE-473.2]]'s version survived three months.

**Archived:** 2026-08-29
