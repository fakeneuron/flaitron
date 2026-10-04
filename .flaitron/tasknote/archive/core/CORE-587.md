---
title: ft-task-sop-receipt-park-fix
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-557, CORE-565.2]
touches:
  - SPEC/procedures/ft-task.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-587 | ft-task-sop-receipt-park-fix

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-557]] [[CORE-565.2]]

## 🎯 Goal

Re-sync `SPEC/procedures/ft-task.md` (the agent-neutral SOP) with CORE-557's Verification-receipt box and CORE-565.2's park-reason resume-clear fix, mirroring whichever is actually missing.

## ✅ Acceptance

- [x] SOP's Phase 1 Discovery checklist names the Acceptance verify-command imperative — `grep -q 'verify command' SPEC/procedures/ft-task.md`
- [x] SOP's Phase 3 bullet names the **Verification receipt** box — `grep -q 'Verification receipt' SPEC/procedures/ft-task.md`
- [x] SOP's `status: blocked` resume branch still correctly reflects that resume clears `park-reason:` (already present via citation to `SPEC/blocked.md`; verified, not regressed) — `grep -q 'clears .park-reason' SPEC/procedures/ft-task.md`
- [x] `last-verified:` stamp bumped to reflect this re-check — `grep -q 'last-verified: v5.27.0' SPEC/procedures/ft-task.md`
- [x] No SPEC contract misquoted by the mirrored wording — `judgment` (diffed against `SPEC.md` §"🧪 Phase 3" and §"Tasknote body shape" verbatim; matches)
- [x] Markdown renders correctly on GitHub — `judgment`; diff read, list nesting and bold markers intact

## 🧩 Subtasks

- [x] Add a Step 4 (Phase 1 Discovery) bullet mirroring the Acceptance verify-command imperative, before the existing Subtasks-population bullet
- [x] Rewrite the Step 5 Phase 3 bullet to name the **Verification receipt** box and the `command → exit code` recording, folding in (not replacing) the existing structural-quality-assertions half
- [x] Confirm the `status: blocked` resume branch and the unattended-mode primitives paragraph already correctly state that resume clears `park-reason:` (per `SPEC/blocked.md` §"Exit (resume)") — no edit expected, verify only
- [x] Bump `last-verified:` frontmatter stamp to `v5.27.0 · 2026-09-12`
- [x] Run the Acceptance verify commands and record the receipt in Testing Notes

## 🔗 Related

