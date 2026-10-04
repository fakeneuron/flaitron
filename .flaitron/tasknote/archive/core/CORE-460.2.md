---
title: command-stub `--high` + Pair F widening
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-460, CORE-399, CORE-433.2, CORE-422]
touches:
  - claude/commands/ft-starter-task.md
  - claude/commands/ft-epic-discovery.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-460.2 | command-stub `--high` + Pair F widening

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-460]] · [[CORE-399]] · [[CORE-433.2]] · [[CORE-422]]

## 🎯 Goal

Close the park-priority flag drift in the two stale `claude/commands/*.md`
stubs and widen `/ft-release` §7.1 Pair F so the command-stub layer is
gated rather than fixed by hand a fourth time.

## ✅ Acceptance

- [x] `claude/commands/ft-starter-task.md` and `claude/commands/ft-epic-discovery.md` name all four park-priority flags (`--low|--med|--fut|--high`) in their see-also sentences
- [x] Pair F gains a command-stub half globbing `claude/commands/*.md`: any stub mentioning `--park` that names at least one priority flag must name all four; a bare `--park` mention with no roster (`ft-spec.md`) is exempt by design and the prose says so
- [x] Pair E's "one-directional on purpose" bullet reads four flags (`--low`/`--med`/`--fut`/`--high`) and "those four", matching `claude/skills/ft-flowtron/SKILL.md`'s actual row
- [x] Both Pair F halves and both Pair E halves print nothing / exit 0 at HEAD after the edits
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — per-entry verdict

## 🧩 Subtasks

- [x] Add `--high` to `claude/commands/ft-starter-task.md`'s park see-also
- [x] Add `--high` to `claude/commands/ft-epic-discovery.md`'s park see-also
- [x] Fix Pair E's flag-half bullet: three → four flags
- [x] Widen Pair F with a command-stub half (prose + check fence + exemption note)
- [x] Run Pair E (both halves) + Pair F (both halves) — all clean
- [x] Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-460]] — parent epic: platform-parity gate widening
- [[CORE-399]] — added `--high` and updated the surfaces it named; the two command stubs were not among them (root cause of this drift)
- [[CORE-433.2]] — fixed four park mirrors by hand after CORE-399; scoped itself to the five named sites and deliberately left codex/command mirrors untouched
- [[CORE-422]] — minted Pair E and its "those three" one-directional rationale

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three drift sites confirmed live at HEAD by grep; the fix is
  mechanical and the gate widening is the epic's stated purpose.

- [x] Read relevant source files — `claude/commands/*.md` (all `--park` hits), `claude/skills/ft-release/SKILL.md` §7.1 Pairs E–H, `claude/skills/ft-flowtron/SKILL.md:48`, `claude/skills/ft-file-followup/SKILL.md`, and the five existing Pair F mirrors

- [x] **Best Practices Review** — no code changes; markdown contract surfaces only. The
  established shape for a §7.1 pair with two coverage angles is a **two-half** pair
  (Pair E: row + flag; Pair H: presence + verbatim). Widening Pair F as a second half
  rather than editing the existing five-mirror fence preserves the working check and
  matches the section's own idiom. No refactor required; no deferred cleanup.

- [x] **Archive skim** — grepped `archive/core/` for `Pair F` / `Pair E` / `claude/commands` / `--low`:
  - `CORE-399.md:24` — added `--high`; its own pattern-survey line enumerates the sites it touched (`ft-file-followup` `argument-hint`, `claude/AGENTS-snippet.md`). The two command stubs are absent from that list — this is where the drift entered.
  - `CORE-433.2.md:72` — fixed 5 named sites, explicitly assumed "do not touch … codex mirrors (not named)". Same scoping decision left `claude/commands/*.md` out.
  - `CORE-422.md:80,226` — minted Pair E; wrote the "those three" language. Its claim was accurate for the roster as CORE-422 read it; the live `ft-flowtron` row now carries four. **No ⚠️ Superseded pointer written** — this task does not falsify CORE-422; CORE-399/CORE-433.2 moved the roster underneath it, which is the spec-evolution case the write-once carve-out explicitly excludes.
  - `CORE-443.md:190` — records Pair F as absorbed after CORE-441 stripped AGENTS.md flags.
  - `CORE-433.N.md:93` / `CORE-440.md:23` — both verified the 5 park mirrors clean at their HEADs, confirming the existing half works and the gap is strictly the command-stub layer.

