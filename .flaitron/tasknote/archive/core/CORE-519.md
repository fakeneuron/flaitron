---
title: ft-update self-host wiring + phase-skip doc reconcile
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: []
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

# CORE-519 | ft-update self-host wiring + phase-skip doc reconcile

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Decide whether `/ft-update` should stay wired in flowtron's own `.claude/`, and reconcile the phase-skip wording divergence between `AGENTS.md` and `claude/AGENTS-snippet.md` so both point at `SPEC/tasknote-selection.md`.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md` §"Installed-surface policy" explicitly names `/ft-update` in the self-host full-mirror sentence, closing the "is this a wiring miss?" question for future readers
- [x] `AGENTS.md` and `claude/AGENTS-snippet.md`'s "Do not skip phases" sentences say the same thing and both point at `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)"
- [x] A `KEEP IN SYNC` comment pair (matching the CORE-516 precedent already in both files) guards the two phase-skip sentences against future redrift

## 🧩 Subtasks

- [x] Edit `docs/PLATFORMS.md` to name `/ft-update` alongside `/ft-release` in the "mirrors the full shipped inventory" sentence
- [x] Reword `AGENTS.md`'s phase-skip sentence to separate "skip a phase mid-tasknote" (never) from "skip the tasknote entirely" (decided by SPEC/tasknote-selection.md), add KEEP IN SYNC comment
- [x] Reword `claude/AGENTS-snippet.md`'s phase-skip sentence the same way, add matching KEEP IN SYNC comment
- [x] Verify no CI/test/grep depends on the old exact wording

## 🔗 Related

_None._

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both halves of the task are still live and unaddressed in the current codebase; nothing upstream has resolved them since filing.

