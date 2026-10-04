---
title: epic-discovery-unattended-hang
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-551]
touches:
  - claude/skills/ft-epic-discovery/SKILL.md
---

# CORE-552 | epic-discovery-unattended-hang

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-551]]

## 🎯 Goal

Make `/ft-epic-discovery`'s Step 1.5 unknown-arg branch recognize `--unattended` and refuse it terminally, instead of firing an `AskUserQuestion` that hangs an operator-less caller.

## ✅ Acceptance

- [x] `/ft-epic-discovery` Step 1.5 recognizes `--unattended` as its own branch (not "Any other arg") and terminates readably, writing nothing, instead of calling AskUserQuestion
- [x] The terminal stop uses the existing `⏸ --unattended stop — <cause>: <one line>` shape (`SPEC/gates.md` §"`--unattended` operator posture" → "Pre-scaffold stops") — no new cue glyph
- [x] The stop message explains *why* (no scoping conversation is possible with nobody present) and points at runners that do accept the flag
- [x] `SPEC/gates.md`'s existing "does not accept it" sentence is left as-is (still accurate) — no contract change needed, only the skill body
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Read `claude/skills/ft-epic-discovery/SKILL.md` Step 1.5 and `claude/skills/ft-file-followup/SKILL.md` Step 0 (the sibling `--unattended`-recognizing parser) for the idiom to follow
- [x] Add a `--unattended` branch to Step 1.5 that emits the terminal stop and does not proceed
- [x] Verify the "Any other arg" branch no longer catches `--unattended`
- [x] Doc-drift sweep

## 🔗 Related

- [[CORE-551]] — `related-decision:` gave `/ft-file-followup` a real `--unattended` mode and, at Discovery, explicitly deferred this identical `/ft-epic-discovery` parser hang rather than widening its own scope; this task discharges that deferral

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN.md line's diagnosis is verified live against current source (see below). Fix is narrowly scoped exactly as described — recognize-and-refuse, not a full `--unattended` mode like CORE-551's `/ft-file-followup` build-out. `SPEC/gates.md` already documents `/ft-epic-discovery` as not accepting the flag; only the skill body's parser needs to catch up.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Symptom verification (drift check).** `claude/skills/ft-epic-discovery/SKILL.md` Step
1.5 (current text, ~line 42): the only branches are Empty `$ARGUMENTS`, `--deep`, and
"Any other arg" — the last of which surfaces a usage notice and calls AskUserQuestion
unconditionally. `--unattended` falls into "Any other arg" today, so an operator-less
caller passing it hangs on the AskUserQuestion call. Matches the PLAN.md line and
CORE-551's "Parallel gap" note verbatim — no drift.

`SPEC/gates.md` §"`--unattended` operator posture" already states: "`/ft-epic-discovery`
does not accept it: it opens an epic by filing PLAN.md lines from a scoping
conversation, and there is no such conversation to have with nobody present." This is
still accurate and needs no edit — the contract already says the right thing; only the
skill body's parser is out of sync with it. This is why the PLAN.md line says
"Recognize-and-refuse terminally" rather than "build an `--unattended` mode" — unlike
CORE-551's `/ft-file-followup` (which *does* now support the flag), this skill's fix is
to reject the flag cleanly, not to support it.

**Idiom to follow.** `claude/skills/ft-file-followup/SKILL.md` Step 0 already recognizes
`--unattended` as its own token in the unordered flag-set walk, and separately refuses
the `--park --unattended` *combination* terminally with:

```markdown
⏸ --unattended stop — flag-conflict: `--park` presumes a present operator. Use the default flow to file the row; nothing written.
```

