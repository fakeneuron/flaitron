---
title: viz-version-lockstep
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-478, FE-056, CORE-048]
touches:
  - viz/README.md
  - viz/package.json
---

# CORE-545 | viz-version-lockstep

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-478]] [[FE-056]] [[CORE-048]]

## 🎯 Goal

Document that `viz/package.json`'s frozen `"version"` field is an intentional, already-decided state (per CORE-478) rather than untracked drift, and reset its value away from a stale flowtron-look-alike pin so it stops reading as a bug on sight.

## ✅ Acceptance

- [x] `viz/README.md` states that `package.json`'s `"version"` field is not maintained / does not track the flowtron release version, citing CORE-478 (git tag is the sole version authority for viz) and FE-056 (the field's only prior purpose — mirroring the since-deleted `VIZ_VERSION` constant)
- [x] `viz/package.json`'s `"version"` reset to a value that does not read as a stale flowtron pin (`"0.1.0"` — its pre-FE-056 original, restoring CORE-048's original "independent component versioning" framing) — `viz/package-lock.json` updated to match
- [x] `npm --prefix viz run typecheck` / `run lint` / `test` pass with the version bump
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Add a short note to `viz/README.md` (near `## Commands`) documenting the frozen/decoupled version field
- [x] Reset `viz/package.json` `"version"` to `"0.1.0"`; run `npm --prefix viz install` to sync `viz/package-lock.json`
- [x] Run `npm --prefix viz run typecheck` / `run lint` / `test`
- [x] Doc-drift sweep

## 🔗 Related

- [[CORE-478]] — `related-decision:` removed the `VIZ_VERSION` constant and its `/ft-release` bump step, explicitly deciding "the git tag remains the sole version authority for viz" — the decision this task documents and finishes closing out
- [[FE-056]] — `related-decision:` originally wired `viz/package.json`'s version to mirror `VIZ_VERSION` (the reason it ever left `"0.1.0"`); superseded by CORE-478
- [[CORE-048]] — `related-decision:` the earliest ruling, back when `viz/package.json` was still `"0.1.0"`: "independent component versioning, not flowtron contract version" — the position CORE-478 effectively restored and this task now makes visible again

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The PLAN.md line frames this as an open decision ("Decide whether `viz/package.json` tracks the flowtron version… Either add it as a fourth edit… or record that viz versions independently"). Discovery found the decision was **already made, explicitly, twice**: CORE-048 (2026-05-08) originally ruled it "independent component versioning, not flowtron contract version"; FE-056 (2026-06-06) reversed that and wired it to mirror the (now-deleted) `VIZ_VERSION` runtime constant as a 5th `/ft-release` edit; CORE-478 (2026-08-26) then deleted `VIZ_VERSION` (dead, unconsumed since CORE-432.2) and, per its own Acceptance + Final Summary, **explicitly removed the `viz/package.json` bump step too**, stating "the git tag remains the sole version authority for viz." That is Option B, already chosen and already implemented in `/ft-release`. The real gap Discovery surfaced is narrower and different in kind: CORE-478 removed the *process* (the bump step) but never touched the *value* itself or documented the decision anywhere a future reader (human or the very audit pass that filed this PLAN.md line) would see it before re-flagging the frozen `"5.19.0"` as drift. So the task is not "decide A or B" — it's "make the already-made decision B visible and self-evident," which changes the deliverable from a `/ft-release` skill edit (Option A) or a bare "no-op, already fine" close, to: (1) a documentation note recording the decision where a reader would actually look, and (2) resetting the value itself away from a number that visually masquerades as a stale flowtron pin — since a frozen `"5.19.0"` sitting 6 releases behind is indistinguishable from an oversight without that context, which is exactly why `ft-audit docs`'s generic "stale version pin" heuristic (`claude/skills/ft-audit/passes/docs.md` §"Currency") flagged it today.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Symptom verification (drift check).** `viz/package.json:3` confirmed `"version": "5.19.0"`; `git describe --tags --abbrev=0` / `SPEC.md:3` confirmed current flowtron version `v5.25.0`. Checked out each tag's `viz/package.json` (`git show <tag>:viz/package.json`): the field moved in lockstep `v5.16.0` → `v5.17.0` → `v5.18.0` → `v5.19.0`, then stayed `"5.19.0"` at `v5.20.0` onward (six releases: v5.20–v5.25) — matches the PLAN.md line's "six releases" claim exactly. `claude/skills/ft-release/SKILL.md` confirmed to codify exactly 3 version edits today (`SPEC.md:3`, `docs/MIGRATION.md`, `SECURITY.md`) with zero mention of `viz/package.json` or `VIZ_VERSION` anywhere in the file. No drift from the PLAN.md line's factual claims.

