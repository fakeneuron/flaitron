---
title: updater-failure-honesty audit
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-490, CORE-490.2, CORE-490.3, CORE-490.4]
---

# CORE-490.N | updater-failure-honesty audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-490]]

## 🎯 Goal

Verify the completed `CORE-EPIC-490` (`updater-failure-honesty`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. — 16 entries swept below, no change on all 16.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — one contradictory cross-ref found (finding 1) and one parity break (finding 2); both fixed.
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — 45/45 at HEAD before any audit edit, and again after.
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — findings 3 + 4, to file as one ticket.
- [x] Single `feat: CORE-490.N — audit CORE-EPIC-490` (or `chore: ...` if no code edits land) commit lands — `chore:`, the only code edit being a comment.
- [x] PLAN.md line for `CORE-490.N` flipped to stub form `Completed 2026-08-29.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-490.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-490` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-490.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-490]] — parent epic (updater-failure-honesty)
- [[CORE-490.2]] — gitlink-drift unresolved sentinel
- [[CORE-490.3]] — no-verify bump commit
- [[CORE-490.4]] — tag-pair memoization

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The user invoked `/ft-close-epic CORE-490.N` and the skill's Step 1-2 pre-flight passed cleanly: `.N` is the reserved terminal audit suffix, `CORE-EPIC-490` is active under `## Medium`, and all three implementation children (`.2`, `.3`, `.4`) are `[x]` — no early-audit decision, the cohort is complete. Working tree was clean at scaffold.

- [x] Read relevant source files — all three cohort children's archived tasknotes in full (`archive/core/CORE-490.{2,3,4}.md`); `tools/update-adopters.mjs` header comment (`:1-90`), the sentinel trio + resolvers + `gitlinkDrift` (`:269-330`), `latestReleaseTag`/`tagsInRange` (`:331-350`), the memoization block (`:484-511`), the gate-list comment + `checkAdopter`'s gates (`:513-625`), `applyBump`'s canonical-SHA check (`:670-690`); `SECURITY.md` §"Fleet updater (`tools/`)"; every `update-adopters` reference across the sweep set.

