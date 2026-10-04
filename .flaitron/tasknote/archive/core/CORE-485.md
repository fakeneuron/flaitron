---
title: fleet-name-leakage-sweep
status: completed
tags: []
created: 2026-08-28
due:
related-tasks: [CORE-486, CORE-487, CORE-488]
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

# CORE-485 | fleet-name-leakage-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-486]] [[CORE-487]] [[CORE-488]]

## 🎯 Goal

Reach a per-site ratify-or-genericize verdict on every fleet-specific name,
`fakeneuron` org URL, and `~/code` hardcode leaking into shipped Engine
surfaces, and apply the genericize verdicts.

## ✅ Acceptance

- [x] Every fleet project name, `fakeneuron` org URL, and `~/code` hardcode in shipped Engine surfaces carries an explicit ratify-or-genericize verdict with a one-line rationale, recorded in this tasknote
- [x] Every `genericize` verdict is applied; every `ratify` verdict leaves its site byte-identical
- [x] Genericized sites lose the fleet name without losing the point the sentence was making
- [x] `/ft-worktree-start` + `/ft-worktree-end` derive the worktree root from the project checkout, not from a hardcoded `$HOME/code`, and `docs/WORKTREES.md`'s Location row matches
- [x] viz typecheck + test suite green after the `viz/` edits
- [x] Scope boundary held: the two sanctioned cross-project carve-outs' *declaration consolidation* is left to [[CORE-486]], not decided here

## 🧩 Subtasks

- [x] Apply the four illustrative-name genericizes: `docs/PLATFORMS.md:145-147`, `viz/src/archiveCache.ts:37`, `viz/vite.config.ts:136`, `SECURITY.md:50`
- [x] Genericize `WT_ROOT` in `claude/skills/ft-worktree-start/SKILL.md:54` + `ft-worktree-end/SKILL.md:42` to `$(dirname "$PROJECT_ROOT")`
- [x] Update the `~/code`-shaped worktree-location prose that the derivation change makes stale (`docs/WORKTREES.md:13,53`, `ft-worktree-start/SKILL.md:58,72`, `docs/GLOSSARY.md:147`, `docs/EXTERNAL-AGENTS.md:35`, `claude/AGENTS-snippet.md:21`)
- [x] Re-run the three sweep greps to confirm only ratified sites remain
- [x] `npm --prefix viz run typecheck` + `npm --prefix viz test`

## 🔗 Related

- [[CORE-486]] — sibling NAT-182.3 filing (cross-project carve-outs) `related-decision:`
- [[CORE-487]] — sibling NAT-182.3 filing (no-runtime mirrors) `related-decision:`
- [[CORE-488]] — sibling NAT-182.3 filing (cross-repo tasknote remit) `related-decision:`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed same-day by natabula NAT-182.3 from re-verified evidence at flowtron HEAD `6104c42`; all three cited sites confirmed present at `896e3a8`. The task is a decide-then-apply verdict sweep and that is exactly what Discovery found — no re-scope. One finding beyond the cited three surfaced (an executable `$HOME/code` hardcode in the worktree skills), which the PLAN line's "plus … `~/code` hardcodes" clause already covers.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions — three ratify-or-genericize calls were genuinely the operator's (AskUserQuestion, 2026-08-28); answers in Discovery Notes

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read set** — the three cited sites plus a full three-axis sweep (fleet names / `fakeneuron` / `~/code`) across every shipped surface: `SPEC.md`, `SPEC/`, `docs/`, `templates/`, `claude/`, `codex/`, `grok/`, `cursor/`, `tools/`, `viz/`, `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.github/`. Narrow and known-shaped; no probe needed.

**Best Practices Review** — the one code-shaped edit is the worktree `WT_ROOT` derivation. Both skills already compute `PROJECT_ROOT` via `git rev-parse --show-toplevel` and then discard it in favour of `$HOME/code`; deriving the sibling dir from the value already in hand removes a redundant assumption rather than adding an abstraction. No new helper, no shared module — the two skills are thin procedural docs and each keeps its own two lines (VISION.md §"Abstractions without two-project precedent" argues against hoisting). Everything else is comment/prose text with no dependency direction to reason about.

