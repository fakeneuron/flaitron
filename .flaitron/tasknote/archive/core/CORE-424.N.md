---
title: fleet-updater failure signals audit
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-424, CORE-424.2, CORE-424.3, CORE-424.4]
---

# CORE-424.N | fleet-updater failure signals audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-424]]

## 🎯 Goal

Verify the completed `CORE-EPIC-424` (`fleet-updater failure signals`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-424.N — audit CORE-EPIC-424` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-424.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-424.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-424` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-424.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-424]] — parent epic: fleet-updater failure signals
- [[CORE-424.2]] — cohort child: exit-code + stderr
- [[CORE-424.3]] — cohort child: fail-closed migration gate
- [[CORE-424.4]] — cohort child: mid-fleet failure test

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-424` active under `## <Priority>`; children `.2` `.3` `.4` all `[x]`, `.N` the sole open child. No `.1` Discovery child exists: the epic was filed by `/ft-audit-repo` on 2026-08-09 with discovery supplied, so the cohort went straight to implementation children numbered from `.2`.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Full cohort closed the same day (2026-08-09) across three commits; no early-audit bypass was needed. Auditing now captures the cohort at its natural boundary, before a release tag or further fleet-updater work interleaves.

- [x] Read relevant source files — all three archived cohort tasknotes (`archive/core/CORE-424.{2,3,4}.md`); `tools/update-adopters.mjs` (header block 1–53, `migrationBearingTags` 262–291, `reportResult` bump-failure `:524`, `main`'s check-failure `:574` + `process.exitCode` `:590`); `tools/update-adopters.test.mjs` (32 cases); the three cohort commits `77207ae` / `9d32327` / `73ba3b1`.

- [x] **Best Practices Review** — N/A as a code-boundary review: the audit is a verification pass. The two fixes it applies (below) are comment/doc text only, no responsibility or dependency-direction change.

- [x] **Archive skim** — self-referential for the cohort itself. Non-cohort context already inventoried by the children: CORE-322 (the file's `console.error` failure convention), CORE-419.3/.4 (rollback fixture + `--root` guard), CORE-360 (importable-module seam and its "exit codes stay behavior-identical" constraint, deliberately amended by `.2`), CORE-366 (non-1 git exit handling). No further archive read needed.

- [x] **Drift check** — every path and line the cohort cited still resolves at HEAD: `migrationBearingTags` now at `:262` (was `:258` pre-`.3`, shifted by its own diff — the tasknote's cite is historical, not stale guidance); the two `✗` sites at `:524` / `:574` are both `console.error`; `process.exitCode = 1` at `:590`. No SPEC contract governs this script (SPEC.md §"What flowtron does NOT provide" carve-out at `:890` still holds).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  - **Cohort is complete** — `.2` `.3` `.4` all closed; no deferred child, no partial-cohort caveat to record.
  - **Both surfaced misses are in-scope inline fixes** — each is a one-to-three-line prose correction on a surface the cohort itself moved (the script's own header, and the one AI-referenced doc that describes the tool's skip behavior). Per skill Step 5 these are applied here rather than deferred to `/ft-file-followup`.
  - **No production-logic change** — the audit does not touch executable code, so the suite result is a regression check, not a new-behavior check.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The cohort landed three complementary halves of one contract: `.2` made failure shell-visible (exit 1 + stderr), `.3` made an unclassifiable release fail closed rather than fail open, `.4` pinned the multi-adopter continue-and-exit-1 behavior in the suite. Cross-referencing is consistent — `.2` explicitly deferred the fixture to `.4`, and `.4` picked it up and says so; `related-tasks` frontmatter is reciprocal across all three.

The one asymmetry worth auditing is documentation treatment. `.2` updated the script's **header block** (added the five-line `Exit codes:` paragraph) because it changed operator-facing behavior. `.3` changed operator-facing behavior too — a new class of release now gets skipped — but documented it only at the **function** comment. The header's "Per-adopter safety gates" bullet list, which is the file's canonical enumeration of skip reasons, was left at its pre-`.3` state. Same asymmetry propagates one level out to `docs/MIGRATION.md:483`, the only AI-referenced doc that characterizes what the tool skips.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the fix follows the precedent `.2` set inside this same cohort: operator-facing behavior change → update the script's header block, not only the local function comment. Both edits extend existing prose structures (a bullet in the header's gate list; a clause in MIGRATION.md's existing sentence). No new doc section, no new shape.

- [x] **Minimal refactor gate** — no refactor. Comment and doc prose only; no executable line touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A. No behavior changed; `.3`'s lightweight-tag unit test and `.4`'s mid-fleet fixture already cover the contract the fixes describe.

**Implementation Notes:**

**Cohort inventory** (one bullet per child):

- **CORE-424.2 — exit-code + stderr.** `tools/update-adopters.mjs` +12/−2: `process.exitCode = 1` after `reportSummary` (`:590`), both `✗` lines moved `console.log` → `console.error` (`:524` bump-failure, `:574` check-failure), and a five-line `Exit codes:` paragraph added to the header usage block. Success surface byte-identical. Verified 30/30 plus a manual two-fixture CLI check.
- **CORE-424.3 — fail-closed migration gate.** `migrationBearingTags` (`:262`) now probes `%(objecttype)` before `%(contents)`: `objecttype !== 'tag' || !contents.trim()` → migration-bearing. Root-cause nuance recorded: git returns the *commit* message for `%(contents)` on a lightweight tag, so emptiness alone was the wrong probe. One unit test pins the lightweight path (suite 31/31).
- **CORE-424.4 — mid-fleet failure test.** `tools/update-adopters.test.mjs` only, +~28 LOC: `a-ok` / `b-fail` / `c-ok` under `describe('sandboxed --apply')`, `b-fail` rejected by an injected pre-commit hook (CORE-419.3's recipe). Asserts exit 1, both good adopters still bumped, `Summary: … 1 failed` (suite 32/32).

**Coherence findings:**

1. **Cross-reference integrity — clean.** `related-tasks` frontmatter is reciprocal across all three children and each names `CORE-EPIC-424`. `.2` explicitly deferred the regression fixture to `.4`; `.4` names `.2` as predecessor and picks it up. No contradictory claim between the children's notes.
2. **Naming/style parity — clean.** All three use the file's established `console.error` failure sink (CORE-322 convention), the same `✗ <name>: <what> failed — <msg>` report shape, and the same verification pair (`node --test tools/update-adopters.test.mjs` + `node --check` on both files) that `.flowtron/tasknote/README.md` §"Project quick commands" registers as this surface's gate.
3. **No regressions in earlier children's surfaces.** `.2`'s three sites all still hold at HEAD after `.3` and `.4` landed; the full 32-case suite is green, which exercises `.2`'s exit contract (via `.4`'s fixture) and `.3`'s classifier together.
4. **Documentation-treatment asymmetry — FOUND, fixed inline.** `.2` updated the script's header block for its operator-facing change; `.3` made an operator-facing change of the same class (a new reason a repo gets skipped) but documented it only at the `migrationBearingTags` function comment. The header's "Per-adopter safety gates" list — the file's canonical enumeration of skip reasons — still read as if a real Migration block were the only content-derived gate.
5. **Same gap one level out — FOUND, fixed inline.** `docs/MIGRATION.md:483` is the only AI-referenced doc that characterizes what the sweep skips; it named "real migration steps" and not the fail-closed unclassifiable case. Not false, but incomplete in a way that would mislead an operator reasoning about why a repo was skipped.

**Inline fixes applied:**

- `tools/update-adopters.mjs:29-31` — new bullet in the header's "Per-adopter safety gates" list covering the unclassifiable-notes gate, cross-referencing `migrationBearingTags` (+3 lines).
- `docs/MIGRATION.md:483` — clause added to the existing sentence: skips also cover "a tag whose notes it can't classify, which it treats as migration-bearing rather than assume safe" (+1 line, in place).

**`/ft-file-followup` candidates:** none. Both misses were prose-sized and on surfaces the cohort itself moved, so they were corrected here rather than deferred.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **32 pass, 0 fail** (51.6s). Run as a regression check; no executable line changed.

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` clean (the repo's declared check for `tools/`; the `viz` npm lint/typecheck scripts don't cover it). `docs/MIGRATION.md` is prose — no lint surface.

- [x] **Quality assertions** — the change is documentation-only and net-corrective: it removes stale enumeration, adds no duplication (the header bullet points at `migrationBearingTags` rather than restating its logic), grows no public surface, and leaves no dead text.

- [x] (frontend) N/A — no frontend surface touched.

**Testing Notes:**

Baseline captured before the edits (32/32, `node --check` clean on both updater files) and re-run after — identical. Confirms the audit introduced no behavior delta, which is the intended outcome for a comment/doc-only fix.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries walked. One update, thirteen clean:

  - `README.md` — no change (`:262` describes `tools/` composition only; asserts nothing about gates or exit codes)
  - `SPEC.md` — no change (`:58` and `:890` are carve-out references; the script's behavior is explicitly out of contract)
  - `docs/MIGRATION.md` — **UPDATED** (`:483`) — the sweep-skip description named only "real migration steps"; added the fail-closed unclassifiable-tag case shipped by CORE-424.3
  - `claude/AGENTS-snippet.md` — no change (adopter-facing wiring block; never mentions the fleet script)
  - `codex/AGENTS-snippet.md` — no change (same, Codex surface)
  - `docs/CONVENTIONS.md` — no change (`:90` cites the updater suite as a release gate; still accurate, gate unchanged)
  - `CONTRIBUTING.md` — no change (no fleet-tooling surface)
  - `SECURITY.md` — no change; re-read against `.3` specifically, since fail-closed classification of an unreadable tag is adjacent to the submodule-bump threat model. The doc's stance is unchanged by the fix and the fix only tightens it
  - `docs/AGENT-NEUTRALITY.md` — no change (no Claude-specific surface added; both fixes are agent-neutral prose)
  - `docs/PLATFORMS.md` — no change (the updater's symlink-wiring flag is untouched by this cohort)
  - `claude/CAPABILITIES.md` — no change (no capability trigger involved; last-verified stamp unaffected)
  - `docs/AGENT-COMPAT.md` — no change (no per-agent currency claim touched)
  - `docs/EXTERNAL-AGENTS.md` — no change (no delegation or handoff surface touched)
  - `docs/WORKTREES.md` — no change (cohort ran serially in the main checkout; no `wt-*` isolation used)

  Also verified outside the sweep set: `claude/skills/ft-release/SKILL.md:466`'s sentinel note still holds — `migrationBearingTags` continues to `startsWith`-match the all-clear sentinel on annotated tags, and `/ft-release` cuts annotated tags, so `.3`'s gate does not bite normal releases.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status: completed`, PLAN.md line flipped to stub form and kept nested beneath `CORE-EPIC-424`, tasknote archived to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

The `CORE-EPIC-424` cohort holds together — the three children shipped one coherent contract (exit 1 + stderr, fail-closed classification, mid-fleet regression pin) with reciprocal cross-references, consistent failure-reporting style, and no regression in the earlier children's surfaces. The audit surfaced one real miss, in two places: `CORE-424.3` changed when the fleet updater skips a repo but documented it only at the function it changed, leaving the script's canonical gate list and the one AI-referenced doc that describes skip behavior reading as if nothing had changed.

**Changed:** `tools/update-adopters.mjs` (+3, header "Per-adopter safety gates" bullet for the unclassifiable-notes gate) and `docs/MIGRATION.md` (+1 in place, `:483` skip-description clause). Documentation only — no executable line touched.

**Verified:** `node --test tools/update-adopters.test.mjs` → 32 pass / 0 fail, before and after the edits; `node --check tools/update-adopters.mjs` clean. Identical results confirm zero behavior delta.

**Refactors:** none made, none deferred.

**Documentation:** 14 AI-referenced docs swept — 13 "no change", `docs/MIGRATION.md` updated as above.

**Follow-ups:** none filed. Both misses were prose-sized fixes on surfaces the cohort itself moved.

**Parent flip:** confirmed. `CORE-EPIC-424` flipped to stub form and the full cohort (parent + `.2` `.3` `.4` `.N`) moved atomically from `## Medium` to the top of `## Completed`. `## Medium` retains `CORE-EPIC-425`, so no `(none)` placeholder was needed.

**Maintainability:** the fleet updater's two operator-facing contracts — what makes it exit non-zero, and what makes it refuse to bump — are now each stated once in the header block an operator actually reads, instead of one being discoverable only by reading the classifier. The documentation-treatment asymmetry between `.2` and `.3` is the transferable lesson: a change to *when* a tool declines to act is as operator-facing as a change to its exit status, and belongs in the same place.

**Archived:** 2026-08-09
