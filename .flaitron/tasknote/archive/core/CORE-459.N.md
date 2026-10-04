---
title: adopter-bump edge states audit
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-459]
---

# CORE-459.N | adopter-bump edge states audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-459]]

## 🎯 Goal

Verify the three implementation children of CORE-EPIC-459 (detached-HEAD gate, reverse gitlink-drift guard, missing-pinned-tag guard) sit well together in `tools/update-adopters.mjs` as a coherent, non-overlapping guard chain, and sweep for doc drift before closing the epic.

## ✅ Acceptance

- [x] Confirmed the four `checkAdopter` gates (`current === latest`, reverse gitlink-drift, detached-HEAD, missing-pinned-tag) compose correctly in guard-chain order with no dead/unreachable branch and no gap left by the epic's Findings #1/#3/#4
- [x] Confirmed the full test suite passes with no regressions across all three children's combined changes
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — "no change" or the update, per entry
- [x] Findings recorded (even if none) — any epic follow-ups filed as new numeric children before `.N` per SPEC/epic.md §"Audit follow-ups"

## 🧩 Subtasks

- [ ] Read current `checkAdopter` end-to-end in `tools/update-adopters.mjs` and confirm the guard-chain order matches what each archived child note describes
- [ ] Run the full test suite (`node --test tools/update-adopters.test.mjs`) and confirm pass count
- [ ] Doc-drift sweep against `.flowtron/tasknote/README.md` §"AI-referenced docs"
- [ ] Draft audit findings (or "nothing found") and file any follow-ups
- [ ] Close CORE-459.N per Phase 4

## 🔗 Related

- [[CORE-EPIC-459]] — parent epic: adopter-bump edge states
- [[CORE-459.2]] — detached-HEAD pre-flight gate
- [[CORE-459.3]] — reverse gitlink-drift guard + shared helper extraction
- [[CORE-459.4]] — missing-pinned-tag guard

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (CORE-459.2/.3/.4) are closed; this is the terminal `.N` audit per SPEC/epic.md step 4, verifying the completed epic sits well in the codebase.

- [x] Read relevant source files — read `checkAdopter` end-to-end (tools/update-adopters.mjs:437-534), the shared helpers `recordedGitlinkSha`/`canonicalTagSha`/`gitlinkDrift` (258-287), and the header comment (1-74) in full.

- [x] **Best Practices Review** — no refactor surface; this is a verification-only audit task, not an implementation task.

- [x] **Archive skim** — read all three sibling notes (`CORE-459.2.md`, `CORE-459.3.md`, `CORE-459.4.md`); each records "no doc drift" and confirms the `tools/` fleet-maintenance carve-out (SPEC §"What flowtron does NOT provide"). No `.1` Discovery tasknote exists — the epic's Discovery was supplied externally by audit-repo 2026-08-20, consistent across all three.

- [x] **Drift check** — verified the guard-chain order in current code matches all three children's descriptions exactly: `current === latest` (+ forward `gitlinkDrift`) → reverse gitlink-drift guard (459.3, lines 456-466) → detached-HEAD guard (459.2, lines 468-477) → pinned-ahead guard → missing-pinned-tag guard (459.4, lines 493-506) → migration-bearing check → staged-changes gate → dirty-worktree gate → `bump`. No overlap, no dead branch, no gap: the reverse-drift and missing-pinned-tag gates only run past the `current === latest` early return, so they never double-fire against the forward-drift path. No SPEC conflict.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. This is a read-only verification audit; no code changes anticipated going in.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Verdict: Proceed, no significant scope deviation → skip 🛠️. Full read of `checkAdopter` confirms the three children compose exactly as each one's own Discovery/Implementation notes describe — 459.3 inserted its reverse-drift gate between the `current === latest` block and 459.2's detached-HEAD gate (459.3 landed after 459.2, per its own notes), and 459.4's missing-pinned-tag gate sits after the pinned-ahead guard and before `tagsInRange`, exactly as designed. No implementation work needed; proceeding straight to verification (test suite + doc-drift sweep) in Phase 2/3.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, no code changed; audit-only task.

- [x] **Minimal refactor gate** — N/A, nothing to refactor. Verified 459.3's helper extraction (`recordedGitlinkSha`/`canonicalTagSha`) is reused cleanly by both `gitlinkDrift` and the reverse-drift/missing-tag gates — no duplicate `rev-parse` lookups anywhere in `checkAdopter`.

- [x] Implemented the minimal solution — N/A, no implementation needed; this task's deliverable is verification + findings, not code.

- [x] Updated/added tests for non-trivial behavior — N/A, no new behavior introduced.