**Archive skim (the load-bearing part of this Discovery).** A bare `grep -l "viz/package.json"` / `"package.json"` across `archive/core/` returns dozens of hits (mostly incidental — release tasknotes' routine `npm --prefix viz` test-run mentions). Narrowed to the three tasknotes that actually decided something about this field, found via `git log --follow -- viz/package.json` (the version-field edits, not incidental mentions):

1. **CORE-048** (2026-05-08, `viz/package.json` was `"0.1.0"` then) — explicitly scoped it **out** of the release recipe: "`viz/package.json` — `"version": "0.1.0"` is independent component versioning, not flowtron contract version."
2. **FE-056** (2026-06-06, `viz-version-single-source`) — **reversed** #1. Established `VIZ_VERSION` in `viz/src/ui/constants.ts` (then used as a footer-display fallback in `App.tsx`) as the runtime SOT, synced `viz/package.json`'s version to match it (`"0.1.0"` → `"5.2.0"`), and added a 5th edit to `/ft-release` so both stayed in sync every release going forward. Its own Discovery explicitly noted `viz/package.json` is `"private": true`, never published, so the field is "informational/tooling only" — there was never a runtime consumer of the package.json value itself, only of `VIZ_VERSION`.
3. **CORE-478** (2026-08-26, `viz-version-drop`) — found `VIZ_VERSION` had gone dead (its only consumer, an `App.tsx` footer fallback, was removed at CORE-432.2 on 2026-08-10) and deleted the constant. Its Phase 1 explicitly surfaced the follow-on question — "whether `viz/package.json`/`package-lock.json`'s version bump step … should also be dropped" — and recorded **"Operator chose: remove it too."** Phase 2 removed the `/ft-release` bump step and renumbered "5 version edits" back down to 3 everywhere in the skill. Final Summary states outright: "git tag remains the sole version authority for viz; future `/ft-release` cuts do one less (now-orphaned) file pair."

CORE-478 is dated 2026-08-26; `viz/package.json` last moved at `v5.19.0` — consistent (the freeze coincides with CORE-478 landing, not an earlier oversight). **CORE-478 removed the process (the bump step) but never touched the `viz/package.json` value itself or added any documentation of the decision** — it left the field sitting at whatever value `VIZ_VERSION` last mirrored, with nothing nearby explaining why. That silent gap is exactly what let `ft-audit docs` re-flag it today as if it were unresolved drift, when the underlying question was actually settled three tasknotes ago.

Followed `## 🔗 Related` / no `supersedes:` pointers on any of the three (none set) — all three found purely via the `git log --follow` file history, which surfaced the actual decision chain more reliably than the archive-name grep would have.

Discovery landed Re-scope → 🛠️ fired (preview: README note + `viz/package.json`/`package-lock.json` version reset to `"0.1.0"` + typecheck/lint/test). Operator replied "go" → entering Phase 2.

**Best Practices Review.** Two small, independent edits: a documentation addition (`viz/README.md`, prose only, no code) and a JSON version-string reset (`viz/package.json` + regenerated `viz/package-lock.json`, no logic, matches FE-056/CORE-478 precedent of "single-token version-string substitution"). No refactor, no new abstraction, no dependency-boundary concern — package.json's `version` field has zero code consumers (confirmed at FE-056 and re-confirmed at CORE-478; unchanged since).

**Clarifying questions:** None asked as a structured AskUserQuestion — the Re-scope verdict itself is the significant-deviation case the Phase 1→2 exit gate's `default-skip` flavor requires firing 🛠️ for (SPEC/gates.md §"Phase 1→2 exit gate": Re-scope verdicts always fire, not in `--fast`). Two explicit assumptions carried into the 🛠️ preview for the operator to confirm or override: (1) resetting the value to `"0.1.0"` (its pre-FE-056 original) rather than just leaving it at the stale `"5.19.0"` with only a README note; (2) the note belongs in `viz/README.md` rather than `docs/PLATFORMS.md` or another surface, since `viz/README.md` is the module's own architecture/convention doc and is not part of the `.flowtron/tasknote/README.md` §"AI-referenced docs" cold-start sweep set (confirmed by grep — zero hits), matching CORE-478's own precedent that viz-internal docs sit outside that sweep.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Follows the FE-056 / CORE-478 precedent exactly: a single-token JSON version-string edit plus a matching prose note, no new machinery. `viz/README.md` already carries short rule-callout subsections under `## Commands` and `### Hard rule: no Node imports under src/ui/` — the new `### package.json's version field is not maintained` subsection matches that existing shape rather than inventing a new doc convention.

**Minimal refactor gate.** No refactor. Two edits only, both additive/corrective and directly required by Acceptance.

**Implemented:**
1. `viz/README.md` — added a 5-line subsection after `## Commands` documenting the decision, citing FE-056 (origin) and CORE-478 (the removal that left the value undocumented).
2. `viz/package.json` — `"version": "5.19.0"` → `"0.1.0"` (1 line).
3. `viz/package-lock.json` — regenerated via `npm --prefix viz install`; diff confirmed to touch only the same two `"version"` fields (root + self-referencing workspace entry), nothing else (`git diff --stat`: 2 insertions, 2 deletions).

**Tests.** No new test needed — this is a doc string + a JSON metadata field with zero code consumers (confirmed at FE-056, re-confirmed at CORE-478). Existing suite re-run in Phase 3 to confirm no regression from the `package.json`/lockfile edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — **N/A**, doc note + JSON metadata field only, no UI surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Ran the full standing viz validation gate (`AGENTS.md` §"Validation") since `package.json`/`package-lock.json` changed:

| Check | Result |
|---|---|
| `npm --prefix viz run typecheck` | PASS (clean) |
| `npm --prefix viz run lint` | PASS (clean) |
| `npm --prefix viz test` | PASS — 28 files / 530 tests |

`npm` output confirms the version bump took effect (`flowtron-viz@0.1.0` label on all three runs). `git diff --stat -- viz/package-lock.json` — 2 insertions/2 deletions only (the two `"version"` fields); no dependency-tree churn. `grep -rn "5\.19\.0" viz/README.md viz/package.json` — zero hits, confirming the stale value is fully gone from both touched files.

**Quality assertions.** No duplication: the new README subsection states the decision once, in the one place `viz/`'s own architecture doc lives, and points at the two tasknotes that made it rather than restating their content. No dead code — this touches no code, only a doc string and a metadata field. No public-surface growth. No stale documentation introduced — the note itself is what removes the stale-looking artifact (the frozen `5.19.0` value) that was misleading readers.

`.editorconfig` verified on `viz/README.md`: UTF-8, LF, final newline (`tail -c1` → `0a`), no trailing whitespace (`grep -n ' $'` → no hits).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs").** Checked every entry that could plausibly reference viz versioning or the release recipe's version-edit count:

- `docs/EXTERNAL-AGENTS.md`, `SPEC/gates.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md` — none mention `viz/package.json`, `VIZ_VERSION`, or a version-edit count — **no change**.
- `SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md` (the 3 live `/ft-release` version-pin surfaces) — untouched by this task, correctly so; this task doesn't change what `/ft-release` bumps, only documents/resets a field `/ft-release` has never touched since CORE-478 — **no change**.
- `viz/README.md` is **not** in the `.flowtron/tasknote/README.md` §"AI-referenced docs" set (confirmed by grep at Discovery) — its edit is this task's actual deliverable, not part of the sweep, matching CORE-478's own precedent that viz-internal docs sit outside that sweep.
- All other list entries — none reference viz's version field — **no change**.

**Final Summary:**

`viz/package.json`'s `"version"` field had been frozen at `"5.19.0"` for six releases (v5.20.0–v5.25.0) after CORE-478 (2026-08-26) removed the `/ft-release` bump step that used to keep it in sync with a since-deleted `VIZ_VERSION` runtime constant (FE-056) — but CORE-478 never touched the value itself or documented why, so it kept reading as unresolved drift and got re-flagged by today's `ft-audit docs` run. Discovery found the underlying question (should `/ft-release` track this field?) was already answered — twice, in fact (CORE-048 originally, CORE-478 definitively) — so this task Re-scoped from "decide A or B" to "make the already-made decision visible and self-evident."

**Changes (3 files, 4 files touched incl. lockfile):**
- `viz/README.md` (+6 lines) — new subsection documenting the decision, citing FE-056 and CORE-478.
- `viz/package.json` (1 line) — `"version"`: `"5.19.0"` → `"0.1.0"` (its pre-FE-056 original, restoring CORE-048's original framing).
- `viz/package-lock.json` (2 lines) — regenerated to match.

**Design.** Two components: documentation (so the decision survives independent of tribal/archive knowledge) and a value reset (so the field no longer visually masquerades as a stale flowtron pin at a glance, which is what triggered the false re-flag in the first place). Considered leaving the value at `"5.19.0"` with only a README note, but rejected it — a reader (or an audit heuristic) scanning `package.json` in isolation, without also reading `viz/README.md`, would still see a number that looks exactly like drift.

**Verification.** `npm --prefix viz run typecheck` / `run lint` / `test` (28 files / 530 tests) all pass. `git diff --stat` confirms the lockfile changed only the two `"version"` fields. Repo-wide grep confirms no other surface references the old `5.19.0` value or needs updating.

**Documentation verdict.** `viz/README.md` updated (the deliverable). No AI-referenced doc-set surface required a change — confirmed by sweep above.

**Maintainability effect.** Closes out the CORE-478 → CORE-545 chain: the process decision (no `/ft-release` bump) and now the value + rationale are both visible in the same place a future reader or audit pass would actually look, so this specific "is this drift?" question should not resurface.

**Archived:** 2026-09-09