- [x] **Drift check** — every claim in the PLAN line verified against HEAD:
  - `claude/commands/ft-starter-task.md:8` → `--park [--low|--med|--fut]` (stale) ✓
  - `claude/commands/ft-epic-discovery.md:12` → `--park [--low|--med|--fut]` (stale) ✓
  - `claude/skills/ft-release/SKILL.md:449` → "carries `--low`/`--med`/`--fut`" + "those three" (stale) ✓
  - `claude/commands/ft-file-followup.md` already carries all four (lines 3, 8) — not a target.
  - `claude/commands/ft-spec.md:13` mentions `--park` with **no** flag roster — correct as-is; the widened check must exempt it or it mints a false positive on its first run.
  - `docs/VERSION-HISTORY.md:109` lists three flags — a historical changelog entry for the release where only three existed. Correctly historical; out of scope.
  - No pair-count statement exists in §7.1 to update ("four such pairs" at line 377 is a CORE-EPIC-420 historical fact, not a roster count).
  - SPEC cross-check: `SPEC.md` §"Post-closure protocol" + §"Paper-complete guard" — workflow-only closure carve-out does **not** apply here (deliverables are real contract-layer files, staged with PLAN + archive in one commit).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. Pair F widens as a **second half** (Pair E / Pair H precedent), leaving the existing five-mirror fence byte-identical.
  2. The command-stub half self-selects on `--park` and skips stubs carrying no priority flag at all, so `ft-spec.md`'s bare mention stays legal.
  3. Codex / Cursor / Grok mirrors are out of scope — CORE-460.3 owns them.
  4. `docs/VERSION-HISTORY.md` is a historical record, never retro-patched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The drift class is narrow and repeating: `--high` was added by CORE-399, and each
subsequent by-hand fix (CORE-433.2, CORE-440, CORE-443) scoped itself to the sites
some earlier note had *named*. `claude/commands/*.md` was never named, so it has been
stale across three separate correction passes. Encoding it as a Pair F half is the
only thing that stops a fourth.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended §7.1's established **two-half pair** shape (Pair E: row + flag; Pair H: presence + verbatim) rather than editing Pair F's working five-mirror fence or minting a Pair I. The stub edits reuse each file's own see-also phrasing; per Pair F's own closing instruction, no mirror was normalized to a common string.

- [x] **Minimal refactor gate** — no refactor. Three surgical edits plus one appended check block; the existing Pair F fence is byte-identical.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the check fence **is** the test; negative-tested below rather than asserted.

**Implementation Notes:**

Four edits across three files:

1. `claude/commands/ft-starter-task.md:8` — `[--low|--med|--fut]` → `[--low|--med|--fut|--high]`
2. `claude/commands/ft-epic-discovery.md:12` — same one-token widening
3. `claude/skills/ft-release/SKILL.md:449` — Pair E's one-directional bullet: three flags → four, with the `--high` sub-case named (it appears in `/ft-file-followup`'s `description:` *not at all*, where the other three appear inside a stripped quote — different reasons, same exclusion)
4. `claude/skills/ft-release/SKILL.md` — new Pair F second half after the five-mirror fence: prose (why a glob and not a list), the check, and the exemption rationale

**Glob, not a list** is the deliberate choice. A named list is exactly what failed
here: CORE-399 named the surfaces it touched, and three later verification passes
re-checked that same list. `claude/commands/*.md` picks up a stub added next year
for free.

The `continue` guard carries the design: selection is on `--park`, but a stub with
**no** priority roster at all is skipped rather than failed. `ft-spec.md` legitimately
points at park mode in one clause without restating flags — without the guard this
check mints a false positive on its very first run, which is how a gate gets
"temporarily" commented out.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — all four §7.1 fences touching this work