- [[CORE-557]] — introduced the **Verification receipt** box + verify-command rule into `SPEC.md` / template / the three Claude SKILL restatements, but its own Discovery Notes concluded (incorrectly, per this task's drift check) that the neutral SOP "needed no edit" because it merely delegates to `SPEC.md`
- [[CORE-565.2]] — fixed `claude/skills/ft-task/step-3c-resume-blocked.md` to clear `park-reason:` on resume (it had no citation to `SPEC/blocked.md` at all); the neutral SOP already cited `SPEC/blocked.md` at the equivalent branch and was not affected by that bug

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both named surfaces (CORE-557, CORE-565.2) are real and archived; the PLAN line correctly hedges with "re-check" rather than asserting both are missing — the drift check below found only one of the two actually missing from `SPEC/procedures/ft-task.md`. Scope unchanged; this task fixes the real gap and records the other as already-satisfied rather than re-scoping the line.

- [x] Read relevant source files — `SPEC/procedures/ft-task.md` in full; `claude/skills/ft-task/SKILL.md` Step 4 + Step 5 Phase 3; `SPEC.md` §"🧪 Phase 3" and §"Tasknote body shape"; `claude/skills/ft-task/step-3c-resume-blocked.md`; `SPEC/blocked.md` §"Exit (resume)"; archived `.flowtron/tasknote/archive/core/CORE-557.md` and `CORE-565.2.md` in full

- [x] **Best Practices Review** — markdown contract restatement work, no module boundaries. The governing shape (per CORE-557/CORE-565.2's own pattern surveys) is **canon-plus-restatement**: `SPEC.md` states a rule once, each runner (Claude skills + this neutral SOP) restates it in its own register. The SOP's Phase 3 bullet had drifted into restating the *old* pre-CORE-557 shape (structural checks only) instead of citing or mirroring the new folded box — extending the existing restatement to match canon is the pattern-survey answer, not inventing a new shape.

- [x] **Archive skim** — `grep -l 'Verification receipt\|park-reason' .flowtron/tasknote/archive/core/*.md` returns exactly the two named tasknotes plus a handful of unrelated hits that merely fill their own Phase 3 box (same pattern CORE-557 found). Read both named notes directly (no probe needed, under the ~3-note threshold for the load-bearing ones). Findings folded into the Drift check below.

- [x] **Drift check** — **Finding 1 (real gap, CORE-557 side):** `SPEC/procedures/ft-task.md` Step 4's Discovery checklist never gained the Acceptance verify-command imperative (`claude/skills/ft-task/SKILL.md` Step 4 has it; the SOP does not — confirmed by `grep -c 'verify command' SPEC/procedures/ft-task.md` → 0 before this task). Step 5's Phase 3 bullet also never gained the **Verification receipt** box name or the `command → exit code` recording — it still only restates the *old* structural-quality-assertions half (dead code / duplication / complexity / public-surface / stale docs), which is exactly Box 3's "folded half" per CORE-557, minus the verify-command half CORE-557 added. This contradicts CORE-557's own Implementation Notes, which claimed "`SPEC/procedures/ft-task.md` L370 already delegates Phase 3 to `SPEC.md` rather than restating it, so the agent-neutral SOP needed no edit" — that claim was wrong: the SOP *does* restate (not merely cite) the structural half, and that restatement silently went stale. **Finding 2 (no gap, CORE-565.2 side):** the SOP's `status: blocked` resume branch (Step 3) already cites `SPEC/blocked.md` and requires naming the `park-reason:` being cleared in prose (added 2026-09-06 by CORE-526, predating both fixes); separately, the unattended-mode primitives paragraph already states in prose that "Resume is the ordinary blocked path in `SPEC/blocked.md`, which also clears `park-reason:`." `git show 4533bd8 -- SPEC/procedures/ft-task.md` (the CORE-565.2 commit) is empty — it never touched this file, confirming the fix landed only in the Claude-specific fragment `step-3c-resume-blocked.md` (which had *no* citation to `blocked.md` at all — the actual bug). The neutral SOP was never bugged in that way; no edit needed there. Neither finding contradicts a SPEC contract or the PLAN.md line — the line's "re-check" framing anticipated exactly this outcome.

- [x] Asked clarifying questions — none needed; logged below.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the one path this task expects to edit.

**Discovery Notes:**

**No clarifications needed.** Assumptions carried into Phase 2: (1) the fix mirrors the *wording* already used in `claude/skills/ft-task/SKILL.md`'s Step 4/Step 5, adapted to the neutral SOP's agent-neutral register (no Claude-specific box/skill names), consistent with the canon-plus-restatement pattern both CORE-557 and CORE-565.2 extended; (2) the park-reason side needs no edit — this task records the verification, not a no-op skip, since the PLAN line explicitly asked to "re-check"; (3) `last-verified:` is bumped to `v5.27.0 · 2026-09-12` (current release · today) per `SPEC/procedures/README.md` §"Flagged at release, never bumped by it" — this is exactly the "SOP re-checked against its watched surfaces" event that field exists to record.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing canon-plus-restatement pattern: `SPEC.md` states the rule once, `claude/skills/ft-task/SKILL.md` already restates it for Claude, and this SOP's Step 4/Step 5 now restate it in the same agent-neutral register the rest of the file uses. No new shape.

- [x] **Minimal refactor gate** — no refactor; two additive/rewritten bullets plus a frontmatter stamp bump, each tracing to a named Acceptance criterion. The `last-verified:` bump is not a refactor but a required consequence of a re-check event per `SPEC/procedures/README.md`.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown contract change; no code surface

**Implementation Notes:**

**What landed (one file, +11/−6 lines, `SPEC/procedures/ft-task.md`):**

- Frontmatter `last-verified:` bumped `v5.25.0 · 2026-09-08` → `v5.27.0 · 2026-09-12`.
- Step 4 (Phase 1 Discovery) gained a **Populate ✅ Acceptance** bullet, inserted before the existing Subtasks-population bullet, mirroring `claude/skills/ft-task/SKILL.md` Step 4's verify-command imperative in the SOP's own citation style.
- Step 5's Phase 3 bullet now names the **Verification receipt** and requires recording each Acceptance verify command as `command → exit code` (first failure line when non-zero) *folded together with* the existing structural-quality-assertions half — the existing sentence was kept verbatim rather than replaced, since it is still the correct restatement of the folded box's other half.

**Not touched, on purpose.** The `status: blocked` resume branch (Step 3) and the unattended-mode primitives paragraph — both already correctly state/delegate that resume clears `park-reason:` (verified in Discovery, Finding 2). `docs/CONTEXT-BUDGET.md`'s `procedures/ft-task.md` 33,141 figure — that ledger is `/ft-release`-owned (CORE-557 precedent); this task's edit brings the file to 33,711 (+570), read but not re-ledgered here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown-only change; no `viz/` or `tools/` surface touched

- [x] Ran lint/type-check on changed code — N/A; substituted `git diff --check` (whitespace) and the Acceptance grep receipt below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt:**

```text
grep -q 'verify command' SPEC/procedures/ft-task.md         -> 0
grep -q 'Verification receipt' SPEC/procedures/ft-task.md   -> 0
grep -q 'clears .park-reason' SPEC/procedures/ft-task.md    -> 0
grep -q 'last-verified: v5.27.0' SPEC/procedures/ft-task.md -> 0
git diff --check                                            -> 0
```

No non-zero exits, so no failure lines to record.

**Structural quality assertions (changed prose):** no duplication introduced — the new Acceptance bullet is a single new citation, and the Phase 3 bullet extends rather than duplicates the existing structural-checks sentence. No dead text: the old wording that was replaced (the lead-in clause before "For changed code, confirm...") is fully superseded, not left dangling — confirmed by reading the diff hunk. No unexplained complexity. No public-surface growth: no new heading, box, phase, or gate — the two edits sit inside existing Step 4 / Step 5 bullets. No stale code-facing documentation: this task's whole purpose is removing exactly that staleness, and the sweep below confirms no other doc restates the old wording.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `SPEC/procedures/ft-task.md` sits **outside** the sweep set by design (`.flowtron/tasknote/README.md` §"AI-referenced docs": `SPEC/*.md` excluded, a volume decision). Walked all 18 swept entries via `grep -l` for the exact strings this task touched (`Verification receipt`, `park-reason.*clear`, `ft-task.md`) — `README.md` · `docs/MIGRATION.md` · `docs/PLATFORMS.md` · `docs/AGENT-COMPAT.md` · `claude/AGENTS-snippet.md` · `docs/AGENT-NEUTRALITY.md` · `claude/CAPABILITIES.md` · `SPEC.md` all mention `ft-task.md` or the `Verification receipt` box, but read in context each is either a filename/pointer reference (symlink paths, procedure-pointer rows) or a citation of the primitives table / `--debug`/`--fast` naming — none restates the Step 4/Step 5 content this task edited. `AGENTS.md` · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-COMPAT.md` (already covered) · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` · `docs/VISION.md` — **no change**, no hits. **18/18, no drift.**

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:** Re-checked `SPEC/procedures/ft-task.md` against CORE-557 and CORE-565.2, and found only one of the two actually missing — CORE-557's own Discovery Notes had wrongly concluded the neutral SOP "needed no edit" because it merely delegates Phase 3 to `SPEC.md`; in fact it restates the *old*, pre-CORE-557 structural-only half and had silently gone stale. Fixed: Step 4's Discovery checklist now names the Acceptance verify-command imperative, and Step 5's Phase 3 bullet now names the **Verification receipt** box and the `command → exit code` recording, folded together with the existing structural-quality-assertions sentence (kept, not replaced). CORE-565.2's park-reason fix, by contrast, was never missing here — the neutral SOP already cited `SPEC/blocked.md` at the `status: blocked` resume branch and already states in its unattended-mode paragraph that resume "clears `park-reason:`"; the actual CORE-565.2 bug (no citation at all) was isolated to the Claude-only fragment `step-3c-resume-blocked.md`, confirmed by `git show` on that commit touching no file under `SPEC/procedures/`.

One file, +11/−6 lines: `SPEC/procedures/ft-task.md` (two Step 4/Step 5 bullet edits plus the `last-verified:` stamp bump to `v5.27.0 · 2026-09-12`). Verification: 5/5 grep receipts exit 0, `git diff --check` clean, no non-zero exits. `N/A` on targeted tests/lint (markdown-only) and on 👁️ (no frontend surface). Doc-drift sweep: 18/18 no change — `SPEC/procedures/ft-task.md` sits outside the swept set by design, and no swept doc restates the edited content. `touches:` reconciliation: declared one path (`SPEC/procedures/ft-task.md`); `git diff --name-only` shows exactly that plus this tasknote and `.flowtron/PLAN.md`, the two closure artifacts every task writes — no undeclared paths. Refactors: none made, none deferred. Maintainability effect: a contract-only agent (Codex/Grok without skill machinery) now gets the same Acceptance verify-command discipline and Verification-receipt shape a Claude Code run already gets, closing the drift CORE-557 introduced without noticing; the park-reason side is now documented as verified-correct rather than left an open question the next auditor would re-litigate.

**Archived:** 2026-09-12
