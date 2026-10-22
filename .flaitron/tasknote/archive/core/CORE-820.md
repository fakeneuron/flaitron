---
title: empty-plan-emoji
status: completed
tags: []
created: 2026-10-22
due:
related-tasks: [CORE-340]
touches:
  - SPEC/cue-vocabulary.md
  - SPEC/post-closure.md
  - docs/AGENT-COMPAT.md
---

# CORE-820 | empty-plan-emoji

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Give the "PLAN exhausted" terminal state a registered operator-cue glyph, define where it prints, and record it in `SPEC/cue-vocabulary.md`.

## ✅ Acceptance

- [x] `SPEC/cue-vocabulary.md` §"Next-task cues" registers 📭 `EMPTY` as the terminal next-move line — `grep -q '| 📭 | `EMPTY`' SPEC/cue-vocabulary.md`
- [x] `SPEC/post-closure.md` step 2's PLAN exhausted (terminal) form prints the 📭 `EMPTY` line — `grep -q '📭 EMPTY' SPEC/post-closure.md`
- [x] `docs/AGENT-COMPAT.md` non-render label roster includes `EMPTY` — `grep -q '`HERE`, `EMPTY`' docs/AGENT-COMPAT.md`
- [x] 📭 is used by no other cue/layer (uniqueness rule) — `grep -rl '📭' --include='*.md' . | grep -v tasknote` lists only the touched files
- [x] Context budgets and drift checks hold — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the 📭 `EMPTY` row to `SPEC/cue-vocabulary.md` §"Next-task cues" (+ a short shape note)
- [x] Name the 📭 line in `SPEC/post-closure.md` step 2 terminal form, within its 10,000-byte budget
- [x] Add `EMPTY` to the `docs/AGENT-COMPAT.md` label roster
- [x] Run drift checks

## 🔗 Related

- [[CORE-340]] — predecessor: added the PLAN exhausted (terminal) form this cue now marks

---

## ⚡ Notes

**Relevance:** Proceed — the PLAN exhausted (terminal) form (CORE-340) is the one next-move outcome with no glyph; every other next-move line carries 🔧/🧩/🧠/💎/🔭 or 👇.
**Best Practices Review:** The cue table in `SPEC/cue-vocabulary.md` is the single owner; `post-closure.md` emits from it; `AGENT-COMPAT.md` mirrors the label roster. Skills (`ft-task`, `ft-close-epic`, `procedures/ft-task.md`) cite the terminal form by reference, so they need no edit. No refactor.
**Archive skim:** CORE-340 (plan-exhausted-terminal-state) introduced the terminal form; no prior note proposed a glyph for it. Other cue-vocabulary hits (CORE-254.x, CORE-482.x, CORE-770.x) cover other cues.
**Drift check:** The PLAN line matches the code. Terminal form at `SPEC/post-closure.md:49`; Next-task cues table at `SPEC/cue-vocabulary.md:247`; label roster at `docs/AGENT-COMPAT.md:162`. 📭 unused anywhere. `post-closure.md` is 9,872 / 10,000 bytes, so the edit there must be near byte-neutral.
**Clarifications:** Operator picked 📭 `EMPTY` and transcript-only scope (viz "No tasks in this project" fires on a different condition, all sections incl. Completed empty; tying them is out of scope).
**Pattern survey:** Extended the §"Next-task cues" table with one row, plus a prose paragraph shaped like the 👇 `HERE` note beneath it; the AGENT-COMPAT roster gains one label. No new shape.
**Implementation:** `SPEC/cue-vocabulary.md` adds the 📭 `EMPTY` row and a paragraph defining its emission (`📭 EMPTY — PLAN.md holds no open work.`, once, replacing candidates + copy-paste line; plain, not bold, since it is a no-reply state marker). `SPEC/post-closure.md` step 2's terminal form now prints that line, swapped in for "State plainly that…" to stay inside the 10,000-byte budget (9,872 → 9,877). `docs/AGENT-COMPAT.md` label roster gains `EMPTY`. Skills cite the terminal form by reference, so they need no edits.
**Verification receipt:** cue-vocabulary row grep → 0; post-closure `📭 EMPTY` grep → 0; AGENT-COMPAT `` `HERE`, `EMPTY` `` grep → 0; `grep -rl '📭'` (non-tasknote) → only `SPEC/post-closure.md`, `SPEC/cue-vocabulary.md`; `bash tools/drift-checks.sh` → 0 (context_budget ok). No frontend change, so no 👁️ ask.
**External review:** N/A — 10-line, 3-file prose diff (one table row, one paragraph, two inline swaps); nothing for a code reviewer to grade beyond the greps above.
**Docs touched:** `SPEC/cue-vocabulary.md`, `SPEC/post-closure.md`, `docs/AGENT-COMPAT.md` (the deliverables). `docs/GLOSSARY.md` no change (it carries no per-glyph next-task entries). `SPEC.md`, `SPEC/procedures/ft-task.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-close-epic/SKILL.md` no change (they cite the terminal form by reference). Other AI-referenced docs no change. Learnings: N/A.

**Final Summary:** The PLAN exhausted (terminal) next-move form now has its own registered cue, 📭 `EMPTY`, printed as `📭 EMPTY — PLAN.md holds no open work.` in place of the candidate list and copy-paste line. It is registered in `SPEC/cue-vocabulary.md` §"Next-task cues", emitted from `SPEC/post-closure.md` step 2, and added to the `docs/AGENT-COMPAT.md` non-render label roster. Scope is transcript-only by operator choice (viz empty state untouched). `touches:` reconciliation: diff matches the three declared paths exactly.

**Archived:** 2026-10-22