**Archive skim** — `.flowtron/tasknote/archive/core/`, greped for `genericiz|fleet-name|project-agnostic|fleet leakage`:
- [[CORE-136]] → [[CORE-182]] are the governing precedent: fintown-specific task examples in `docs/MIGRATION.md` §3.4 then §3.3 were genericized on the reasoning that a fleet name in an *illustrative* slot resolves to nothing for any reader but the author. CORE-182 also records the counter-case it left alone ("Playwright UX smoke" — framework-specific but not project-specific), i.e. genericize the *identity*, not the concreteness.
- [[CORE-060]] → [[CORE-080]] → [[CORE-081]] are the bit-rot pattern: an illustrative string was flagged as a follow-up candidate twice and shipped twice before someone actually fixed it. Argues for applying the genericize verdicts in this task rather than filing them onward.
- No prior tasknote has ruled on `docs/PHILOSOPHY.md`'s project names, the `fakeneuron` URLs, or the worktree `$HOME/code` derivation.

**Drift check** — all three cited sites verified at HEAD `896e3a8`, clean tree: `docs/PLATFORMS.md:145` (InvisiPaw, siteguy, marscharts), `docs/PHILOSOPHY.md:7-11` (fintown, InvisiPaw, photard), `viz/src/archiveCache.ts:37` (bananapeel, adppro, bidviz) — citations current, no line drift. Plan contradicts no SPEC contract. Two boundary facts that shape the verdicts:
- `docs/PHILOSOPHY.md` is **not** in `.flowtron/tasknote/README.md` §"AI-referenced docs" and self-declares as "the things `SPEC.md` deliberately leaves out because they're history, not contract."
- `docs/WORKTREES.md`'s Location row ties `~/code/<project>-worktrees/` to the sanctioned viz workspace scan — so the worktree hardcode is downstream of a declared carve-out, not a stray. `dirname "$PROJECT_ROOT"` preserves that rationale exactly (identical path for any project under `~/code`) while removing the assumption for adopters elsewhere.

**Scope boundary vs. [[CORE-486]]** — CORE-486 owns whether the two sanctioned cross-project surfaces (`tools/update-adopters.mjs` singular-CLI carve-out; global viz `~/code` workspace default) deserve one consolidated bounded-carve-outs statement. This task renders a *leakage* verdict on those sites (ratify) and does not touch how they are declared.

**Per-site verdict table** — the deliverable:

