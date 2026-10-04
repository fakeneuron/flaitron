---
title: trim gates to 2
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-059]
---

# CORE-065 | trim gates to 2

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-059]]

## 🎯 Goal

Trim CORE-059's 4 operator-gate banners to 2 (🛠️ post-Discovery + 📦 ready-to-commit), so testing and closure ops auto-proceed and the post-commit suggestion surfaces next-task options with `[model]` tags inline per option.

## ✅ Acceptance

- [ ] SPEC.md §"Operator-gate cues" gates table reduced from 4 rows to 2 (🛠️ Phase 1→2 + 📦 ready-to-commit); intro prose updated to match the new "post-Discovery + ready-to-commit" semantics.
- [ ] SPEC.md §"🛠️ Phase 2: Execution" no longer surfaces a Phase 2→3 cue; section prose reads as continuous-flow into Phase 3 + Phase 4 closure ops.
- [ ] SPEC.md §"🚀 Phase 4: Closure" — Phase 4 closure recap cue dropped; recap (work summary) bundles into the 📦 ready-to-commit gate; the "Recap is recap-only" callout restated for the new gate location.
- [ ] SPEC.md §"Post-closure protocol" step 1 (commit) bundles recap + closure review + commit message behind the 📦 cue; step 2 (suggest next move) requires `[model]` tags visible inline per option (`**<TASK-ID>** [model] | shortname — why-now`).
- [ ] /task, /epic-discovery, /close-epic SKILLs surface only 🛠️ Phase 1→2 + 📦 ready-to-commit gates; intermediate Phase 2→3 + Phase 4 recap cues removed; recap drafted during Phase 4 closure ops but surfaces at the 📦 gate.
- [ ] /close-epic's 🏁 parent-flip cue removed; the parent-flip Yes/No prompt bundles into the 📦 ready-to-commit gate alongside the recap + closure review + commit message.
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" lands updates only where the cue convention reads through (typically SPEC.md).

## 🧩 Subtasks