`/ft-epic-discovery`'s case is slightly different in kind: it isn't refusing a
combination, it refuses the flag itself (the whole skill has no unattended mode). Same
`⏸ --unattended stop — <cause>: <one line>` shape applies
(`claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops"); cause slug
`unsupported-flag` (new, but follows the existing kebab-case cause vocabulary:
`flag-conflict`, `foreign-dirt`, `id-conflict`, `area-ambiguous`, `open-siblings`,
`over-cap`, `parent-flip` — grepped across the repo, no reuse collision).

**Best Practices Review.** Single skill-body edit, one new Step 1.5 branch inserted
before "Any other arg" so `--unattended` no longer falls through to it. No refactor of
the surrounding Step 1.5 structure — the branch list already reads as an unordered set
of recognized tokens (mirrors `--deep`'s own branch). No new abstraction, no shared
fragment needed (the fix is three sentences), no dependency-boundary change.

**Archive skim.** `related-tasks: [CORE-551]` set explicitly. CORE-551 (read in full above
this scaffold) is the direct predecessor: it built `/ft-file-followup --unattended` and,
at its own Discovery, explicitly found and deferred this exact `/ft-epic-discovery` gap
rather than widening its scope ("Operator confirmed at Discovery: file it as its own
row at closure, do not widen this task"). A bare `grep -l "ft-epic-discovery"` returns
~140 notes (roster/wiring mentions across nearly every skill-surface task); narrowed via
a probe to notes co-mentioning "Step 1.5" + "unknown arg" + `ft-epic-discovery`, which
found the branch's origin: **CORE-097.6** wrote the current "Any other arg → usage line
+ AskUserQuestion" branch when `--deep` was added — it predates `--unattended` existing
anywhere in the codebase, so it never considered the flag; not a contradicting decision,
just the branch this task now needs to carve an exception into. **CORE-535.4** (a
doc-restructuring task) lists "ft-epic-discovery" alongside "unattended park" only
because that skill's SKILL.md at the time restated the general Phase 1→2 exit-gate /
conditional-skip-rule tables (which cover `/ft-task`'s `--unattended` behavior) verbatim
before the restructuring moved that shared prose to `SPEC/gates.md` — confirmed via
`grep -i unattended claude/skills/ft-epic-discovery/SKILL.md` (zero hits today) that this
was restated general prose, not a claim that `/ft-epic-discovery` itself accepts the
flag. No other archived note is load-bearing for this fix.

**Clarifying questions:** No clarifications needed. The PLAN.md line, CORE-551's
deferral note, and `SPEC/gates.md`'s existing "does not accept it" sentence all agree on
scope and shape (recognize-and-refuse, not build-a-mode); nothing ambiguous to resolve.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Inserted a new `--unattended` branch into the existing unordered
Step 1.5 branch list, directly modeled on `ft-file-followup/SKILL.md`'s
`--park --unattended` refusal (same `⏸ --unattended stop — <cause>: <one line>` shape,
same "state why, name the alternative" content). No new fragment, no new glyph — reuses
the nav chip `⏸` and the cause-slug vocabulary already established by five other causes
in the codebase (`flag-conflict`, `foreign-dirt`, `id-conflict`, `area-ambiguous`,
`open-siblings`, `over-cap`, `parent-flip`); added `unsupported-flag` as a sixth, for the
"this skill has no unattended mode at all" case, which none of the existing six slugs
named.

**Minimal refactor gate.** No refactor — one branch inserted before "Any other arg" so
`--unattended` short-circuits before reaching it. Left the "Any other arg" wording and
its own AskUserQuestion offer (`--deep` / default / abort) untouched — it still applies
correctly to genuinely unrecognized tokens.

**Implemented.** `claude/skills/ft-epic-discovery/SKILL.md` Step 1.5 — one new bullet + a
4-line stop-message code block, ~460 bytes. File closes at 26,986/30,000 chars (`wc -c`),
well under the standard SKILL.md cap.

**Tests.** No test suite covers prose/skill-body content (this repo's `npm --prefix viz`
and `node --test tools/update-adopters.test.mjs` suites cover the visualizer and the
fleet updater, neither touched here) — see Phase 3 Testing Notes for the verification
actually run in lieu of an automated test.

**No drift on adjacent doc surfaces.** Confirmed `claude/CAPABILITIES.md`'s
`--unattended` row already omits `/ft-epic-discovery` from its "Applies to" list (i.e.
already correctly states the skill doesn't accept it — no edit needed) and
`codex/skills/ft-epic-discovery/SKILL.md`'s description only ever mentioned `--deep` —
so the CI drift job's Pair B (Claude description ↔ Codex wrapper description flags) and
Pair E (roster flag coverage) are unaffected: this fix adds a *refusal*, not a supported
flag, so no flag list anywhere needs to grow.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — **N/A**, prose-only skill-body change, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Prose/skill-body change only — no `viz/` or `tools/` paths touched
(`git status --porcelain` confirms), so `npm --prefix viz` (test/typecheck/lint) and
`node --test tools/update-adopters.test.mjs` are **N/A**. The narrowest validation that
actually covers this change is the CI `drift` job, run in full locally:

| Check | Result |
|---|---|
| Wrapper-name invariant (`SPEC/layout.md` §"Skill namespace") | PASS |
| Shipped-skill parity (`claude/skills` ↔ `codex/skills`) | PASS |
| Pair A — templates roster clause across three surfaces | PASS |
| Pair B — Claude skill flags ↔ Codex wrapper descriptions | PASS |
| Pair C — template back-link depth | PASS |
| Pair E — ft-flowtron roster row coverage | PASS |
| Pair E — ft-flowtron roster flag coverage | PASS |

Byte budget: `claude/skills/ft-epic-discovery/SKILL.md` closes at 26,986/30,000 chars
(`wc -c`), the standard SKILL.md cap.

**Quality assertions.** No duplication: the new branch reuses the existing
`⏸ --unattended stop — <cause>: <one line>` shape and cause-slug idiom verbatim rather
than inventing new prose conventions. No dead code, no public-surface growth beyond the
one branch the task exists to add (the skill's accepted-flag surface is unchanged —
`--unattended` is refused, not accepted). No stale documentation: `SPEC/gates.md`'s
existing "does not accept it" sentence needed no edit (verified accurate, not stale);
`CAPABILITIES.md` and the Codex wrapper already omit `/ft-epic-discovery` from any
`--unattended`-accepting list, so nothing there needed updating either.

`.editorconfig` verified on the touched file: UTF-8, LF, final newline, no trailing
whitespace (`file` + `tail -c1` + `grep -n ' $'`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs").** Checked
every entry that could plausibly reference `/ft-epic-discovery`'s arg surface or the
`--unattended` posture:

- `docs/EXTERNAL-AGENTS.md` — already states "`/ft-epic-discovery` deliberately accepts
  neither [`--fast` nor `--unattended`]: filing an epic is a scoping conversation, and
  there is nobody to have it with." Still accurate — **no change** (this task fixes the
  skill body to match this already-correct doc, not the other way around).
- `SPEC/gates.md` §"`--unattended` operator posture" → "Applies to" — already states
  "`/ft-epic-discovery` does not accept it." Still accurate — **no change**.
- `claude/CAPABILITIES.md` `--unattended` row — already omits `/ft-epic-discovery` from
  its "Applies to" list — **no change**.
- `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`,
  `docs/AGENT-NEUTRALITY.md` — all `/ft-epic-discovery` mentions are about `--deep` or
  general roster/wiring facts, none about `--unattended` — **no change**.
- All other list entries (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the
  four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`,
  `SECURITY.md`) — none reference this skill's arg parsing — **no change**.