- [x] Read relevant source files — read `SPEC.md` (Skill namespace, Installed-surface policy pointer), `docs/PLATFORMS.md` §"Installed-surface policy" in full, `claude/skills/ft-update/SKILL.md` (guard + adopter-only rationale), `AGENTS.md` (self-host roster + phase-skip sentence), `claude/AGENTS-snippet.md` (adopter paste block + phase-skip sentence), `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)", and `.claude/skills/` self-host symlink listing.

- [x] **Best Practices Review** — this is a two-site prose reconciliation, not a code change. The existing `KEEP IN SYNC` HTML-comment convention (already used in both `AGENTS.md` and `claude/AGENTS-snippet.md` for the CORE-516 `[model]`-field mirror and the roster mirror) is the established pattern for guarding small prose mirrors between these two exact files; reused verbatim rather than inventing a new mechanism or a formal `step-7.1-mirror-pairs.md` "Pair" check (that machinery guards release-blocking structural mirrors — flag rosters, template counts — not a two-sentence prose pair, and neither of the two precedent mirrors in these files has a Pair entry either).

- [x] **Archive skim** — `grep -l "Installed-surface policy"` across `.flowtron/tasknote/archive/core/` returned 23 hits (CORE-349.2, CORE-352.3/.N, CORE-356, CORE-389.4, CORE-392, CORE-410.2/.3/.4/.N, CORE-420.3, CORE-427, CORE-438.1/.3, CORE-439, CORE-443, CORE-449, CORE-451, CORE-460.4, CORE-463.5, CORE-465, CORE-486, CORE-507) — confirms the policy section is mature, frequently touched, and load-bearing; no need to re-read all 23, since the live text of `docs/PLATFORMS.md` (read in full above) already states the governing rule directly. `grep -n "Do not skip phases"` across the whole repo returned exactly the two sites named in the PLAN.md line, plus the PLAN.md line itself — confirms no third mirror and no automated check enforces the old wording (see Drift check below).

- [x] **Drift check** — `docs/PLATFORMS.md:86-92` ("Flowtron's own checkout is not an adopter... mirror the full shipped inventory one-for-one — including the global-only utilities and `ft-release`... A shipped `ft-*` slug with no `.claude/` symlink is a wiring miss, not a policy choice") is current and matches the live `.claude/skills/` listing (21 symlinks, one per shipped `ft-*` skill, `ft-update` included, dated 2026-06-06 — predates this ticket, so it was already deliberately wired, not accidentally). The PLAN.md line's framing ("guaranteed to no-op ... the one repo where `/ft-release` is the real verb") is accurate as a description of *behavior* but the policy already answers the "should it stay wired" question: yes — removing it would itself become "a shipped `ft-*` slug with no `.claude/` symlink," i.e. the exact wiring-miss class the same paragraph names. The paragraph just doesn't yet *say ft-update by name*, unlike `ft-release`, which is why a reader (the audit) could reasonably re-ask the question. `AGENTS.md:38-40` and `claude/AGENTS-snippet.md:28` were re-read at their cited locations and match the PLAN.md line's quotes exactly — no drift in the citation itself, only the substantive divergence the ticket describes. `grep -n "Do not skip phases"` (Archive skim step) confirms no CI check, no `tools/update-adopters.*`, and no other `step-7.1-mirror-pairs.md` Pair references either sentence, so this edit carries no cross-surface fallout beyond the two sites and the new KEEP IN SYNC comments.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) the "decide" half resolves to *keep wired*, per the already-documented, deliberate Installed-surface policy — the fix is to make that policy name `ft-update` explicitly so a future reader doesn't re-raise the question, not to unwire it; (2) "reconcile ... by pointing both at `SPEC/tasknote-selection.md`" means both sentences state the same claim (skip-phases-never vs. skip-the-tasknote-entirely is a separate, already-documented decision) and both cite that SPEC module, not that the SPEC module itself needs new content — it already carries the exact threshold list.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

`docs/PLATFORMS.md` §"Installed-surface policy" is the authoritative answer to the first half of this ticket: flowtron's own checkout mirrors the *full* shipped `ft-*` inventory one-for-one, by design, specifically so nothing shipped goes unrunnable in the repo that dogfoods it (the doc cites `/ft-spec` sitting unrunnable for a month as the failure mode this guards against). `/ft-update` is part of the "adopter-installed subset," which is part of the shipped inventory, so it is already covered by that rule — but the rule's own sentence names only `ft-release` and "the global-only utilities" as examples, not `ft-update`, which is why the wiring reads as an unexplained anomaly to a fresh audit pass even though it's intentional. Naming it explicitly closes that gap without changing behavior.

The phase-skip divergence is a wording bug, not a substance bug: `AGENTS.md`'s "unless the user explicitly asks for a small direct change" and `claude/AGENTS-snippet.md`'s flat "Do not skip phases" are each partially right — phases inside an *opened* tasknote are never skipped in either file's intent, and whether to open a tasknote at all is a separate, already-specified decision (`SPEC/tasknote-selection.md` §"When to use a tasknote and when not to" — single-line typos, pure formatting, <10-line doc patches, trivial config edits). Rewording both sentences to state that split explicitly, and to cite the SPEC module instead of restating (or omitting) the threshold, removes the divergence and matches the "since CORE-510 names the skills and points there" precedent already set for the neighboring roster bullet in the same files.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — reused the existing `KEEP IN SYNC` HTML-comment convention verbatim (see CORE-516 precedent in both files) rather than inventing a new mirror mechanism or a formal release-gate Pair; no new abstraction needed for a two-sentence prose pair.

- [x] **Minimal refactor gate** — no refactor; this is a three-file prose edit (`docs/PLATFORMS.md`, `AGENTS.md`, `claude/AGENTS-snippet.md`). N/A beyond the pattern reuse noted above.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc change, no code or parseable-grammar surface touched.

**Implementation Notes:**

- `docs/PLATFORMS.md` §"Installed-surface policy": extended the "mirror the full shipped inventory one-for-one — including the global-only utilities and `ft-release`" sentence to also name `/ft-update`, with a short parenthetical explaining it bails immediately here by design (a no-op *wiring miss* would be its absence, not its presence).
- `AGENTS.md`: reworded the "Do not skip phases unless the user explicitly asks for a small direct change" sentence to "Do not skip phases once a tasknote is open — whether a change needs a tasknote at all is decided by `SPEC/tasknote-selection.md` §…", and added a `KEEP IN SYNC (CORE-519)` comment pointing at `claude/AGENTS-snippet.md`.
- `claude/AGENTS-snippet.md`: reworded the matching bullet's "Do not skip phases." clause the same way (adopter-relative path `.flowtron/core/SPEC/tasknote-selection.md`), and added the mirrored `KEEP IN SYNC (CORE-519)` comment alongside the existing CORE-516 one, inside the fence — matching where the CORE-516 comment already lives.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only doc change, no test surface
- [x] Ran lint/type-check on changed code — N/A, no code changed
- [x] **Quality assertions** — no duplication introduced (the two `KEEP IN SYNC` comments are the intentional cross-reference pattern, matching the CORE-516 precedent already in both files); no dead code; no unexplained complexity; verified no stale reference to the old wording remains (`grep` for the retired phrase returned nothing) and both new sentences cite the same SPEC section; `.editorconfig` compliance checked (no trailing whitespace, final newline present, LF endings) on all three touched files
- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface touched

**Testing Notes:**

- `grep -rn "unless the user explicitly asks for a small direct change\|Do not skip phases\.\`" AGENTS.md claude/AGENTS-snippet.md` → no hits (old wording fully retired)
- `grep -n 'tasknote-selection.md.*When to use a tasknote' AGENTS.md claude/AGENTS-snippet.md` → one hit each, both citing the same section
- `grep -n "ft-update" docs/PLATFORMS.md` → confirms the new mention lands in the "Flowtron's own checkout is not an adopter" full-mirror sentence (line 90) alongside the existing mentions elsewhere in the file
- `grep -c "KEEP IN SYNC (CORE-519)"` → exactly 1 in each of `AGENTS.md` and `claude/AGENTS-snippet.md`
- `git diff --stat` → 3 files changed, 13 insertions, 6 deletions; no unrelated lines touched

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs": `AGENTS.md`, `claude/AGENTS-snippet.md`, and `docs/PLATFORMS.md` are all covered surfaces; this task *is* the currency update for the specific sentences it targeted, so no further drift beyond what's fixed here. No other AI-referenced doc restates the phase-skip sentence or the self-host mirror-inventory sentence (confirmed by the repo-wide `grep` for "Do not skip phases" in Discovery, which returned only the two sites now fixed).
- [x] Closed — every Acceptance criterion above ticked. YAML `status:` flipped to `completed` below. PLAN.md line to be flipped to stub form and moved to `## Completed` in this same commit.
- [x] **Evidence-based recap** drafted (see Final Summary)

