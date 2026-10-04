---
title: task workflow visual gate cues
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: []
---

# CORE-059 | task workflow visual gate cues

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗

## 🎯 Goal

Add banner-style operator-gate cues at every /task approval point so the user can visually scan a transcript and immediately spot phase-boundary stops.

## ✅ Acceptance

- [ ] Banner format defined once in SPEC.md (separator + phase emoji + AWAITING APPROVAL / READY status) so adopters and skills inherit a single canonical convention.
- [ ] /task SKILL.md surfaces the banner at four gates: Phase 1→2, Phase 2→3, Phase 4 closure (recap), and ready-to-commit.
- [ ] SPEC.md phase descriptions reference the gate cue at each transition (Phase 1→2, 2→3, Phase 4 recap, post-closure commit).
- [ ] /epic-discovery and /close-epic SKILLs mirror the banner format at their explicit user gates (phase walks + audit recap + parent-flip prompt + commit gate).
- [ ] No drift introduced into other skills (/micro-task, /release, /starter-task, /file-followup) — out of scope; follow-up filings if needed.
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" lands updates only where the cue convention reads through (typically SPEC.md).

## 🧩 Subtasks

- [ ] Draft canonical banner-cue subsection in SPEC.md (under §"The 4-phase workflow") defining format + listing each gate.
- [ ] Add one-line cue references in SPEC.md §"📝 Phase 1: Discovery" / §"🛠️ Phase 2: Execution" / §"🧪 Phase 3: Testing & Linting" / §"🚀 Phase 4: Closure" / §"Post-closure protocol".
- [ ] Update /task SKILL.md Step 4 (end of Phase 1) to surface the Phase 2 banner.
- [ ] Update /task SKILL.md Step 5 phase walks (Phase 2→3 banner; Phase 4 recap banner).
- [ ] Update /task SKILL.md Step 6 (commit gate banner).
- [ ] Mirror banners in /epic-discovery SKILL.md at: Phase 1→2 (Step 7 entry), Phase 2→3 (Step 8 entry), Phase 4 recap (Step 9 close), commit-go (Step 10).
- [ ] Mirror banners in /close-epic SKILL.md at: Phase 1→2 (Step 5 entry), Phase 2→3 (Step 6 entry), Phase 4 recap (Step 7 close), parent-flip prompt (Step 8), commit-go (Step 9).
- [ ] Phase 3 mental-pass on edits (markdown rule rendering, emoji consistency, no trailing whitespace).
- [ ] Phase 4 doc-drift sweep + close.

## 🔗 Related