| # | Site(s) | Names | Verdict | Rationale |
|---|---------|-------|---------|-----------|
| 1 | `docs/PHILOSOPHY.md:7-11` | fintown, InvisiPaw, photard | **Ratify** | The doc *is* the historical record and self-declares as history-not-contract; it is outside the AI-referenced cold-start set. Genericizing would falsify the account of why flowtron exists. |
| 2 | `SPEC.md:963`, `SPEC/gates.md:615` | InvisiPaw FE-64 | **Ratify** | Named motivating case = provenance for the paper-complete guard, same class as an ADR citation. Both already frame it as "an external paper-complete"; the name is traceability, not an example the reader must resolve. |
| 3 | `docs/PLATFORMS.md:145-147` | InvisiPaw, siteguy, marscharts | **Genericize** | Contract-layer doc in the AI-referenced set. The claim is "adopter symlinks are already in production"; the names carry no information for any other reader. CORE-136/182 precedent applies directly. |
| 4 | `viz/src/archiveCache.ts:37` | bananapeel, adppro, bidviz | **Genericize** | Illustrative parenthetical inside a shipped code comment; the point ("old adopter checkouts") survives intact without the roster. |
| 5 | `viz/vite.config.ts:136` | BananaPeel, Invisipaw | **Genericize** | Same class as #4 — found by the sweep, not cited in the PLAN line. The port-collision rationale needs "other Vite projects", not their names. |
| 6 | `SECURITY.md:50` | natabula | **Genericize** | Adopter-facing recommendation; natabula is a private repo the reader cannot look at, so the name resolves to nothing while the pattern ("a dedicated repo for reusable personal standards") is the whole point. |
| 7 | `viz/src/{App.test.tsx,visibilityPrefs.test.ts,parser.test.ts}` | fintown, invisipaw | **Ratify** (operator, 2026-08-28) | Fixture strings are arbitrary identifiers, not claims about the world. ~25 renames is churn with breakage risk and no adopter-facing effect. |
| 8 | `README.md:8-10,35`, `docs/MIGRATION.md:54`, `claude/skills/ft-new-project/SKILL.md:40,50` | `github.com/fakeneuron/flowtron` | **Ratify** | Not leakage — identity. These are flowtron's canonical repo address; genericizing them breaks the clone/submodule instructions outright. |
| 9 | `tools/update-adopters.mjs:5,14,196`, `viz/src/workspace.ts:31,107`, `viz/src/fsSafe.ts:27`, `viz/README.md:4`, `SECURITY.md:163,204,226`, `README.md:137-146`, `docs/MIGRATION.md:540-545`, `claude/AGENTS-snippet.md:105-110` | `${FLOWTRON_VIZ_WORKSPACE:-~/code}` | **Ratify** | Already env-overridable and self-declared as the bounded read-only-visualizer exception (VISION.md:36, SPEC.md:1086). `~/code` is a documented *default*, not an assumption the code enforces. Consolidation of the declarations is [[CORE-486]]. |
| 10 | `README.md:35-37`, `docs/MIGRATION.md:19,243-244` | `~/code` in install snippets | **Ratify** (operator, 2026-08-28) | An install snippet needs a real path to stay copy-pasteable; the reader substitutes their own. No functional coupling. |
| 11 | `docs/VERSION-HISTORY.md:173,299` | `~/code` | **Ratify** | Append-only changelog describing shipped behaviour at the time. Editing history to match present wording is the failure mode `VERSION-HISTORY` exists to avoid. |
| 12 | `SPEC.md:52`, `claude/skills/ft-release/SKILL.md:28` | `~/code/flowtron` | **Ratify** | flowtron-self operator instructions, explicitly scoped ("when working in `~/code/flowtron/`"); `/ft-release` is flowtron-self-only and never installed in adopters. |
| 13 | `claude/skills/ft-worktree-start/SKILL.md:54`, `ft-worktree-end/SKILL.md:42` (+ dependent prose at `ft-worktree-start:58,72`, `docs/WORKTREES.md:13,53`, `docs/GLOSSARY.md:147`, `docs/EXTERNAL-AGENTS.md:35`, `claude/AGENTS-snippet.md:21`) | `$HOME/code/<project>-worktrees` | **Genericize** (operator, 2026-08-28) | The only site where the hardcode is *executable* rather than descriptive: it assumes every adopter's repo lives under `~/code` while `PROJECT_ROOT` is already in hand. `$(dirname "$PROJECT_ROOT")` yields the identical path for projects under `~/code` — so the viz-scan rationale in the Location row is preserved — and the correct sibling dir everywhere else. |

**Operator answers (AskUserQuestion, 2026-08-28)** — #7 ratify (fixtures aren't claims); #10 ratify (concrete examples beat placeholders); #13 genericize via `dirname(PROJECT_ROOT)` (over the ratify and the `FLOWTRON_VIZ_WORKSPACE`-chaining alternatives).