**Implementation Notes:** No code changes. Confirmed via full read of `checkAdopter` (tools/update-adopters.mjs:437-534) that the three children's gates compose as a coherent, non-overlapping chain with no leftover duplication.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 37/37 pass (matches CORE-459.4's closing count exactly — no regressions across the combined epic).

- [x] Ran lint/type-check on changed code — N/A, no code changed this task. `node --check` on both files (unchanged from prior verification) — syntax OK.

- [x] **Quality assertions** — full-suite read confirms no duplication (shared helpers), no dead code, no unexplained complexity, no public-surface growth beyond the `reason` string additions each child already made, and no stale code-facing documentation — the header comment (lines 23-57) already names all four gates and both drift directions accurately.

- [x] (frontend) N/A — no UI surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:** `node --test tools/update-adopters.test.mjs` → tests 37, suites 12, pass 37, fail 0, cancelled 0, skipped 0, duration ~28.4s. All three CORE-459 fixture tests present and distinctly named: `drift: committed gitlink already at latest, worktree behind (CORE-459.3)` (line 283), `skip: detached HEAD in adopter repo (CORE-459.2)` (line 311), `skip: pinned tag not found locally (missing-pinned-tag, CORE-459.4)` (line 350). No overlap between fixtures.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked all 15 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (line 271's `tools/` description already accurate)
  - `AGENTS.md` — no change (lines 36, 58-60's `tools/` layout + validation commands already accurate)
  - `SPEC.md` — no change (line 63 + 1009's carve-out description already accurate)
  - `docs/MIGRATION.md` — no change (line 222, 501's high-level `tools/update-adopters.mjs` descriptions already accurate; neither names internal guard behavior)
  - `claude/AGENTS-snippet.md` — no change (no `tools/`/adopter-bump content)
  - `codex/AGENTS-snippet.md` — no change (no `tools/`/adopter-bump content)
  - `cursor/AGENTS-snippet.md` — no change (no `tools/`/adopter-bump content)
  - `grok/AGENTS-snippet.md` — no change (no `tools/`/adopter-bump content)
  - `docs/CONVENTIONS.md` — no change (line 54's CI command list already accurate — no new commands added)
  - `CONTRIBUTING.md` — no change (no `tools/`/adopter-bump content)
  - `SECURITY.md` — no change (no `tools/`/adopter-bump content)
  - `docs/AGENT-NEUTRALITY.md` — no change (no `tools/`/adopter-bump content)
  - `docs/PLATFORMS.md` — no change (no `tools/`/adopter-bump content)
  - `claude/CAPABILITIES.md` — no change (no `tools/`/adopter-bump content)
  - `docs/AGENT-COMPAT.md` — no change (no `tools/`/adopter-bump content)
  - `docs/EXTERNAL-AGENTS.md` — no change (no `tools/`/adopter-bump content)
  - `docs/WORKTREES.md` — no change (no `tools/`/adopter-bump content)

  The internal guard-chain detail (detached-HEAD, both drift directions, missing-pinned-tag) lives solely in `tools/update-adopters.mjs`'s own header comment, which each child (459.2/459.3/459.4) already kept current at its own closure — confirmed still accurate in Phase 1 above.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the still-active `CORE-EPIC-459` parent (per SPEC's child placement invariant — only `/ft-close-epic`, after separate parent-flip approval, moves the checked parent + full cohort to `## Completed`); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted (below).

**Final Summary:** Audit of the closed `CORE-EPIC-459` cohort (CORE-459.2 detached-HEAD gate, CORE-459.3 reverse gitlink-drift guard, CORE-459.4 missing-pinned-tag guard). No code changes — this is a verification-only audit. Read `checkAdopter` end-to-end (tools/update-adopters.mjs:437-534) and confirmed the four gates compose as a coherent, non-overlapping chain in the order: `current === latest` (+ forward `gitlinkDrift`) → reverse gitlink-drift (459.3) → detached-HEAD (459.2) → pinned-ahead → missing-pinned-tag (459.4) → migration-bearing → staged-changes → dirty-worktree → `bump`. Confirmed 459.3's `recordedGitlinkSha`/`canonicalTagSha` helper extraction is reused cleanly by both the forward and reverse drift checks and by 459.4's guard, with no duplicate `rev-parse` lookups anywhere in the function. Ran the full suite: `node --test tools/update-adopters.test.mjs` → 37/37 pass, matching CORE-459.4's closing count exactly (no regressions across the combined three-child epic). Doc-drift sweep across all 15 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries: no change needed anywhere — none of them describe `checkAdopter`'s internal guard behavior, which lives solely in the script's own header comment (already kept current by each child at its own closure). **Findings: none.** The epic's three findings (#1, #3, #4) are fully and correctly implemented with no integration gaps, no dead code, and no doc drift.

**Archived:** 2026-08-21