- (none — standalone task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Approval points exist today as implicit "wait for confirmation" prose; making them visually scannable is a low-risk doc/SKILL edit that improves operator UX without touching executable code surface.

- [x] Read relevant source files
- [x] **Archive skim** — skimmed `_project/tasknote/archive/core/` for prior touches on `task SKILL.md` and `SPEC.md` phase descriptions; grep on "operator gate / awaiting approval / banner / approval point / phase boundar / approval gate / visual cue" returned only incidental references in CORE-042.1 / CORE-042.6 (epic-trim discussions, no banner-cue precedent). No prior tasknote shaped this convention.
- [x] **Drift check** — file paths and concepts cited in the PLAN.md description match HEAD: task SKILL.md exists with Steps 0-6; SPEC.md §"The 4-phase workflow" with Phase 1-4 subsections exists; /epic-discovery and /close-epic SKILLs exist. **One drift surfaced:** "ready-to-push" is named as a /task gate, but /task's `Post-closure protocol` ends at commit — there is no `git push` step. Surfaced to user; user confirmed push was not intended → dropped from scope.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Resolved scoping (via AskUserQuestion 2026-05-09):**

  | Question | Answer |
  |---|---|
  | Push gate handling | Drop push from scope (user did not intend a push gate; cover Phase 1→2, 2→3, ready-to-commit, Phase 4 closure only) |
  | Banner format | Markdown rule + bold one-liner: `---` + emoji + `**AWAITING APPROVAL — <label>**` + `---` |
  | Spread to other skills | Best judgement → /task + SPEC.md + the two named skills (/epic-discovery, /close-epic). Not /micro-task / /release / /starter-task / /file-followup (out of stated scope). |

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Banner format (locked):**

  ```
  ---

  🛠️  **AWAITING APPROVAL — Phase 2: Execution ready**

  ---
  ```

  Per-gate emoji + label:

  | Gate | Emoji | Label |
  |---|---|---|
  | Phase 1→2 | 🛠️ | AWAITING APPROVAL — Phase 2: Execution ready |
  | Phase 2→3 | 🧪 | AWAITING APPROVAL — Phase 3: Testing & Linting ready |
  | Phase 4 closure (recap) | 🚀 | AWAITING APPROVAL — Phase 4 closure complete; recap ready |
  | Ready-to-commit | 📦 | AWAITING APPROVAL — Ready to commit |
  | Parent-flip (close-epic only) | 🏁 | AWAITING APPROVAL — Parent epic flip ready |

- **No new behavioral gates introduced.** The banners visually mark the *existing* user-gate pause points already in the SPEC contract (recap-await-confirmation, commit-go) and the SKILL-level pauses that already happen between phases. Phase 1→2 and Phase 2→3 transitions become explicit operator gates by this convention — a small contract sharpening rather than a wholly new gate.
- **/release already has commit-go + push-go gates** with explicit "wait for the user" language; mirroring banners there is a natural fit but out of stated scope. Candidate `/file-followup` for inheriting the convention.
- **/micro-task** uses a one-shot ⚡ Notes shape with a single recap + commit gate; could inherit the recap + commit banners if desired (follow-up).
- **No archive precedent** for this convention — first time the workflow gets visual-cue formalization.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** SPEC.md is the canonical "define-once" surface (cf. epic lifecycle, blocked tasks, starter tasknotes, model field — all centralized in SPEC and cross-referenced by SKILLs). Followed the same shape: a new `### Operator-gate cues` subsection at the top of §"The 4-phase workflow" defines the convention once, with table-of-gates + format block; SKILLs (and the rest of the SPEC's phase descriptions) cross-reference rather than restate. No parallel new structure introduced.
- **SPEC.md edits** (5 hunks):
  - Added `### Operator-gate cues` subsection inside §"The 4-phase workflow" (before §"📝 Phase 1: Discovery"): defines banner format, table of gates with emoji + label per gate, note that Phase 3→4 has no separate gate, note that skill-level gates inherit the same shape.
  - End of §"📝 Phase 1: Discovery": added "Exit gate: surface the Phase 2 cue."
  - End of §"🛠️ Phase 2: Execution": added "Exit gate: surface the Phase 3 cue."
  - End of §"🚀 Phase 4: Closure" recap paragraph: added "Surface behind the Phase 4 closure cue."
  - §"Post-closure protocol" step 1 (commit): added "Surface commit message behind the ready-to-commit cue."
  - Did NOT add Exit-gate language at end of §"🧪 Phase 3: Testing & Linting" — Phase 3 flows continuously into Phase 4 closure ops per the contract; the gate fires at the recap.
- **/task SKILL.md edits** (3 hunks): Step 4 end (Phase 1→2 cue), Step 5 phase-2 + phase-4 sub-bullets (Phase 2→3 cue + Phase 4 recap cue), Step 6 (ready-to-commit cue).
- **/epic-discovery SKILL.md edits** (4 hunks): Step 6 end (Phase 1→2), Step 7 end (Phase 2→3), Step 9 recap (Phase 4 closure), Step 10 (ready-to-commit).
- **/close-epic SKILL.md edits** (5 hunks): Step 4 end (Phase 1→2), Step 5 end (Phase 2→3), Step 7 recap (Phase 4 closure), Step 8 AskUserQuestion (parent-flip cue, skill-specific extension with 🏁 emoji), Step 9 (ready-to-commit).
- **No tests added** — pure markdown/SKILL prose edits; no executable code surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation

**Testing Notes:**

- Pure markdown / SKILL prose edits — no executable code surface. Test suite N/A.
- Lint substitute: `git diff --check` clean (no trailing whitespace / conflict markers).
- Markdown mental-pass over the edited blocks: horizontal rule rendering verified; table column-alignment correct; code-fence ` ``` ` blocks balanced; emoji glyphs present (🛠️ 🧪 🚀 📦 🏁) and consistent across SPEC + 3 SKILLs; cross-references `SPEC §"Operator-gate cues"` all use the canonical heading text.
- Frontend N/A — no UI changes.
- `git diff --stat`: `4 files changed, 59 insertions(+), 17 deletions(-)`. SPEC.md +48/-4, close-epic +10/-3, epic-discovery +8/-3, task +10/-4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

| Entry | Verdict |
|---|---|
| `README.md` | no change — public-facing repo overview; cue convention is SPEC-level, not adopter-facing |
| `SPEC.md` | **updated** — new `### Operator-gate cues` subsection (top of §"The 4-phase workflow") + inline cue references at end of Phase 1, end of Phase 2, in Phase 4 recap paragraph, and in §"Post-closure protocol" step 1 |
| `docs/MIGRATION.md` | no change — adoption procedure unchanged; adopters pick up the new convention via next version bump |
| `claude/CLAUDE-snippet.md` | no change — snippet wires skills; cue is surfaced by SKILLs at runtime, not by the snippet text |

**Final Summary:**

Added a banner-style operator-gate cue convention to flowtron's 4-phase workflow. SPEC.md now defines the format once (separator + phase emoji + `AWAITING APPROVAL — <label>` + separator) under a new `### Operator-gate cues` subsection at the top of §"The 4-phase workflow", with a per-gate emoji table (🛠️ Phase 1→2, 🧪 Phase 2→3, 🚀 Phase 4 closure recap, 📦 ready-to-commit). Inline cue references added at the end of Phase 1 / Phase 2 phase descriptions, in the Phase 4 recap paragraph, and in §"Post-closure protocol" step 1 (commit). /task SKILL.md, /epic-discovery SKILL.md, and /close-epic SKILL.md now surface the cue at every gate moment in their step walks. /close-epic adds a 🏁 parent-flip cue as a skill-specific extension. Push gate dropped from scope per user clarification (/task has no push step). /micro-task / /release / /starter-task / /file-followup deferred to follow-up — out of stated scope. Total surface: 4 files, +59/-17. No new behavioral gates introduced — purely a UX layer over existing pause points.

**Archived:** 2026-05-09