- [x] **Best Practices Review** — the cohort is three changes to one file by three sequential children. Reviewed as a unit: dependency direction unchanged (no new module, no new boundary), the one new module-level state (`.4`'s two `Map`s) is scoped to its sole consumer and documented at its declaration, and the two children that changed a contract (`.2`'s sentinel, `.3`'s `--no-verify`) each documented it at the call site *and* in the header. One duplication surfaced — see Implementation Notes finding 2.

- [x] **Archive skim** — self-referential by construction: the cohort children are themselves the archive entries under review, and each ran its own skim (`.2` → CORE-351.3 / 366 / 459.3 / 459.4; `.3` → CORE-419.3 / 424.4; `.4` → the two siblings). Followed `.4`'s pointer to CORE-479, which owns the gate-list comment this audit ends up amending. No non-cohort archive entry added a constraint the children missed.

- [x] **Drift check** — the parent epic line's three claims all still match HEAD: `gitlinkDrift`'s conflation is gone (`:315-330`), `applyBump` passes `--no-verify` (`:686-690`), and the per-adopter re-query cost is memoized (`:484-511`). One stale citation found *inside* the cohort's own deliverable (the gate-count comment, finding 1) — fixed inline. No SPEC contract touched: `tools/` is the singular CLI carve-out under SPEC.md §"What flowtron does NOT provide", as all three children established.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Cohort is complete** — no `.1` Discovery child exists (Discovery was supplied by audit-repo 2026-08-28 and baked into the epic line), so the cohort is exactly `.2`/`.3`/`.4`. All three sibling notes independently verified this; nothing is missing from the audit's scope.
  2. **Inline-fix threshold** — a finding is fixed here when it is a stale/contradictory statement *inside* a cohort deliverable (documentation-only, no behavior change); anything touching runtime behavior is logged as a `/ft-file-followup` candidate instead. Both fixes applied below are comment/checkbox edits; both findings deferred are code changes.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Cohort deliverables, one bullet each:**
  - **CORE-490.2** (`gitlink-drift-unresolved-sentinel`) — added the module-private `unresolved(error)` / `isUnresolved(value)` / `gitErrorLine(e)` trio; both SHA resolvers and `gitlinkDrift` now return the sentinel instead of a `null` that read as "no drift"; `checkAdopter`'s `current === latest` branch reports `skip: <git error> — pin left unverified` where it used to report `✓ current`. +2 tests (39/39).
  - **CORE-490.3** (`no-verify-bump-commit`) — `--no-verify` on `applyBump`'s pathspec commit, documented at the call site, in the header's "Mid-bump rollback" paragraph, and as a new `SECURITY.md` Fleet-updater bullet; the two existing fault-injection fixtures retargeted `pre-commit` → `prepare-commit-msg` (caught in its own Discovery, not left as a false-green), +1 positive test (40/40).
  - **CORE-490.4** (`tag-pair-memoization`) — two module-level `Map`s + `cachedMigrationBearingTags` / `cachedNewSkillWiringSurfaces` keyed by `(fromTag, toTag)`, wrapping at the `checkAdopter` call sites rather than mutating the exported lookups; plain (non-`async`) wrappers so promise identity survives. +5 tests (45/45).
- **The three changes do not interact.** `.2` and `.4` both edit `checkAdopter`, but at disjoint points — `.2` in the `current === latest` early-return, `.4` at the migration-bearing and skill-wiring call sites two gates later. `.4`'s missing-pinned-tag neighbour still calls `canonicalTagSha` directly and correctly reads `.2`'s sentinel via `isUnresolved` (`:594`). No merge artifact, no double-handling.
- **Suite is monotonic across the cohort** — 37 baseline → 39 → 40 → 45, each child's count reconciled in its own Testing Notes. Independently re-verified at audit time: 45/45.
- **`.2` chose module-private helpers, `.4` chose exported wrappers.** Not an inconsistency: `.2`'s tests reach the sentinel through the already-exported `checkAdopter`/`gitlinkDrift`, while `.4`'s promise-identity assertions need the wrapper itself. Both rationales are recorded in their notes, and the file already exports internals for test access (`git`, `pinnedVersion`, `verifyPinnedSha`).
- **Epic performance claim, quantified.** The epic's "~2,700 subprocess spawns" is dominated by `migrationBearingTags`' two `git tag -l` spawns per tag in range (~80/adopter over a ~40-tag range), which `.4` collapsed to once per distinct `(current, latest)` pair. The residual (finding 3) is ~2 spawns/adopter — real, same defect class, but roughly two orders of magnitude smaller. The epic's goal is substantially delivered.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A as a new-code exercise: the audit is a verification pass over existing cohort deliverables. The one code edit is a comment amendment that extends the existing gate-list comment's own enumeration shape (CORE-479's), adding no new pattern.

- [x] **Minimal refactor gate** — no refactor. Both edits are documentation-only (a stale count + enumeration in a code comment; a contradictory checkbox in an archived note). The two findings that would require code changes are deferred to follow-up filings rather than absorbed here.

- [x] Implemented the minimal solution — two inline fixes, below.

- [x] Updated/added tests for non-trivial behavior — N/A, no behavior changed. The existing 45-test suite was re-run as a regression check.

**Implementation Notes:**

**Coherence findings — 2 fixed inline, 2 deferred.**

**Finding 1 (fixed inline) — the gate-list comment went stale against the gate `.2` added.** `tools/update-adopters.mjs:514` opened with "Eight sequential skip/drift gates below" and enumerated eight by name. CORE-490.2 added a ninth — the `skip: … — pin left unverified` return at `:532` — and correctly documented it in the header's "Per-adopter safety gates" bullet list (now nine bullets), but left this inline comment at eight with the new gate absent from its enumeration. The file's two gate inventories therefore disagreed, one of them citing a count that a reader can falsify by scrolling twenty lines. Fixed: count → "Nine", enumeration gains `unresolved gitlink` in position 2 (matching its actual firing order, between `unreadable version` at `:525` and `reverse gitlink-drift` at `:538`); the CORE-479 rationale paragraph below it is reflowed but otherwise unchanged in wording.

*Why this is the cumulative-drift class an audit exists to catch:* CORE-490.2's own Phase 4 sweep was correct on every one of its sixteen entries — the doc-drift sweep walks `.flowtron/tasknote/README.md` §"AI-referenced docs", and a comment inside `tools/update-adopters.mjs` is not in that set. The staleness was in-file, one screen from the change, and invisible to the per-task closure by construction.

**Finding 2 (fixed inline) — CORE-490.2's archived note contradicts itself.** Its final subtask, `Run node --test … and node --check …`, was left `[ ]` while its own Testing Notes in the same file record 39/39 pass and clean checks. Both sibling notes ticked their identical final subtask, so this is a parity break as well as a self-contradiction — an archived note that reads, on its subtask list alone, as though the suite was never run. Ticked to `[x]`, which is what the note's own evidence says happened. No other content in the archived note touched.

**Finding 3 (deferred → follow-up candidate) — sweep-constant tag resolutions are still re-spawned per adopter.** `canonicalTagSha(latest)` is reached once per adopter through `gitlinkDrift` (`:322`) even though `latest` is fixed for the entire sweep, and `canonicalTagSha(current)` runs again per adopter at the missing-pinned-tag guard (`:594`) for a `current` most adopters share. Both are `git rev-parse` spawns against `FLOWTRON_REPO` — the exact defect class CORE-490.4 addressed, and reachable with the same one-`Map` shape it already established. It is not a gap in `.4`'s execution: `.4`'s PLAN line named `migrationBearingTags` and `newSkillWiringSurfaces` specifically, and its Discovery Notes explicitly declined to widen ("strictly the two named functions per its own PLAN.md line, not a broader spawn-reduction sweep") — correct scope discipline that leaves a named residual for exactly this audit to pick up. Magnitude is honest: ~2 spawns/adopter against the ~80/adopter `.4` removed, so this is tidiness plus consistency, not a performance problem.

**Finding 4 (deferred → same follow-up) — `applyBump` hand-inlines a second spelling of `canonicalTagSha`.** `:679` runs `git(FLOWTRON_REPO, 'rev-parse', \`${latest}^{commit}\`)` inline — the exact body of the `canonicalTagSha` helper, minus the `try`/sentinel that CORE-490.2 just made that helper's defining contract. The divergence is defensible (`applyBump` wants a throw to trigger `rollbackBump`, not a sentinel it would have to unwrap), but nothing at either site says so, so the file now presents two spellings of one lookup with the newer contract documented only on one. Either route `applyBump` through the helper with an explicit `isUnresolved` → `throw`, or leave the inline call and add the one-line reason. Same function, same file region, one `Map` and one comment away from finding 3 — file them as a single ticket.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — CLI-only comment edit, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- **Regression baseline first:** `node --test tools/update-adopters.test.mjs` → **45/45 pass** before any audit edit, confirming the cohort's own reported end state (`.4`'s 45/45) still holds at HEAD.
- **After the finding-1 comment fix:** `node --test tools/update-adopters.test.mjs` → **45/45 pass**; `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` → clean. Per AGENTS.md §"Validation", `node --check` is this file's declared check (ESLint covers only `viz/src/**`, untouched here).
- **Quality assertions:** the edit is a code comment — no duplication, dead code, complexity, or public-surface change is possible from it. Its purpose *is* the "no stale code-facing documentation" assertion: it removes a count and an enumeration that had gone stale against the code beneath them. `viz/` untouched, so its three `npm` gates were not run.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", all 16 entries. The audit's only code edit is an internal comment in `tools/update-adopters.mjs`; the sweep set references that file structurally (it exists, it is the CLI carve-out, its test suite is a release gate) and never describes its internals, so no entry is reachable by this change. Verified rather than assumed — grepped the whole set for `update-adopters` and read all ten hits.

- `README.md` — no change (`:284` names `tools/` and the carve-out; no internals).
- `AGENTS.md` — no change (`:39` layout line; `:60-64` validation commands unchanged and all three re-run clean above).
- `SPEC.md` — no change (`:63` layout, `:1083-1087` the carve-out itself; both accurate, no workflow contract touched).
- `docs/MIGRATION.md` — no change (`:236` audit-gate commands, `:512` the sweep paragraph — describes migration-gate/skill-symlink behaviour, not gate counts).
- `claude/AGENTS-snippet.md` — no change (adopter wiring).
- `codex/AGENTS-snippet.md` — no change (adopter wiring).
- `cursor/AGENTS-snippet.md` — no change (adopter wiring).
- `grok/AGENTS-snippet.md` — no change (adopter wiring).
- `docs/CONVENTIONS.md` — no change (`:54` CI `validate` job restates AGENTS.md's command list verbatim; unchanged).
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change. §"Fleet updater (`tools/`)" carries CORE-490.3's `--no-verify` bullet (`:193`) alongside the pre-existing execFile-only / semver-constrained / canonical-SHA / never-push bullets; re-read in full against the cohort's end state and every bullet is still accurate. CORE-490.2's judgement that its honesty fix needed no new bullet holds — it strengthens the existing canonical-SHA cross-check rather than adding a surface.
- `docs/AGENT-NEUTRALITY.md` — no change (no Claude-specific surface touched).
- `docs/PLATFORMS.md` — no change.
- `claude/CAPABILITIES.md` — no change.
- `docs/AGENT-COMPAT.md` — no change.
- `docs/EXTERNAL-AGENTS.md` — no change.
- `docs/WORKTREES.md` — no change (cohort ran serially; no Fan-out claim exists, since no `.1` was filed).
- `docs/VISION.md` — no change.

**Final Summary:**

The `CORE-EPIC-490` cohort is coherent and its three claims all hold at HEAD: `gitlinkDrift` no longer reports a git failure as `✓ current`, the bump commit skips adopter hooks, and the per-adopter `FLOWTRON_REPO` spawn storm is memoized. The audit surfaced four findings — two documentation inconsistencies fixed inline, two code-level residuals deferred as one follow-up.

- **Changed:** `tools/update-adopters.mjs` (comment only — gate count `Eight` → `Nine`, `unresolved gitlink` added to the enumeration, CORE-479 rationale paragraph reflowed), `.flowtron/tasknote/archive/core/CORE-490.2.md` (one subtask checkbox `[ ]` → `[x]`, matching its own Testing Notes).
- **Verification:** `node --test tools/update-adopters.test.mjs` → 45/45 both before and after the edit; `node --check` clean on both `.mjs` files. `viz/` untouched, its gates not run.
- **Refactors:** none, by design — the inline-fix threshold set in Discovery admitted documentation-only corrections and pushed both code-level findings to a follow-up rather than absorbing them into an audit commit.
- **Docs:** sweep above — 16 entries, no change on all 16, verified by grepping the set rather than by assumption.
- **Follow-up to file:** one ticket covering findings 3 and 4 — memoize `canonicalTagSha` by tag (it resolves a sweep-constant `latest` once per adopter, and a commonly-shared `current` again at the missing-pinned-tag guard) and reconcile `applyBump:679`'s hand-inlined duplicate of that same lookup with the sentinel contract CORE-490.2 gave the helper.
- **Maintainability:** the file's two gate inventories — the header's "Per-adopter safety gates" bullet list and the inline pre-`checkAdopter` comment — now agree at nine, so neither can be read as authoritative against the other. The cohort's cross-cutting lesson is finding 1's: three children each ran a correct sixteen-entry doc-drift sweep and none could have caught a stale comment one screen from their own diff, because the sweep set is repo docs, not code comments. That is precisely the cumulative, slice-local staleness `SPEC/epic.md` §"Audit acceptance" puts the fixed sweep line here to surface.

- **Parent-flip:** confirmed at the 📦 gate. `CORE-EPIC-490` flipped to stub form and the parent + all four children moved atomically to the top of `## Completed` in this same commit. `## Medium` retains `FE-EPIC-101`, so no `(none)` placeholder was needed.

**Archived:** 2026-08-29
