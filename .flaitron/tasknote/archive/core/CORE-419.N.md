---
title: fleet-updater-safety audit
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-419, CORE-419.2, CORE-419.3, CORE-419.4]
---

# CORE-419.N | fleet-updater-safety audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-419]]

## 🎯 Goal

Verify the completed `CORE-EPIC-419` (`fleet-updater-safety`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-419.N — audit CORE-EPIC-419` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-419.N` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-419.N.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-419` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-419.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-419]] — parent epic: fleet-updater-safety
- [[CORE-419.2]] — cohort child: pinned-ahead downgrade guard in `checkAdopter`
- [[CORE-419.3]] — cohort child: mid-bump rollback in `applyBump`
- [[CORE-419.4]] — cohort child: `--root` arg validation in `parseArgs`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-419` active under `## High`; children `.2` / `.3` / `.4` all `[x]`; `.N` the only open row. No open implementation siblings, so the early-audit gate did not fire.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children closed on 2026-08-08 in three consecutive commits, and all three landed in the *same* file (`tools/update-adopters.mjs`) plus its suite. A same-file cohort is exactly the shape where per-task Phase 4 sweeps can each be individually correct while the file's own contract summary drifts cumulatively — the audit's reason to exist.

- [x] Read relevant source files — the three archived children (`archive/core/CORE-419.{2,3,4}.md`, read in full), `tools/update-adopters.mjs` (the header block, `parseArgs`, `checkAdopter`, `verifyPinnedSha`, `rollbackBump`, `applyBump`, `reportResult`), `tools/update-adopters.test.mjs` (describe/it inventory). Narrow, fully-known read set — no probe needed.

- [x] **Best Practices Review** — the audit's own deliverable is verification, not new module surface. The one inline fix applied (Phase 2) is a comment-only addition to an existing list; no responsibilities, dependency direction, or abstractions change. Nothing deferred.

- [x] **Archive skim** — self-referential by construction (the cohort children *are* the archive entries). Beyond the cohort, the tool's prior history was re-confirmed through the children's own skims: CORE-360 (fixture harness), CORE-364 (`reportResult`/`reportSummary` decomposition), CORE-366 (`verifyPinnedSha`), CORE-351.3 (`drift` status, `gitlinkDrift`), CORE-312/322/345 (`parseArgs`, error shape, `--root`). Nothing in that lineage contradicts the cohort as shipped.

- [x] **Drift check** — every path the cohort cites still matches HEAD. Function offsets shifted as expected across the three commits (`checkAdopter` 335→360, `applyBump` 402→448) and `rollbackBump` (`:431`) is present and exported; the children's *relative* claims (guard before `tagsInRange`; `priorSha` captured after the fetch and before the checkout; `--root` check inside `parseArgs`'s own branch) all hold. Contract half: `SPEC.md` §"What flowtron does NOT provide" (`:887-894`) still carves the tool out at the same level ("latest non-breaking release, dry-run by default, local commits only, never pushes") — all three children narrowed the tool's failure surface inside that carve-out rather than widening it. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: the cohort is complete as filed — the epic's PLAN description names exactly three hardening targets (pinned-ahead downgrade guard, mid-bump rollback, `--root` arg validation) and each maps 1:1 to a closed child, so the audit scope is the full cohort, not a partial one.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (three children, three commits, one file + its suite):

| Child | Commit | Deliverable | Suite |
|---|---|---|---|
| CORE-419.2 | `5ce8a1d` | Pinned-ahead guard in `checkAdopter` — returns `skip` when the pin parses newer than `latest`, before `tagsInRange` can pass the migration gate vacuously (+15 / +13 test) | 25 → 26 |
| CORE-419.3 | `9d81d12` | `rollbackBump` + `applyBump` restructured around a try/catch with `priorSha` capture and a `staged` flag; original error still propagates (+58/−11 / +63 test) | 26 → 28 |
| CORE-419.4 | `bd460ec` | `--root` value-shape check in `parseArgs` — missing value or `--`-prefixed value routes to the existing `USAGE` error path (+11/−2 / +14 test) | 28 → 30 |

The three are structurally independent (different functions, no shared state), which is why they closed cleanly in sequence without cross-child rework.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the one inline fix extends the header comment's existing "Per-adopter safety gates" bullet list, the same list CORE-419.2 extended, in the same two-line `- condition → consequence` shape. No new pattern.