**Assumption logged** — "shipped Engine surfaces" excludes `.flowtron/` (flowtron's own dogfood PLAN + tasknote archive), which is workflow *data* about this repo's history, not a surface adopters consume. Fleet names there are untouched.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no behavior added. The one executable change (`WT_ROOT`) lives in a procedural SKILL.md shell snippet, which flowtron ships as instructions rather than as an executed module; there is no harness that runs it. Both skills already echo the computed values for operator confirmation, which is the existing verification affordance.

**Implementation Notes:**

**Genericized — 6 sites, 11 files, +19/-19.**

- Rows 3-6 (illustrative names): `docs/PLATFORMS.md` dropped the adopter roster from the path-stability argument; `viz/src/archiveCache.ts` and `viz/vite.config.ts` dropped parenthetical project lists from code comments; `SECURITY.md` replaced "dedicated repo like natabula" with "a dedicated repo". Each edit keeps the sentence's claim and removes only the identity — the CORE-136/182 line ("genericize the identity, not the concreteness").
- Row 13 (executable): `WT_ROOT="$HOME/code/${PROJECT_SLUG}-worktrees"` → `WT_ROOT="$(dirname "$PROJECT_ROOT")/${PROJECT_SLUG}-worktrees"` in both worktree skills. `PROJECT_ROOT` was already computed one line above from `git rev-parse --show-toplevel` and then discarded — the fix uses the value in hand rather than introducing anything. Identical path for any project under `~/code`, correct sibling dir everywhere else.
- Row 13 fan-out: the derivation change made seven prose sites stale, all updated to the sibling-of-checkout phrasing — `docs/WORKTREES.md` (Location row + Start flow step 2), `docs/GLOSSARY.md`, `docs/EXTERNAL-AGENTS.md`, `claude/AGENTS-snippet.md`, and both worktree skills' frontmatter `description:` + edge-case prose (plus `claude/commands/ft-worktree-start.md`, whose description mirrors the skill's). The last four were **not** in the Phase 1 subtask list — the frontmatter descriptions and the "permission problems on `~/code/`" lines only surfaced on the post-edit re-grep. Caught before closure rather than shipped, which is the CORE-060/080/081 bit-rot failure this task's archive skim flagged.
- Verified no platform-wrapper drift: `codex/`, `cursor/`, `grok/` snippets reference the worktree skills only by symlink path, and `ft-flowtron`'s roster table carries no location string.

**Not changed — the ratify verdicts (rows 1, 2, 7-12).** Confirmed byte-identical by re-running the three sweep greps: the only surviving fleet names are `docs/PHILOSOPHY.md:7-11` and the `InvisiPaw FE-64` provenance in `SPEC.md:963` / `SPEC/gates.md:615`; every surviving `~/code` is a viz/update-adopters carve-out, an install snippet, a flowtron-self path, or `VERSION-HISTORY.md`.

**Note on the Five Locked Conventions.** `docs/WORKTREES.md` §"The Five Locked Conventions" locks the worktree *location pattern*; the Location row's edit generalizes how that path is derived without changing where it lands for any project under `~/code`, and the row's viz-scan rationale is restated explicitly. Per SPEC §"Tasknote frontmatter", a superseded *decision* is one of the three cases the ⚠️ `Superseded by` pointer excludes — and this is weaker than a supersession anyway — so no pointer and no `supersedes:` key. Worth recording that the doc's own opening line calls the pair "a thin, **project-agnostic** skill pair": the hardcode contradicted the doc's own claim, which is the strongest argument for the genericize verdict.

**Downstream-impact scan** — not triggered: no direction-changing decision reached beyond this task. Sibling filings [[CORE-486]]/[[CORE-487]]/[[CORE-488]] were checked for surface overlap; CORE-486's carve-out-declaration question is untouched by row 9's leakage-only verdict.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A: the two `viz/` edits are a code comment and a build-config comment; no rendered surface changed.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `npm --prefix viz run typecheck` (`tsc --noEmit`) — clean.
- `npm --prefix viz test` — **25 files, 481 tests passed**. Confirms the row-7 ratify was the cheap call: the `fintown`/`invisipaw` fixtures stayed put and nothing needed re-asserting.
- `npm --prefix viz run lint` (eslint) — clean.
- `node --test tools/update-adopters.test.mjs` — **37 passed, 0 failed**. Run because row 9 ratified that tool's `~/code` default; confirms it was left untouched.
- Re-grep verification (the real acceptance check for a sweep task): all three axes re-run post-edit across every shipped surface. Fleet names → only rows 1 + 2 remain. `$HOME/code` → **zero** hits. `~/code` → only rows 9-12.
- **Quality assertions** — the change is 19 substituted lines; no duplication introduced, no dead code, no public-surface growth. The stale-documentation axis is the one that mattered here and drove the seven-site prose fan-out above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

