---
title: missing-pinned-tag guard
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-459]
---

# CORE-459.4 | missing-pinned-tag guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-459]]

## 🎯 Goal

`rev-parse --verify` the adopter's pinned tag in `checkAdopter` before any range work runs, returning `skip` and naming the missing tag when it can't be resolved locally.

## ✅ Acceptance

- [x] `checkAdopter` returns `{status: 'skip', reason: '...'}` naming the unresolvable pinned tag when `current` (from SPEC.md's Version line) does not resolve to a real tag in `FLOWTRON_REPO` — checked before `tagsInRange`/`migrationBearingTags` run
- [x] New fixture test covers this case and asserts `checkAdopter` returns before any range work — no `tagsInRange`/`migrationBearingTags` call needs to be observed for the assertion to hold since the fixture's fake version can't parse to an in-range result anyway; the test asserts the `skip` status and reason directly
- [x] Existing test suite still passes in full — 37/37 (36 + 1 new)
- [x] Header comment's "Per-adopter safety gates" list gains a bullet for this gate
- [x] The new gate reuses the existing `canonicalTagSha` helper rather than duplicating a `rev-parse` lookup

## 🧩 Subtasks

- [x] Add the missing-pinned-tag gate in `checkAdopter`, placed right after the pinned-ahead guard (before `tagsInRange`), using `canonicalTagSha(current)`
- [x] Update the header comment's "Per-adopter safety gates" list with the new bullet
- [x] Add a fixture test: adopter pinned at a real tag, then SPEC.md's Version line overwritten to `v0.0.1` (guaranteed below the repo's oldest real tag, `v0.1.0`) — asserts `skip` naming the missing tag
- [x] Run `node --test tools/update-adopters.test.mjs`

## 🔗 Related