- [x] **Minimal refactor gate** — no refactor. The audit is a verification pass; the single edit is additive and comment-only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, comment-only edit; no behavior to assert. The cohort's own 5 new fixtures are re-run as the regression check (Phase 3).

**Implementation Notes:**

### Cohort coherence findings

**Style and naming parity — clean.**

- All three children extend the module's established shape: top-level exported single-purpose functions with explicit args and no shared closure state. `rollbackBump` (`:431`) is the cohort's only new export, matching the module's export-everything-for-testability convention.
- Each new guard carries a block comment naming the *failure mode*, not the mechanism — the file's existing idiom (established by the "Gitlink-drift detection" block). The pinned-ahead guard (`:370-373`), the fetch-outside-the-rollback-window note (`:450-451`), and the pathspec-commit note (`:466`) all read consistently.
- Test provenance tags are uniform: `(CORE-419.2)`, `(CORE-419.3)`, `(CORE-419.4)` appear on every fixture the cohort added — 419.2 and 419.4 on the `it` titles, 419.3 on the enclosing `describe`. Matches the file's prior convention (`Version regex parity (CORE-366)`).

**No contradictory cross-refs.** All three children's `## 🔗 Related` blocks point at `[[CORE-EPIC-419]]` plus their true predecessors; `.3` and `.4` correctly name `.2` as a sibling and cite its guard-efficacy discipline (prove the new test fails against the pre-fix file), which all three then actually followed. No child claims a behavior another child contradicts.

**No regressions in earlier-shipped surfaces.** `.2`'s guard sits between the `current === latest` early-return and `tagsInRange`; `.3` wrapped `applyBump` only; `.4` touched `parseArgs` only. No shared state, no reordering of an earlier child's code. Confirmed empirically: the full 30-fixture suite (which includes all five cohort fixtures) is green at HEAD, and `reportResult`'s `⏭` / `✗` branches render the cohort's new `skip` reason and rollback-residue message without any reporting change — exactly as `.2` and `.3` predicted.

### Miss surfaced — and fixed inline

The epic made the script header's "Per-adopter safety gates" list the tool's **exhaustive** gate contract: CORE-419.2's Acceptance included "the script's header safety-gate list names the new gate", and its Phase 4 sweep concluded the prose docs stay accurate precisely *because* "the gate list that is exhaustive lives in the script header".

That list is not actually exhaustive. `checkAdopter`'s **first** skip —

```js
if (current === null) return { status: 'skip', reason: 'unreadable pinned SPEC.md version' };
```

— has never appeared in it. Pre-existing (it predates the cohort), but the epic is what promoted the header from a helpful summary to the load-bearing contract that the doc sweeps defer to, so an incomplete list is now a live inconsistency rather than a cosmetic one.

**Fix applied** (`tools/update-adopters.mjs:19-20`, +2 lines): a leading bullet for the unreadable-`SPEC.md` skip, ordered to match `checkAdopter`'s actual gate order. Comment-only; no behavior change. Small and squarely inside the surface the epic just hardened, so it lands here rather than as a follow-up filing.

**No other misses.** Two deliberate deferrals were re-checked and confirmed sound rather than logged as candidates:

- `.4`'s duplicated `msg` / `exitOnError` block (two call sites, differing messages) — extraction would add indirection without removing real duplication. Still agree.
- `.4` leaving the header's `--root <dir>` usage line untouched — it documents the flag's happy path and makes no claim about validation, so tightening input validation falsifies nothing. Still agree.