- [ ] **SPEC.md §"Operator-gate cues"** — trim gates table from 4→2 rows; rewrite intro prose to reflect "post-Discovery + ready-to-commit" semantics + that Phase 2/3/closure flow continuously after Phase 1→2 approval; note skill-level extensions (e.g., parent-flip) bundle into the 📦 gate rather than getting their own banner.
- [ ] **SPEC.md §"🛠️ Phase 2: Execution"** — drop the "Exit gate" Phase 2→3 cue paragraph; replace with one-line note that Phase 2 flows continuously into Phase 3 + Phase 4 closure ops (no intermediate gate).
- [ ] **SPEC.md §"🧪 Phase 3: Testing & Linting"** — verify section already has no gate (CORE-059 didn't add one); ensure the "flows into Phase 4 closure ops" prose stays.
- [ ] **SPEC.md §"🚀 Phase 4: Closure"** — drop the Phase 4 closure-cue language from the recap paragraph; restate the "Recap is recap-only" callout to clarify recap surfaces at the 📦 ready-to-commit gate (not before).
- [ ] **SPEC.md §"Post-closure protocol"** — update step 1 to specify the 📦 gate bundles recap + closure review + commit message; update step 2 to require `[model]` tags visible inline per option (`**<TASK-ID>** [model] | shortname — why-now`).
- [ ] **/task SKILL.md Step 5** — drop Phase 2→3 cue and Phase 4 closure cue language; restructure to: Phase 2 → Phase 3 → Phase 4 closure ops run continuously; recap drafted but surfaces at Step 6's 📦 gate.
- [ ] **/task SKILL.md Step 6** — expand the 📦 ready-to-commit cue to bundle recap + closure review + proposed commit message; ensure suggest-next-move surfaces `[model]` tags inline per option.
- [ ] **/epic-discovery SKILL.md Step 7** — drop Phase 2→3 cue.
- [ ] **/epic-discovery SKILL.md Step 9** — drop Phase 4 closure cue; recap bundles into Step 10's 📦 gate.
- [ ] **/epic-discovery SKILL.md Step 10** — expand 📦 cue to bundle recap + closure review + commit; suggest-next-move format updated.
- [ ] **/close-epic SKILL.md Step 5** — drop Phase 2→3 cue.
- [ ] **/close-epic SKILL.md Step 7** — drop Phase 4 closure cue; recap drafted but surfaces at Step 9's 📦 gate.
- [ ] **/close-epic SKILL.md Step 8** — remove the 🏁 parent-flip cue; restructure so the parent-flip Yes/No decision bundles into Step 9's 📦 gate (still an AskUserQuestion, but presented within the ready-to-commit bundle, not behind its own banner).
- [ ] **/close-epic SKILL.md Step 9** — expand 📦 cue to bundle recap + closure review + parent-flip Y/N prompt + commit; suggest-next-move format updated.
- [ ] **Phase 3 mental-pass** — markdown rendering (rule, table column-alignment, emoji glyph parity), no trailing whitespace, all cross-refs to `SPEC §"Operator-gate cues"` still resolve.
- [ ] **Phase 4 closure** — doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; PLAN.md flip to stub form; archive tasknote.

## 🔗 Related

- [[CORE-059]] — predecessor that introduced the four-gate banner-cue convention now being trimmed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pure SPEC + SKILL prose edits over an established (one-day-old) convention; no behavioral or schema changes; user has direct UX feedback that 4 gates is too many for the actual approval moments. Low-risk, high-signal trim.

- [x] Read relevant source files
- [x] **Archive skim** — `grep -l "operator-gate\|AWAITING APPROVAL\|gate cue"` over `_project/tasknote/archive/core/` returned only **CORE-059.md** (the predecessor introducing the 4-gate convention). No earlier precedent. Read CORE-059's Implementation Notes for the exact edit shape: SPEC.md +48/-4, /task +10/-4, /close-epic +10/-3, /epic-discovery +8/-3 (4 files, +59/-17). Trim is a controlled inverse of those edits.
- [x] **Drift check** — all paths and concepts cited in the PLAN.md description still match HEAD: SPEC.md §"Operator-gate cues" present at top of §"The 4-phase workflow" with 4-row table; SPEC.md §"🛠️ Phase 2: Execution" carries the "Exit gate" Phase 2→3 paragraph; SPEC.md §"🚀 Phase 4: Closure" carries the Phase 4 closure cue + "Recap is recap-only" callout; SPEC.md §"Post-closure protocol" carries the 📦 cue mention. /task SKILL.md Steps 4/5/6, /epic-discovery Steps 6/7/9/10, /close-epic Steps 4/5/7/8/9 all surface the gates as expected. **One subtle point:** Phase 3→4 already has no separate gate (the 4-gate count comes from Phase 1→2, Phase 2→3, Phase 4 recap, ready-to-commit), so trimming to 2 leaves only Phase 1→2 + ready-to-commit. /close-epic's 🏁 parent-flip is a skill-specific extension beyond the 4 core gates; CORE-065 doesn't name it explicitly but user clarified (Q1 below) it bundles into ready-to-commit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Resolved scoping (via AskUserQuestion 2026-05-09):**

  | Question | Answer |
  |---|---|
  | /close-epic 🏁 parent-flip cue handling | **Bundle into 📦 ready-to-commit** — drop the separate banner; the parent-flip Yes/No decision is presented inside the ready-to-commit bundle alongside the recap + commit message. One gate, one approval. |
  | Post-commit next-task option format | **Inline per option** — each candidate reads as `**<TASK-ID>** [model] | shortname — why-now sentence`. Mirrors PLAN.md task-line shape; trivially scannable. |

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Gate trim shape (locked):**

  | Gate | Status | Banner |
  |---|---|---|
  | 🛠️ Phase 1→2 | **Keep** | `AWAITING APPROVAL — Phase 2: Execution ready` |
  | 🧪 Phase 2→3 | **Drop** | n/a (Phase 2 flows continuously into Phase 3) |
  | 🚀 Phase 4 closure recap | **Drop** | n/a (recap bundles into 📦) |
  | 📦 Ready-to-commit | **Keep + expand** | `AWAITING APPROVAL — Ready to commit` (now bundles recap + closure review + commit message; in /close-epic also bundles parent-flip Y/N prompt) |
  | 🏁 Parent-flip (/close-epic only) | **Drop** | n/a (bundles into 📦) |

- **Net banner count:** 4 → 2 in /task and /epic-discovery; 5 → 2 in /close-epic.
- **Behavioral semantics preserved:** the trim is a UX-layer change. The same approval pause-points still exist in the underlying flow (the user must still confirm before commit; in /close-epic they must still confirm parent-flip Y/N) — just bundled rather than serialized into 4-5 separate banner moments.
- **Recap location shifts.** Currently the recap surfaces at the 🚀 cue *before* the user confirms closure-of-the-tasknote, then commit comes after. After CORE-065: closure ops (doc-drift sweep, PLAN flip, archive move) auto-run silently after Phase 3, and recap surfaces at the 📦 cue paired with the proposed commit message. The user reads recap + commit msg + diff together → one approval. Net effect: one fewer ceremonial pause in the typical task lifecycle.
- **Phase 4 third checkbox** ("Recapped changes with the user and got confirmation") needs rewording: "Recapped at the 📦 ready-to-commit gate" — confirmation now means commit-go.
- **Adopters** pick up the trim on their next flowtron version bump (additive contract change; existing archived tasknotes / completed flows are unaffected since they pre-date both CORE-059 and CORE-065).
- **Deferred drift** in /micro-task and /release: out of stated scope per user. CORE-059 didn't touch them either; if they ever inherit operator-gate cues, they'll inherit the trimmed version directly.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** SPEC.md is the canonical "define-once" surface (epic lifecycle, blocked tasks, starter tasknotes, model field, operator-gate cues — all centralized in SPEC and cross-referenced by SKILLs). CORE-065's trim is the inverse motion of CORE-059: edit SPEC.md's gates table + prose to 2 rows, then update each SKILL's gate-cue references to match. Same shape, smaller surface — no new structure introduced.
- **SPEC.md edits** (4 hunks):
  - **§"Operator-gate cues"** — gates table reduced from 4 rows to 2 (🛠️ Phase 1→2 + 📦 ready-to-commit); intro prose rewritten to spell out continuous flow (Phase 2 → Phase 3 → Phase 4 closure ops with no intermediate gate); explicit note that recap bundles into 📦 (closure review + work summary + commit message) and that skill-level extensions (parent-flip, push-go) bundle there too rather than getting their own banners.
  - **§"🛠️ Phase 2: Execution"** — replaced the "Exit gate" Phase 2→3 paragraph with a one-line continuous-flow note pointing at the 📦 banner in §"Post-closure protocol".
  - **§"🚀 Phase 4: Closure"** — third checklist box reworded (`Recap drafted (surfaces at the 📦 ready-to-commit gate)`); recap paragraph rewritten to clarify closure ops auto-run + recap drafted but doesn't surface its own banner; "Recap is recap-only" callout restated for the new bundle location; closing paragraph clarifies commit-go is the bundled approval.
  - **§"Post-closure protocol"** step 1 expanded to spell out the bundled gate's three parts (closure review / recap / commit message) + the skill-level-extensions-ride-inside note. Step 2 updated to require `[model]` tags inline per option in the PLAN.md task-line shape (`**<TASK-ID>** [model] | shortname — why-now`); both epic-continuation and open-menu forms use this shape.
- **/task SKILL.md edits** (2 hunks): Step 5 restructured for continuous flow (Phase 2→3→4 closure ops auto-proceed; recap drafted but holds for Step 6); Step 6 expanded the 📦 cue into a 3-part bundle (closure review / recap / commit message) and updated suggest-next-move to use the inline `[model]` shape.
- **/epic-discovery SKILL.md edits** (3 hunks): Step 7 dropped the Phase 2→3 cue (continuous-flow line points at Step 10's 📦); Step 9 retitled "Drive Phase 4: Closure (auto-run)" with no banner — the recap drafted at end holds for Step 10's bundle; Step 10 expanded to a 3-part bundle + inline `[model]` next-move shape.
- **/close-epic SKILL.md edits** (4 hunks): Step 5 dropped the Phase 2→3 cue; Step 7 retitled "auto-run" with no banner (recap drafted, holds for Step 9's bundle); Step 8 retitled "Parent-epic flip eligibility (no banner)" — computes state only, defers prompt to Step 9; Step 9 expanded to a 4-part bundle (closure review / recap / parent-flip prompt when eligible / commit message), with the parent-flip Yes path applied before staging so the commit captures the flip atomically; suggest-next-move updated to inline `[model]` shape.
- **Strict-entailment edit beyond stated scope:** `templates/tasknote-template.md` Phase 4 third checkbox synced to the new SPEC wording (`Recap drafted (surfaces at the 📦 ready-to-commit gate)`). The template ships the canonical phase checklist; leaving it out-of-sync with SPEC would create silent drift on every new tasknote scaffold. Documented here rather than left for follow-up.
- **No tests added** — pure markdown / SKILL prose edits; no executable code surface.
- **Diff stat:** 5 files changed, +118/-81 (vs. CORE-059's +59/-17 expansion — the trim is roughly the inverse magnitude, modestly larger because the bundle's three/four parts need explicit prose where CORE-059 just listed gates in a table).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation

**Testing Notes:**

- Pure markdown / SKILL prose edits — no executable code surface. Test suite N/A.
- Lint substitute: grep sweep over the 4 edited files + template confirmed (1) no banner blocks reference dropped emoji glyphs (🧪 / 🚀 / 🏁) and (2) no inline prose references the dropped cues by name (`Phase 2→3 operator-gate cue`, `Phase 4 closure operator-gate cue`, `parent-flip operator-gate cue`). Trailing-whitespace grep clean.
- Markdown mental-pass over edited blocks: horizontal-rule banner format consistent (`---` + emoji + `**AWAITING APPROVAL — <label>**` + `---`); table column-alignment correct on the trimmed §"Operator-gate cues" 2-row table; code-fence ` ``` ` blocks balanced; remaining banner emoji glyphs (🛠️ 📦) consistent across SPEC + 3 SKILLs; cross-references to `SPEC §"Operator-gate cues"` and `SPEC §"Post-closure protocol"` all use canonical heading text.
- Frontend N/A — no UI changes.
- `git diff --stat`: 5 files changed, +118/-81 (SPEC.md +60/-46, close-epic +30/-25, epic-discovery +9/-9, task +12/-5, tasknote-template.md +1/-1).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

| Entry | Verdict |
|---|---|
| `README.md` | no change — public-facing repo overview; gate-trim is SPEC-internal, not adopter-facing |
| `SPEC.md` | **updated** — §"Operator-gate cues" gates table 4→2 + intro rewrite + skill-extensions-bundle note; §"🛠️ Phase 2: Execution" exit-gate paragraph replaced with continuous-flow note; §"🚀 Phase 4: Closure" recap paragraph + "Recap is recap-only" callout restated; §"Post-closure protocol" step 1 expanded into 3-part bundle, step 2 requires inline `[model]` per option |
| `docs/MIGRATION.md` | no change — adoption procedure unchanged; adopters pick up the trim on next version bump |
| `claude/CLAUDE-snippet.md` | no change — snippet wires skills; gates surface from SKILLs at runtime, not from the snippet text |

**Final Summary:**

Trimmed CORE-059's 4 operator-gate banners to 2 (🛠️ Phase 1→2 post-Discovery + 📦 ready-to-commit). Phase 2 → Phase 3 → Phase 4 closure ops now flow continuously without intermediate gates; the recap (work summary) drafts during closure ops but bundles into the 📦 gate alongside the closure review (per-entry doc-drift verdicts + new PLAN.md stub-form line + archive path) and the proposed commit message — one bundled approval, one commit. /close-epic's 🏁 parent-flip cue dropped: the Yes/No prompt rides inside the 📦 bundle when eligible (Step 8 now computes eligibility only); the parent-flip applies pre-commit so the flip + cohort move + commit land atomically. Post-commit suggest-next-move now surfaces candidates in the inline PLAN.md task-line shape `**<TASK-ID>** [model] | shortname — why-now` so `[model]` tags are scannable per option without cross-referencing PLAN.md. Strict-entailment edit beyond stated scope: `templates/tasknote-template.md` Phase 4 third checkbox synced to the new SPEC wording. Total surface: 5 files, +118/-81. No new behavioral pause-points introduced or removed — same approval moments, fewer banners.

**Archived:** 2026-05-09