**Final Summary:**

Reconciled two small, related doc-consistency gaps surfaced by the 2026-08-30 audit-context pass. First, `docs/PLATFORMS.md` §"Installed-surface policy" already documented — deliberately — that flowtron's self-host `.claude/` mirrors its *full* shipped `ft-*` inventory one-for-one, including skills that don't functionally apply here; that sentence named `ft-release` and "the global-only utilities" as examples but not `ft-update`, so a fresh reader could reasonably re-ask whether `/ft-update` (adopter-only, guaranteed to bail in flowtron-self) should stay wired. Named it explicitly in that sentence (`docs/PLATFORMS.md:90`) — decision: **keep it wired**, since removing it would itself create the "wiring miss" the same paragraph warns against; no `.claude/` symlink changes needed, the wiring was already correct. Second, `AGENTS.md:44-45` and `claude/AGENTS-snippet.md:28` diverged on when tasknote phases can be skipped — one carried an unqualified exception clause, the other a flat prohibition. Reworded both to the same claim (phases are never skipped once a tasknote is open; whether a tasknote is needed at all is a separate, already-specified decision) and pointed both at `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)", following the CORE-510 precedent of pointing at the SPEC module instead of restating its thresholds. Added a `KEEP IN SYNC (CORE-519)` comment pair in both files, matching the existing CORE-516 convention, to guard against the same divergence recurring.

Files touched: `docs/PLATFORMS.md` (+9/-4 net, 1 sentence extended), `AGENTS.md` (+7/-1, 1 sentence reworded + 1 comment added), `claude/AGENTS-snippet.md` (+3/-1, 1 sentence reworded + 1 comment added). No code changed; no tests apply. Documentation verdict: closes the drift this ticket was filed against, no residual doc debt identified. Maintainability effect: the two phase-skip sentences are now guarded against silent redrift the same way the neighboring `[model]`-field sentence already is, and the self-host wiring policy no longer has to be re-derived by a reader (or a future audit) each time `/ft-update`'s no-op-in-self-host behavior draws attention.

**Archived:** 2026-08-30