No `/ft-file-followup` candidates.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **30 pass / 0 fail**, unchanged before and after the inline edit. This doubles as the cohort regression check: all five fixtures the cohort added are in this suite.

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` clean (matches `.flowtron/tasknote/README.md` §"Project quick commands"; zero-dep plain-Node tool, no repo-root ESLint config applies).

- [x] **Quality assertions** — the edit is two comment lines added to an existing list: no duplication (the gate was documented nowhere else), no dead code, no complexity, no public-surface change. It *removes* stale code-facing documentation rather than adding any.

- [x] (frontend) N/A — no frontend surface; the audit touched one Node CLI comment block, PLAN.md, and this tasknote.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

The suite is the cohort's own regression surface: 25 fixtures before the epic, 30 after. Re-running it at HEAD confirms all three children's guards coexist without interference — in particular that `.3`'s try/catch restructuring of `applyBump` did not disturb `.2`'s guard upstream of it in `checkAdopter`, and that `.4`'s `parseArgs` tightening did not break the `dry-run CLI (--root fixture)` and `sandboxed --apply` blocks that pass `--root` legitimately.

No guard-efficacy check applies here — the audit's one edit is a comment, so there is no behavior for a test to fail against.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change.

  Cumulative check, not a re-run of the children's three sweeps. Four of the fourteen mention the tool at all (`README.md:262`, `SPEC.md:58` + `:890-894`, `docs/MIGRATION.md:208` + `:483`, `docs/CONVENTIONS.md:90`); each was re-read against the epic's *combined* effect rather than one child's diff. All four describe the tool at carve-out or release-gate level — "latest non-breaking release, dry-run by default, local commits only, never pushes" (`SPEC.md:890-894`), "skips any repo whose release range carries real migration steps" (`docs/MIGRATION.md:483`), "the portable `node --test` suite" as a release gate (`docs/CONVENTIONS.md:90`, `docs/MIGRATION.md:208`). None enumerates the gate list, describes `applyBump`'s failure handling, or makes a claim about per-flag arg validation, so none is falsified by three gates' worth of hardening. `SECURITY.md` was checked directly for submodule-bump/fleet claims — none present. `claude/CAPABILITIES.md`'s last-verified stamp is a version-bump concern; no release is being cut here.

  The one doc surface that *was* stale is the exhaustive gate list in the script header — not one of the fourteen, but the doc the fourteen implicitly defer to. Fixed in Phase 2. Outside the fourteen, `claude/skills/ft-release/SKILL.md:238` names the suite as a release gate by command, not by count, so the five added fixtures need no edit there.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; no criterion left unaddressed. YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested under the parent pending the flip decision; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted

**Final Summary:**

The `CORE-EPIC-419` cohort audits clean: all three children landed in `tools/update-adopters.mjs` and its suite, they cohere in style and cross-reference, and they do not interfere with each other. The audit surfaced one real inconsistency the per-child sweeps could not see — the epic promoted the script header's safety-gate list into the tool's authoritative gate contract (each child's doc sweep concluded the prose docs were fine *because* the exhaustive list lived there), but that list had never included `checkAdopter`'s first skip, the unreadable-`SPEC.md` case. Fixed inline.

- **Changed:** `tools/update-adopters.mjs` (+2, comment-only: the missing gate bullet, ordered to match `checkAdopter`'s actual gate order), plus `.flowtron/PLAN.md` and this tasknote's archive move.
- **Verification:** `node --test tools/update-adopters.test.mjs` **30/30** before and after the edit — which is also the cohort regression check, since all five fixtures the epic added live in that suite; `node --check tools/update-adopters.mjs` clean.
- **Cohort inventory:** `.2` pinned-ahead guard in `checkAdopter` (+15/+13 test, suite 25→26) · `.3` `rollbackBump` + `applyBump` try/catch with `priorSha` capture (+58/−11/+63 test, 26→28) · `.4` `--root` value-shape check in `parseArgs` (+11/−2/+14 test, 28→30). Three structurally independent functions, which is why they closed in sequence with zero cross-child rework.
- **Refactors:** none made, none deferred. Two deliberate deferrals inherited from `.4` (the duplicated `msg`/`exitOnError` block; the untouched `--root <dir>` usage line) were re-examined and confirmed sound rather than reopened.
- **Documentation:** doc-drift sweep clean across all 14 AI-referenced docs — the four that mention the tool describe it at carve-out/release-gate level and survive the epic's combined effect. The stale surface was the script header itself, now complete.
- **Maintainability:** the epic's real product is that `tools/update-adopters.mjs` — the one script in the repo that mutates other repositories — now refuses to downgrade a fleet, leaves no residue when a bump fails mid-flight, and rejects a `--root` that would silently retarget the real `~/code`. This audit's contribution is smaller but load-bearing in the same direction: the header list that the whole doc set defers to now actually matches the code it claims to summarize, so the next child's Phase 4 sweep can keep trusting it.
- **No follow-ups.** No `/ft-file-followup` candidates surfaced.

**Archived:** 2026-08-09
