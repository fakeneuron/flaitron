---
title: ft-update-fence-close-prose
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-930]
touches:
  - claude/skills/ft-update/SKILL.md
---

# CORE-939 | ft-update-fence-close-prose

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-930]]

## 🎯 Goal

`ft-update` Step 3.5's summary of when the paste fence closes matches `text.mjs` `fenceOpeners`: a backtick line at least as long as the opener closes it, not only a "same-length" one.

## ✅ Acceptance

- [x] The Step 3.5 prose no longer says "same-length" and states the at-least-as-long closer rule — `! grep -q 'same-length' claude/skills/ft-update/SKILL.md && grep -q 'at least as long' claude/skills/ft-update/SKILL.md`
- [x] Drift checks pass (context budget, final newline, section citations) — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Reword the clause at `claude/skills/ft-update/SKILL.md` Step 3.5 (lines ~205–206)
- [x] Run the two Acceptance commands

## 🔗 Related

- [[CORE-930]] — wrote the clause; its Final Summary records that a same-length backtick line closes the fence (the "longer also closes" half was left unstated)

---

## ⚡ Notes

Carried from the retired sidequest stub:

> **Idea** — `claude/skills/ft-update/SKILL.md` Step 3.5 says a "same-length" backtick line closes the paste fence, but `tools/update-adopters/text.mjs` `fenceOpeners` closes on any backtick run at least as long as the opener. An agent following the prose by hand would read a longer closer as body text. Reword the prose to "at least as long". Surfaced by CORE-920.4's External review.
>
> **Resume anchor** — CORE-920.4 Phase 3: External review notes being fixed or filed; next is the second park (reconciled_pin header claim), then Testing Notes and closure.

**Relevance:** Proceed — the prose understates the closer rule `fenceOpeners` implements (`m[1].length >= run.length`); a reader could think a longer backtick line stays body text.
**Archive skim:** CORE-930 (archive/core) wrote this clause and `cases.json`; its note pins "same-length closes" and the longer-outer-fence case, nothing contradicts a fix to "at least as long". The fixture `describes` already says "the first line of the opening character at least as long".
**Drift check:** PLAN line matches the code: `SKILL.md:205-206` says "a same-length backtick line ends it"; `text.mjs:34` closes on `m[1].length >= run.length`. No drift.
**Clarifications:** No clarifications needed. Assumption: only the SKILL.md summary changes; the fixture `describes` is already correct and the skill defers to it ("the case wins").
**Pattern survey:** Extended the clause in place; wording follows the fixture `describes` ("at least as long"), no new shape.
**Implementation:** `claude/skills/ft-update/SKILL.md` Step 3.5: "a same-length backtick line ends it" → "a backtick line at least as long as the opener ends it". Fixture `describes` and `text.mjs` left untouched (already correct). The sidequest stub was retired into this note (it surfaced late: the Step 1 `ls` check was masked by a zsh no-match glob, caught by `drift-checks.sh` `sidequest_orphan`; deletion staged so `pair_q`'s git-listed read passes pre-commit).
**Verification receipt:** `! grep -q 'same-length' claude/skills/ft-update/SKILL.md && grep -q 'at least as long' claude/skills/ft-update/SKILL.md` → 0 · `bash tools/drift-checks.sh` → 0 (after the stub retirement). No code changed.
**N/A:** Best Practices — one-clause prose edit, no code or abstraction touched · External review — the diff is one reworded clause, too small to grade against Acceptance · Docs — no change

**Final Summary:**

`ft-update` Step 3.5 now says a backtick line at least as long as the opener closes the paste fence, matching `fenceOpeners` (`m[1].length >= run.length`); the old "same-length" wording would have led a by-hand reader to treat a longer closer as body text. Changed: `claude/skills/ft-update/SKILL.md` (one clause). `touches:` reconciled — `git diff --name-only` matches the declared list plus the closure files (PLAN, sidequest stub deletion, this note).

**Archived:** 2026-11-24