- [x] Ran lint/type-check on changed code — `N/A`: markdown contract surfaces only; the repo's six validation commands cover `viz/` TS and `tools/*.mjs`, neither of which this task touches.

- [x] **Quality assertions** — no duplication (the new half deliberately does not restate the five-mirror list), no dead code, no public-surface growth (one check block inside an existing pair, no new pair letter, no pair-count statement to update), no stale code-facing docs (Pair E's flag count was the stale doc, and it is the thing this task fixed).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no UI surface.

**Testing Notes:**

Positive — all four fences clean at HEAD after the edits:

| Check | Result |
|---|---|
| Pair F half 1 (five mirrors) | no output |
| Pair F half 2 (command stubs) | no output |
| Pair E row coverage (`diff`) | no output, exit 0 |
| Pair E flag coverage | no output |

Negative — a gate that has never failed is unverified, so the new fence was run in a
scratch tree against all three stub shapes it must distinguish:

| Fixture | Shape | Expected | Actual |
|---|---|---|---|
| `ft-starter-task.md` | partial roster (the pre-fix shape) | fire | `MISSING PARK FLAG … --high` ✓ |
| `ft-spec.md` | bare `--park`, no roster | silent | silent ✓ |
| `ft-file-followup.md` | full four-flag roster | silent | silent ✓ |

The fence reproduces the exact drift this task fixed, and clears both legitimate shapes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":

  - `README.md` — no change (no park-flag roster)
  - `AGENTS.md` — no change; park parenthetical already carries all four (Pair F half 1 verified)
  - `SPEC.md` — no change; no §7.1 pair roster or count to sync
  - `docs/MIGRATION.md` — no change; retired-`ft-sidequest` cell already carries all four
  - `claude/AGENTS-snippet.md` — no change; park-mode clause already carries all four (CORE-399 updated it)
  - `codex/AGENTS-snippet.md` — no change **in scope**; codex flag parity is CORE-460.3's deliverable
  - `cursor/AGENTS-snippet.md` — no change in scope (CORE-460.3)
  - `grok/AGENTS-snippet.md` — no change in scope (CORE-460.3)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change; no new Claude-specific surface introduced
  - `docs/PLATFORMS.md` — no change in scope; its operator-flag list is CORE-460.3's deliverable
  - `claude/CAPABILITIES.md` — no change; row 33 already carries all four
  - `docs/AGENT-COMPAT.md` — no change in scope (CORE-460.3)
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change (`--worktree` is Pair G, untouched)

  Out-of-set but checked: `docs/VERSION-HISTORY.md:109` lists three flags — a
  historical changelog entry for the release predating `--high`. Correctly
  historical; deliberately not patched.

- [x] Closed

- [x] **Evidence-based recap** drafted

**Final Summary:**

Fixed the two `claude/commands/*.md` stubs that had been advertising a
three-flag park signature since `--high` shipped, and widened `/ft-release`
§7.1 Pair F with a globbed command-stub half so the layer is gated instead of
corrected by hand a fourth time.

**Changed:** 3 files, ~4 net lines of contract text plus a 7-line check fence —
`claude/commands/ft-starter-task.md` (1 token), `claude/commands/ft-epic-discovery.md`
(1 token), `claude/skills/ft-release/SKILL.md` (Pair E count fix + Pair F second half).

**Verification:** all four §7.1 fences (Pair E ×2, Pair F ×2) clean at HEAD; the new
fence additionally negative-tested in a scratch tree against three stub shapes —
fires on the pre-fix partial roster, silent on a bare `--park` mention and on a full
roster.

**Refactors:** none made, none deferred. The existing Pair F fence is untouched.

**Documentation:** 17-entry AI-referenced doc sweep, all "no change"; four entries
carry a "no change *in scope*" verdict naming CORE-460.3 as owner.

**Maintainability:** converts a three-times-repeated manual correction into a check
that covers a directory rather than a list — a stub added later is gated the day it
lands. The `continue` guard keeps a legitimate bare `--park` mention legal, which is
what keeps the gate from being disabled on its first false positive.

**Archived:** 2026-08-21
