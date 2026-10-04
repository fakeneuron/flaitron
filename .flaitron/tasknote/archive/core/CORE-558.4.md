---
title: skill-runner-fidelity
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-558, CORE-558.1, CORE-558.2, CORE-558.3, CORE-535.4, CORE-551, CORE-552]
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
blocked-by:
  - CORE-558.3
touches:
  - claude/skills/ft-task/
  - claude/skills/ft-file-followup/
  - claude/skills/ft-epic-discovery/
  - claude/skills/ft-micro-task/
  - claude/skills/ft-goal-task/
  - claude/skills/ft-close-epic/
---

# CORE-558.4 | skill-runner-fidelity

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-558]]

## 🎯 Goal

Verify the six unattended-critical `ft-*` skill runners are still executable end-to-end after CORE-535.4's cite-don't-restate shrink, restoring any missing skill-local imperatives and repointing citations at the SPEC homes `.2` / `.3` restored.

## ✅ Acceptance

- [x] Every `§"Section"` citation in the six runners' bodies resolves to a live anchor at HEAD — verify: `python3 /tmp/citecheck.py` reports 0 genuine dangling (validator artifacts named in Testing Notes)
- [x] Every sentence deleted from the six runners since `e0773c2` is classified relocated / reworded / superseded / restored, with the residue named in Discovery Notes — verify: `python3 /tmp/classify.py` homeless count reconciled cluster-by-cluster
- [x] Each genuine skill-local loss is restored in today's vocabulary, citing its SPEC home rather than pasting SPEC prose back (cite-don't-restate, [[CORE-535.4]])
- [x] Post-shrink features confirmed present in the runner bodies: [[CORE-551]]'s `/ft-file-followup --unattended` and [[CORE-552]]'s `/ft-epic-discovery` refusal
- [x] No `SPEC/` module or `SPEC.md` edited — that surface belongs to [[CORE-558.2]] / [[CORE-558.3]]; verify: `git diff --name-only` lists only `claude/skills/**`
- [x] Every edited `SKILL.md` stays under its 30,000-char cap, or the overage is handed to [[CORE-558.5]] — verify: `wc -c`
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Build a citation validator over the six runner directories; resolve path variables (`<SPEC_DIR>` / `<SKILL_DIR>` / `<UNATTENDED>` / `<MODEL_EDGE>`) and accept both heading and bold-lead anchors
- [x] Diff each runner against `e0773c2`; extract deleted sentences with no verbatim home at HEAD
- [x] Cluster the residue and check each cited home actually carries what the skill delegated to it
- [x] Strong-modal survival sweep over the residue (Do not / never / must / always / only)
- [x] Confirm [[CORE-551]] / [[CORE-552]] survive in the runner bodies
- [x] Phase 2: restore the genuine loss (skill-local imperative, no paste-back)
- [x] Phase 3: re-run both validators; markdown mental-pass; byte-count the edited files
- [x] Phase 4: doc-drift sweep + flip the `.4` PLAN line to stub form + archive the tasknote

## 🔗 Related