| Doc | Verdict |
|---|---|
| `README.md` | no change — `fakeneuron` badges/clone URL and `~/code` install snippets both ratified (rows 8, 10) |
| `AGENTS.md` | no change |
| `SPEC.md` | no change — `InvisiPaw FE-64` provenance (row 2) and the flowtron-self `~/code/flowtron` scope line (row 12) both ratified |
| `docs/MIGRATION.md` | no change — submodule URL (row 8) and install snippets (row 10) ratified |
| `claude/AGENTS-snippet.md` | **updated** — worktree location prose to the sibling-of-checkout form (row 13) |
| `codex/AGENTS-snippet.md` | no change — verified: references the worktree skills by symlink path only |
| `cursor/AGENTS-snippet.md` | no change — same |
| `grok/AGENTS-snippet.md` | no change — same |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | **updated** — natabula → "a dedicated repo" (row 6); its three `~/code` carve-out references left as ratified (row 9) |
| `docs/AGENT-NEUTRALITY.md` | no change — no fleet/workspace surface |
| `docs/PLATFORMS.md` | **updated** — adopter roster removed from the path-stability argument (row 3) |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | **updated** — worktree path in the handoff steps (row 13) |
| `docs/WORKTREES.md` | **updated** — Location row derivation + rationale, and Start flow step 2 (row 13) |

Outside the declared set but edited as row-13 fan-out: `docs/GLOSSARY.md`, `claude/commands/ft-worktree-start.md`, and both worktree `SKILL.md` files.

**Final Summary:**

Rendered a per-site ratify-or-genericize verdict on all 13 clusters of fleet-name, `fakeneuron`-URL, and `~/code` leakage in flowtron's shipped surfaces, then applied the six genericize verdicts — 11 files, +19/-19. The substantive find was not in the three sites the PLAN line cited: `/ft-worktree-start` and `/ft-worktree-end` computed `WT_ROOT="$HOME/code/${PROJECT_SLUG}-worktrees"`, hardcoding every adopter's project parent as `~/code` while `PROJECT_ROOT` sat unused one line above. `$(dirname "$PROJECT_ROOT")` gives the identical path for projects under `~/code` — preserving the viz-scan rationale the Location row cites — and the correct sibling directory for adopters anywhere else, making true the claim `docs/WORKTREES.md` already opens with ("a thin, **project-agnostic** skill pair"). Seven further prose sites went stale as a consequence and were updated with it; four of those surfaced only on the post-edit re-grep, not in the Phase 1 plan.

Seven clusters were ratified with recorded rationale, three of them on the operator's call (test fixtures, install snippets, and the `WT_ROOT` approach): `docs/PHILOSOPHY.md` is the historical record and self-declares as history-not-contract; `InvisiPaw FE-64` is provenance for the paper-complete guard; the `fakeneuron` URLs are flowtron's identity, not leakage; the `${FLOWTRON_VIZ_WORKSPACE:-~/code}` sites are an already-declared, env-overridable carve-out whose *consolidation* belongs to [[CORE-486]].

Verification: viz typecheck, eslint, and 481 tests green; `tools/update-adopters` 37 tests green (run because its `~/code` default was ratified untouched); and the three sweep greps re-run post-edit — zero `$HOME/code` hits remain, and every surviving fleet name and `~/code` maps to a recorded ratify row. Refactors: none beyond the `WT_ROOT` derivation, which removes an assumption rather than adding structure; the two worktree skills each keep their own two lines rather than sharing a helper, per VISION.md's two-project-precedent rule. Documentation: five AI-referenced docs updated, twelve verified unchanged. Maintainability effect: the worktree pair now works for adopters whose repos live outside `~/code` — previously it silently created worktrees in the wrong tree — and the verdict table gives the next sweep a recorded baseline, so ratified sites stop being re-litigated as findings.

**Archived:** 2026-08-28