**Final Summary:**

`/ft-epic-discovery`'s Step 1.5 now recognizes `--unattended` as its own branch and
refuses it terminally (`⏸ --unattended stop — unsupported-flag: …`), instead of falling
into the generic "Any other arg" branch, which fired an `AskUserQuestion` — a hang for
any operator-less caller. One file changed:
`claude/skills/ft-epic-discovery/SKILL.md` (+7 lines, one new Step 1.5 bullet + a 4-line
stop-message code block; closes at 26,986/30,000 chars).

**Design.** Deliberately narrower than sibling CORE-551, which built a full
`--unattended` *mode* for `/ft-file-followup`. `SPEC/gates.md` already states
`/ft-epic-discovery` "does not accept" the flag at all — filing an epic requires a
scoping conversation with an operator, and there is none to have with nobody present —
so the fix here is recognize-and-refuse, exactly as the PLAN.md line specified, not
build-a-mode. The new branch reuses the existing `⏸ --unattended stop — <cause>: <one
line>` shape and cause-slug vocabulary verbatim (adding one new slug,
`unsupported-flag`, for "this skill has no unattended mode at all" — distinct from the
existing `flag-conflict` slug, which names a *combination* refusal like
`ft-file-followup`'s `--park --unattended`).

**Verification.** No automated test suite covers skill-body prose; ran all seven CI
`drift` job checks locally (all PASS) since they're the narrowest validation that
actually exercises `description:`/roster/wrapper consistency, and confirmed the byte
budget and `.editorconfig` compliance manually.

**Documentation verdict.** No doc updates needed — every surface that already discusses
`/ft-epic-discovery` + `--unattended` (`docs/EXTERNAL-AGENTS.md`, `SPEC/gates.md`,
`claude/CAPABILITIES.md`) already correctly states the skill doesn't accept the flag;
this task brings the skill's *implementation* in line with those already-accurate
contracts, closing a gap between documented behavior and actual behavior.

**Maintainability effect.** Closes the second (and, per CORE-551's Discovery, last
known) instance of this exact parser-hang pattern — an unattended-declaring caller
falling into a generic unknown-arg AskUserQuestion branch that predates `--unattended`'s
existence. No new abstraction or shared fragment introduced; the fix is fully local to
the one skill it affects.

**Archived:** 2026-09-09