- [[CORE-EPIC-558]] — parent epic (post-shrink-fidelity)
- [[CORE-558.3]] — blocked-by: gates + unattended posture restored first; this child's citations must target those homes
- [[CORE-558.2]] — depends-on: SPEC.md homes restored in `.2` are the citation targets
- [[CORE-558.1]] — Discovery: roster (Q3), restore style (Q4), and Fan-out sequencing
- [[CORE-535.4]] — the shrink under review (cite-don't-restate on `ft-task` / `ft-micro-task` / `ft-epic-discovery`)
- [[CORE-551]] — post-shrink feature to preserve: `/ft-file-followup --unattended` filing authority
- [[CORE-552]] — post-shrink feature to preserve: `/ft-epic-discovery` refuses `--unattended`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` and `.3` both landed and both found real losses (3 in `SPEC.md`, 1 in `gates.md`), so the premise — that the shrink cost fidelity somewhere — is confirmed, not speculative. `.4` is the last surface the epic reviews before `.5` measures. The roster fits one window: the six runners total ~152k chars, but the method is diff-driven, so only the ~64 deleted lines and their cited homes need reading. No split.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown skill prose, no code module boundaries. The one boundary that governs here is already locked and is the subject of the review itself: cite-don't-restate ([[CORE-535.4]]) — skills point at SPEC, they do not paste it back.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Method

Inherited from [[CORE-558.2]] and [[CORE-558.3]], which converged independently
on the same two-instrument pass. Both instruments are rebuilt here for the skill
surface rather than the SPEC surface:

1. **Citation validator** — every `§"Section"` reference in the six runner
   directories, resolved through the skills' own path variables (`<SPEC_DIR>`,
   `<SKILL_DIR>`, `<UNATTENDED>`, `<MODEL_EDGE>`), matched against both `#`
   headings and `**Bold-lead.**` paragraph anchors at HEAD.
2. **Diff-then-classify** — every sentence deleted since `e0773c2`, checked for a
   verbatim home anywhere in `SPEC.md` + `SPEC/**` + `claude/skills/**` +
   `templates/` + `docs/**`, with the residue hand-clustered.

The `§` convention addresses **both** headings and bold-lead paragraphs — flowtron
cites `SPEC.md` §"Deferred hand-off filing" (a bold-lead at `SPEC.md:542`) exactly
as it cites a `##` heading, and [[CORE-558.3]]'s own restore was authored as a
bold-lead. A validator that only indexes headings reports ~20 false dangles; this
one indexes both.

### B. Scope reality vs. the filing

The `.4` line names six runners, but the shrink is concentrated in three:

| Runner | pre-535.4 | HEAD | Δ | 535.4 target? |
|---|---|---|---|---|
| `ft-task/SKILL.md` | 33,940 | 28,924 | **−5,016** | yes |
| `ft-micro-task/SKILL.md` | 21,265 | 19,223 | **−2,042** | yes |
| `ft-epic-discovery/SKILL.md` | 28,186 | 26,986 | **−1,200** | yes |
| `ft-goal-task/SKILL.md` | 26,158 | 26,775 | +617 | no |
| `ft-close-epic/SKILL.md` | 26,926 | 26,935 | +9 | no |
| `ft-file-followup/SKILL.md` | 16,031 | 23,648 | +7,617 | no ([[CORE-551]] grew it) |
| `ft-task/unattended-mode.md` | 12,501 | 13,811 | +1,310 | no |

The three that grew are follow-it-today reviews, as the `.1` Discovery predicted;
the deletion diff has force only on the first three.

### C. Citation validator — result

**195 citations checked across all 11 files in the six directories. 0 genuine
dangling.** Six reported hits, all validator artifacts, each confirmed by reading
the citing line:

- `SPEC/epic.md` §"Fan-out." ×3 — heading is `## Fan-out (optional)`; the `.` is
  sentence punctuation and `Fan-out` is 7 chars, under the validator's 8-char
  prefix-match guard.
- `step-4-debug-mode.md` §"Phase 1" — heading is `## Phase 1 — the four prompts
  (Step 4)`; same guard.
- `<tasknote dir>/README.md` §"AI-referenced docs" ×2 — a path *variable*, not a
  literal path; `.flowtron/tasknote/README.md:34` carries the heading.

The pointer layer therefore survived [[CORE-535.3]]'s and [[CORE-535.5]]'s
relocations intact, including the `gates.md` → `cue-vocabulary.md` repoint of
§"Accepted gate replies" and §"Emphasized inline ask shape".

### D. Diff-then-classify — result

173 deleted sentences (>45 chars, frontmatter `description:` excluded); **106 with
no verbatim home at HEAD**. Hand-clustered into eight clusters, each checked by
reading the cited home rather than trusting the citation:

| # | Cluster | Runners | Cited home | Home carries it? |
|---|---|---|---|---|
| A | Step 1.5 model-gate restatement | ft-task, ft-micro-task | `SPEC/model.md` §"Category-vs-concrete matching" | ✅ richer than the removed prose — 4-row gate-action table + the `xheavy` manual-only rule |
| B | Phase 1→2 concrete skip/fire cases | ft-task | `SPEC/gates.md` §"Phase 1→2 exit gate" | ✅ both case lists + the inline judgment record |
| C | Phase 4 closure ops | ft-task | `SPEC.md` §"🚀 Phase 4: Closure" | ✅ all seven named ops **plus** the no-chip-flip callout the skill no longer names |
| D | Step 6 skip/fire motions | ft-task, ft-micro-task, ft-epic-discovery | `SPEC/gates.md` §"Conditional skip rule" | ✅ both motions named as bold-lead anchors |
| E | Suggest-next-move + copy-paste | ft-task, ft-micro-task, ft-epic-discovery | `SPEC.md` §"Post-closure protocol" 2–3 | ✅ fresh re-read, PLAN-exhausted terminal form, glyph ladder, `.N`-collision reason, never-default-🔧, 👇 exception |
| F | 🎯 purpose-blurb bounds | ft-task, ft-micro-task | `SPEC/purpose-blurb.md` | ✅ bounds + both-flags clause |
| G | Downstream-impact reconciliation | ft-task, ft-epic-discovery | `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" | ✅ triggers, 3 scan steps, both tables, user-confirm gate |
| H | `unattended-mode.md` "three runners" | ft-task fragment | — | ✅ superseded — the roster grew past three post-[[CORE-551]] |

**Strong-modal survival sweep** over the residue (`do not` / `never` / `must` /
`always` / `only`): every modal-bearing sentence maps into A–H above. The two
that most warranted checking — *"Do **not** flip the markdown nav chip"* and
*"flip **only this task's** PLAN.md line"* — are both alive: the first as a
dedicated `SPEC.md` callout that argues against re-adding it, the second retained
verbatim as a skill-local imperative in `ft-task` Step 5.

### E. The find — model-gate tier routing

One genuine skill-local loss survived both sweeps.

**Pre-shrink**, the Satisfied branch stated its own criterion with worked
examples: *"concrete tag equals the active model, OR a category tag whose tier the
active model meets or exceeds (e.g. `[light]` on sonnet, `[heavy]` on opus)"*, and
the under-tier branch named tiers concretely (*"grok (medium) or haiku (light)"*).
**At HEAD** the four branches are bare labels, and the routing rule is one
compressed clause: *"concrete by exact identity, category by tier, and `[xheavy]`
always under-tier."*

That clause states the *rule* but carries no *ladder* — and the ladder is what the
decision needs. The gap is structural, not merely terse:

> **Satisfied is the only branch that does not read `model.md`.** The other three
> all say *"Read `<SPEC_DIR>/model.md` … in parallel"*. So a runner that routes to
> Satisfied by impression proceeds silently and never loads the module that would
> have corrected it — the one verdict with no read has no correction path.

The failure is concrete and current: an agent running as `sonnet` meeting
`[heavy]` must route to **Category under-tier**, because `sonnet` is `medium`.
`SPEC/model.md` anticipates exactly this misread — *"`sonnet` sits at the top of
this rung — the Sonnet 5 generation narrowed the gap to `heavy` substantially …
but stays `medium` deliberately"* — but that warning only fires for a runner that
already decided to read the file.

Present in **all three model-gate skills** (the roster `ft-goal-task` Step 1.5
itself names): `ft-task`, `ft-micro-task`, `ft-goal-task`. `ft-file-followup`,
`ft-epic-discovery` and `ft-close-epic` have no model gate and are unaffected.

**Shape of the restore.** Not the pre-shrink examples — those are `model.md`'s
content and pasting them back violates [[CORE-535.4]] and the epic's constitution
item 4. The missing piece is a *routing* instruction the skill owns and `model.md`
structurally cannot give (it is the file not yet read): **when the tier is not
certain, read before routing to Satisfied.** One sentence per skill, citing the
home `.2`/`.3` left intact.

### F. Post-shrink features — confirmed present

- [[CORE-551]] — `ft-file-followup/SKILL.md`: `--unattended` in the description,
  the Step 0 flag branch, the `--park` non-composition rule, the
  operator-less unknown-arg stop, and the §"Unattended filing authority" citation
  at the commit step. 30 occurrences.
- [[CORE-552]] — `ft-epic-discovery/SKILL.md:42`: the readable refusal, with the
  correct five-runner redirect roster and "write nothing" semantics.
- [[CORE-558.3]]'s restore — the `--fast` 👁️/lint scope-limiter now lives in
  `SPEC/gates.md` §"`--fast` operator override", so `ft-micro-task` and
  `ft-goal-task` (which carry no skill-local copy) can reach it. `ft-task`'s own
  copy at Step 5 Phase 3 reads consistently with it — no contradiction to resolve.

### G. Drift check

- `e0773c2` confirmed as `CORE-535.3` — the parent of `535.4`, as the `.1`
  Discovery recorded. Baseline correct.
- The `.4` PLAN line's roster of six matches the directories on disk; `<UNATTENDED>`
  and `<MODEL_EDGE>` are shared fragments **owned by `/ft-task`**, correctly
  declared in the other skills' Step 0 path blocks — no per-skill copy exists or
  is needed.
- The `.1` Fan-out names `.4` Sequential after `.3`; `.3` is closed, so the
  dependency is cleared. Echoed as YAML `blocked-by:` on this note.
- Live sibling [[CORE-557]] will rewrite the Phase 3 **Quality assertions** box
  across `SPEC.md` + the `ft-task` / `ft-goal-task` / `ft-micro-task` Phase 3
  restatements. This task's restore lands at **Step 1.5**, not Phase 3, so the
  surfaces do not overlap. No pre-emption.
- [[CORE-559]] is explicitly sequenced after this epic and touches the same skill
  bodies; it is unstarted, so no collision.

No SPEC contradiction: the restore adds a skill-local routing imperative and cites
`SPEC/model.md` rather than reproducing it, which is what constitution item 4 and
the `.4` PLAN line both require.

### H. Clarifications

No clarifications needed. Explicit assumptions:

1. `§"…"` legitimately addresses bold-lead anchors as well as headings (evidenced
   by `SPEC.md` §"Deferred hand-off filing" and [[CORE-558.3]]'s own restore), so
   heading-only dangling reports are validator artifacts, not findings.
2. "Restore missing skill-local imperatives" means imperatives with no possible
   SPEC home — routing, path variables, step numbers, marker emission — not prose
   that a live citation already reaches.
3. The six-runner roster is closed; a defect found outside it is filed, not fixed
   here (Q5 of the `.1` Discovery).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

One restore, three files, five lines. `claude/skills/ft-task/SKILL.md` (+2),
`ft-micro-task/SKILL.md` (+2), `ft-goal-task/SKILL.md` (+1 — its Step 1.5 is a
single compressed paragraph, so the imperative lands as a trailing clause rather
than its own paragraph).

**Pattern survey.** Extended the shape [[CORE-558.3]] used for the same class of
find: a **bold-lead paragraph** stating the bound, placed at the decision point,
citing rather than reproducing its home. Placed *above* the `Branch on the
verdict:` lead-in so the lead-in stays adjacent to its list — the first draft
split them and was reordered in Phase 3.

**Minimal refactor gate.** No refactor. Only the three model-gate skills were
touched; the three without a model gate (`ft-file-followup`, `ft-epic-discovery`,
`ft-close-epic`) were reviewed and left byte-identical.

**No paste-back.** The restore adds no tier ladder, no calibration band, and no
model name — all of that is `SPEC/model.md`'s content, and reproducing it is what
constitution item 4 forbids. What it adds is the *routing* instruction the module
structurally cannot give, because it is the file not yet read.

**No `SPEC/` or `SPEC.md` edit** — that surface belongs to [[CORE-558.2]] /
[[CORE-558.3]]; `git diff --name-only` lists three paths, all under
`claude/skills/`.

**Downstream-impact reconciliation:** the mid-execution decision (restore as a
skill-local routing imperative rather than by restoring examples) stays inside
this task — it changes no contract, and `SPEC/model.md` is untouched. Scan not
required. Two active siblings share the runner surface and were checked anyway:
[[CORE-557]] (Phase 3 quality-assertions box) and [[CORE-559]] (`touches:` at
Phase 1 / Phase 4) — both **Unaffected / Leave**, since neither reaches Step 1.5.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Two throwaway instruments, matching [[CORE-558.2]] / [[CORE-558.3]] precedent (the
validators are analysis tools for the pass, not shipped artifacts):

| Check | Result |
|---|---|
| Citation validator, 11 files across the six runner dirs | **195 citations, 0 genuine dangling** — identical before and after the edit |
| Reported-but-artifact hits | 6, each read and confirmed: `§"Fan-out."` ×3 and `§"Phase 1"` fall under the validator's 8-char prefix-match guard; `<tasknote dir>/README.md` ×2 is a path variable, and `.flowtron/tasknote/README.md:34` carries the heading |
| Diff-then-classify vs `e0773c2` | 173 deleted sentences, 106 homeless, all 106 mapped into clusters A–H |
| Strong-modal survival sweep | every modal-bearing homeless sentence maps into A–H; 0 residue |
| `git diff --check` | clean |
| Byte cap (30,000 per SKILL.md) | ft-task 29,355 · ft-micro-task 19,654 · ft-goal-task 27,140 — all under; **no ceiling raise needed from `.4`** |
| Files touched | 3, all `claude/skills/**`; no `SPEC/` or `SPEC.md` edit |

Markdown mental-pass on the three edits: bold-lead anchor shape matches the
sibling paragraphs; `§"…"` citation form matches the file's existing convention;
list lead-in adjacency restored; no trailing whitespace; LF endings.

Targeted test suite / lint / type-check: `N/A` — markdown skill prose, no
executable surface. The visualizer suite and the fleet-updater suite are both
untouched by these paths.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Reviewed the six unattended-critical `ft-*` runners for process lost to
[[CORE-535.4]]'s cite-don't-restate shrink and found the shrink held almost
completely: **195 citations across the six directories resolve, 0 dangling**, and
all 106 deleted-with-no-verbatim-home sentences classify into eight clusters whose
cited homes were each opened and confirmed to carry what the skill delegated to
them. Three of those homes are *richer* than the prose they replaced — most
notably `SPEC.md` §"🚀 Phase 4: Closure", which carries a dedicated no-chip-flip
callout arguing against the very re-addition an agent might propose.

**The find.** One genuine skill-local loss, and it is structural rather than
verbal. `Satisfied` is the only Step 1.5 branch that proceeds *without* reading
`SPEC/model.md`; the other three all say "Read … in parallel". Pre-shrink, the
Satisfied branch carried its own criterion inline with worked examples, so a
runner could route correctly without the module. At HEAD the branches are bare
labels and the rule is one compressed clause — which states *that* category tags
match by tier but carries no ladder. A runner that routes to Satisfied by
impression therefore proceeds silently and never loads the file that would have
corrected it: the one verdict with no read has no correction path. `SPEC/model.md`
anticipates exactly this misread for a mid-tier model meeting a `[heavy]` tag, but
that warning only fires for a runner that already decided to read it.

**The restore.** One bold-lead paragraph — *"Route on a verified tier, not an
impression"* — at the decision point in all three model-gate skills (`/ft-task`,
`/ft-micro-task`, `/ft-goal-task`; the roster `ft-goal-task` Step 1.5 itself
names). It adds no tier ladder, no calibration band and no model name: that is
`SPEC/model.md`'s content, and reproducing it is what the epic's constitution
forbids. What it adds is the *routing* instruction the module structurally cannot
give, because it is the file not yet read — the definition of a skill-local
imperative this child was filed to restore.

**Evidence.** 3 files, +5/−1 lines. `ft-task` 28,924 → 29,355 · `ft-micro-task`
19,223 → 19,654 · `ft-goal-task` 26,775 → 27,140 — all under the 30,000 cap, so
**`.4` hands [[CORE-558.5]] no ceiling raise**. Method inherited from
[[CORE-558.2]] / [[CORE-558.3]] and rebuilt for the skill surface: a citation
validator resolving the skills' own path variables (`<SPEC_DIR>` / `<SKILL_DIR>` /
`<UNATTENDED>` / `<MODEL_EDGE>`) and indexing bold-lead anchors as well as
headings — a heading-only index reports ~20 false dangles, since flowtron's `§`
convention legitimately addresses both.

**Scope reality.** The `.4` line names six runners, but only three were 535.4
targets (`ft-task` −5,016, `ft-micro-task` −2,042, `ft-epic-discovery` −1,200);
the other three grew after the shrink and were follow-it-today reviews, exactly as
the `.1` Discovery predicted. No split was needed — the pass is diff-driven, so
only the ~64 deleted lines and their cited homes required reading.

**Post-shrink features confirmed intact:** [[CORE-551]]'s
`/ft-file-followup --unattended` (30 occurrences, including the `--park`
non-composition rule and the operator-less unknown-arg stop) and [[CORE-552]]'s
`/ft-epic-discovery` readable refusal with its five-runner redirect roster.
[[CORE-558.3]]'s own restored `--fast` 👁️/lint scope-limiter is reachable from
`gates.md` by the two runners that carry no local copy, and `ft-task`'s local copy
reads consistently with it. [[CORE-557]] and [[CORE-559]] both share the runner
surface and were left untouched — neither reaches Step 1.5.

**Refactors:** none made, none deferred. **Documentation:** 18/18 no change —
`claude/skills/*/SKILL.md` sits outside the sweep set by design, and the two docs
that mention a model gate at all (`SPEC.md:369`, `docs/PLATFORMS.md:400`) restate
no Satisfied criterion.

**Maintainability effect.** The epic's three implementation children have now each
found exactly one class of loss, and all three are the same shape: a **bound or
qualifier that survived nowhere** while the rule it qualified survived fine.
[[CORE-558.2]] found rules that fire unprompted reduced to bare pointers,
[[CORE-558.3]] found a scope-limiter on what `--fast` does *not* suppress, and
`.4` finds the branch that routes without reading. Cite-don't-restate is sound;
what it costs is the *disambiguator* at the decision point, and that is the thing
to check first the next time a surface is shrunk.

**Archived:** 2026-09-10