- [[CORE-EPIC-459]] — parent epic: adopter-bump edge states (Finding #4, High)
- [[CORE-459.2]] — sibling child; detached-HEAD gate this task's guard sits after in the guard chain
- [[CORE-459.3]] — sibling child; reverse gitlink-drift guard, same file, same epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Finding #4 (High) still matches current code. `checkAdopter` (tools/update-adopters.mjs:434) reads `current` from `pinnedVersion` — a string parsed out of SPEC.md's `**Version:**` line (tools/update-adopters.mjs:230) — and never confirms that string actually names a tag that still exists in `FLOWTRON_REPO`. It flows straight into `tagsInRange(current, latest)` (line 490) and `migrationBearingTags` on the pinned-ahead guard's far side. `tagsInRange` filters purely on parsed numeric versions (`compareSemver`), so a `current` that doesn't correspond to any real tag (deleted/renamed upstream, or a hand-edited/corrupted SPEC.md) silently produces a range computed against a boundary that was never actually released — wrong rather than a clear signal to the operator. `canonicalTagSha` (line 267) already does exactly the `rev-parse`-based existence check needed here (`git rev-parse ${tag}^{commit}`, returns null on failure) — it's used today only to resolve `latest`'s SHA for the drift checks, never to verify `current` itself.

- [x] Read relevant source files — read `checkAdopter` in full (434-516), `canonicalTagSha`/`recordedGitlinkSha`/`gitlinkDrift` (255-284), `pinnedVersion` (227-236), `parseSemverTag`/`compareSemver` (196-207), and `tagsInRange`/`migrationBearingTags` (292-344) in `tools/update-adopters.mjs`; read the `checkAdopter classification (fixtures)` suite (253-369) and `makeAdopter` (108-129) in `tools/update-adopters.test.mjs` for the fixture pattern, including the `bad-spec-repo` case (350-356) which overwrites SPEC.md directly without committing — the pattern this task's fixture reuses.

- [x] **Best Practices Review** — extends the same early-classification shape `gitlinkDrift` and CORE-459.2/459.3's guards already use (report-only `{status: 'skip', current, reason}`, no mutation). Reuses `canonicalTagSha` rather than inlining a second `rev-parse ${tag}^{commit}` try/catch — same DRY move CORE-459.3 made when it extracted `canonicalTagSha`/`recordedGitlinkSha` in the first place, so this task is exactly the kind of second caller that extraction was for.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` has CORE-459.2.md and CORE-459.3.md, both siblings under this epic. Both confirm the epic's Discovery was supplied externally by audit-repo 2026-08-20 (no `.1` tasknote in this repo — `grep`/`find` for CORE-459.1 in `.flowtron/tasknote/` and its archive found nothing) and establish the precedent this task follows: guard placement ordered by dependency (CORE-459.2's detached-HEAD gate sits before CORE-459.3's reverse-drift gate; this task's gate slots after the pinned-ahead guard and before `tagsInRange`, matching "needs nothing beyond a `rev-parse` comparison, belongs ahead of every commit-path guard" reasoning from CORE-459.3), shared-helper reuse over duplication, and the fixture-test-plus-header-comment-update shape. No Fan-out claim in either sibling names CORE-459.4 (no `## 🌳 Fan-out` section present in either — both are single-child-shaped notes), so no YAML `blocked-by`/`parallel-safe-with` echo applies.

- [x] **Drift check** — PLAN.md's CORE-459.4 line ("`rev-parse --verify` the pin before range work → `skip` naming the missing tag") matches the code read above exactly: `current` is genuinely never verified against a real tag before `tagsInRange` runs. No SPEC contract conflict — same `tools/` fleet-maintenance carve-out (SPEC §"What flowtron does NOT provide") CORE-459.2/459.3 relied on.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Assumptions: (1) reuse the existing `'skip'` status rather than introduce a new status string — `reportResult`/`reportSummary` already treat `'skip'` as "report-only, no commit, counted separately," which is exactly this case; (2) implement via the existing `canonicalTagSha` helper (an effective `rev-parse --verify`-shaped existence check: it resolves `${tag}^{commit}}` and returns null on failure) rather than adding a literal separate `git(..., 'rev-parse', '--verify', ...)` call, since that would duplicate a lookup the file already has and the task's own title names the git primitive, not a specific call site.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Verdict: Proceed, no significant scope deviation → skip 🛠️. Guard placed immediately after the pinned-ahead guard (tools/update-adopters.mjs:476-488) and before `tagsInRange` (line 490) — first point in the guard chain where `current` is about to be used for range computation, so it belongs right there rather than earlier (detached-HEAD/pinned-ahead don't need it) or later (would let a bogus range reach `migrationBearingTags`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing early-return guard shape (`{status: 'skip', current, reason}`) that every other gate in `checkAdopter` already uses; reused `canonicalTagSha` rather than adding a parallel lookup.

- [x] **Minimal refactor gate** — no refactor needed; `canonicalTagSha` already existed as a private helper from CORE-459.3's extraction and required no changes to serve this second call site.

- [x] Implemented the minimal solution — added the guard in `checkAdopter` right after the pinned-ahead guard block, before `tagsInRange`: calls `canonicalTagSha(current)`; if it resolves to `null`, returns `{status: 'skip', current, reason: 'pinned tag <current> not found in <FLOWTRON_REPO> — run git fetch --tags in <FLOWTRON_REPO> and re-run'}` (wording mirrors the pinned-ahead guard's existing `git fetch --tags` remediation phrasing). Falls through unchanged when the tag resolves. Added the matching header-comment bullet to "Per-adopter safety gates".

- [x] Updated/added tests for non-trivial behavior — added `skip: pinned tag not found locally (missing-pinned-tag, CORE-459.4)` to the `checkAdopter classification (fixtures)` suite: pins an adopter at a real tag (`previous`), then overwrites the submodule's `SPEC.md` Version line directly (uncommitted, mirroring the existing `bad-spec-repo` fixture's pattern) to `v0.0.1` — a value that parses as valid semver but sits below `v0.1.0`, the oldest real tag in the repo, so it's guaranteed not to resolve as a git tag while still passing the pinned-ahead guard (it's not ahead of `latest`).

**Implementation Notes:** `tools/update-adopters.mjs`: added the missing-pinned-tag guard in `checkAdopter` (+8 lines) between the pinned-ahead guard and `tagsInRange`; extended the header comment's "Per-adopter safety gates" list (+3 lines). `tools/update-adopters.test.mjs`: +8 lines (one `it` block alongside `bad-spec-repo`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`

- [x] Ran lint/type-check on changed code — no root-level lint config covers `tools/`; ran `node --check` on both changed files (syntax OK) — matches CORE-459.2/459.3 precedent (no linter configured for this directory).

- [x] **Quality assertions** — no duplication: reused `canonicalTagSha` instead of inlining a second `rev-parse` pair. No dead code. No unexplained complexity — the new gate is a single early-return matching the shape every other gate in the function already uses. No public-surface growth — `checkAdopter`'s return shape gains only a new `reason` string on the existing `'skip'` status; `canonicalTagSha` stays private and unexported. Header comment updated so it doesn't go stale.

- [x] (frontend) N/A — no UI surface touched.

**Testing Notes:** `node --check` clean on both changed files. `node --test tools/update-adopters.test.mjs` → tests 37, suites 12, pass 37, fail 0, cancelled 0, skipped 0. Includes the new `skip: pinned tag not found locally (missing-pinned-tag, CORE-459.4)` fixture; all 36 prior tests still pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change. Self-contained fix inside `tools/update-adopters.mjs` + its test file; no README/AGENTS/SPEC/MIGRATION/CAPABILITIES/AGENT-COMPAT/PLATFORMS surface describes this internal guard (same verdict as sibling CORE-459.2/CORE-459.3).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-459` parent; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted (below).

**Final Summary:** Added a missing-pinned-tag guard to `checkAdopter` in `tools/update-adopters.mjs`, closing Finding #4 (High): `current` (the adopter's pinned version, parsed from SPEC.md's Version line) previously flowed straight into `tagsInRange`/`migrationBearingTags` with no check that a tag by that name still existed in `FLOWTRON_REPO`. A deleted/renamed upstream tag, or a hand-edited/corrupted SPEC.md Version line, would silently compute a range against a nonexistent boundary instead of surfacing a clear signal. The new gate — placed right after the pinned-ahead guard and before `tagsInRange` — reuses the existing `canonicalTagSha` helper (an effective `rev-parse --verify`) to confirm `current` resolves; when it doesn't, returns `{status: 'skip', reason: 'pinned tag <current> not found in <FLOWTRON_REPO> — run git fetch --tags...and re-run'}`, mirroring the pinned-ahead guard's remediation phrasing. No new lookup logic — `canonicalTagSha` already existed from CORE-459.3's extraction. Added one fixture test (`skip: pinned tag not found locally`) that pins an adopter at a real tag then overwrites its worktree SPEC.md to `v0.0.1` — valid semver shape, guaranteed below the repo's oldest real tag (`v0.1.0`), so it resolves nowhere while still clearing the pinned-ahead guard. Updated the header comment's "Per-adopter safety gates" list to name the new gate. Full suite: 37/37 pass (36 prior + 1 new), no regressions. No public-surface growth, no doc drift.

**Archived:** 2026-08-21
