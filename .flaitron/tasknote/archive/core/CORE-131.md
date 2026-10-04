---
title: gate-skip --fast flag
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: [CORE-065, CORE-087, CORE-089, CORE-067, CORE-088]
---

# CORE-131 | gate-skip --fast flag

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-065]] [[CORE-087]] [[CORE-089]] [[CORE-067]] [[CORE-088]]

## 🎯 Goal

Add a `--fast` / `-f` operator flag to `/ft-task` that suppresses both conditional gates (🛠️ Phase 1→2 clarifying questions and 📦 ready-to-commit signal trips) while preserving the Re-scope / De-scope drift carve-out as the one gate that always fires.

## ✅ Acceptance

- [ ] `/ft-task` accepts `args` of the form `<TASK-ID>` or `<TASK-ID> --fast` (or `-f`); unknown trailing args surface a one-line usage notice + AskUserQuestion (no silent proceed)
- [ ] When `--fast` is active, `/ft-task` emits a single `⚡ --fast active` marker once at Step 0 (after path resolution)
- [ ] `/ft-task` Phase 1: when `--fast` is active, clarifying-questions step writes `No clarifications needed (--fast)` with explicit assumptions; 🛠️ Phase 1→2 banner is skipped via the existing inline marker path
- [ ] `/ft-task` drift carve-out: when `--fast` is active AND Relevance Assessment returns `Re-scope` or `De-scope`, the 🛠️ banner STILL fires (flag silences signal trips; not drift)
- [ ] `/ft-task` Phase 3: when `--fast` is active, the 👁️ visual-confirmation prose ask is suppressed (lint + type-check still run on changed code)
- [ ] `/ft-task` Post-closure: when `--fast` is active, Conditional skip rule routes to the Skip branch regardless of frontend / privileged-ops / perf-narrative signal trips
- [ ] `/ft-micro-task` accepts the same `args` shape, emits the same `⚡ --fast active` marker at Step 0, and forces the Skip branch in Step 5 Post-closure when active
- [ ] `claude/commands/ft-task.md` + `claude/commands/ft-micro-task.md` document `--fast` / `-f` in a `Usage:` section, mirroring the `/ft-epic-discovery` command-stub shape
- [ ] `SPEC.md` §"Operator-gate cues" gains one paragraph + a one-row footnote on the gate table describing `--fast` (suppresses 🛠️ when no drift, suppresses 📦 signal trips; preserves the 2-banner cap)
- [ ] `SPEC.md` §"📝 Phase 1: Discovery" exit gate notes the `--fast` drift carve-out
- [ ] `SPEC.md` §"🧪 Phase 3" notes `--fast` suppresses the 👁️ ask
- [ ] `SPEC.md` §"Post-closure protocol" §"Conditional skip rule" notes `--fast` forces the Skip branch
- [ ] Default flow (no flag) is byte-identical to existing behavior in both `/ft-task` and `/ft-micro-task` — no regression in the absent-flag path
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" complete; cross-refs to renamed/extended sections resolve

## 🧩 Subtasks

- [x] **S1** — `claude/skills/ft-task/SKILL.md`: soften opening grammar check to permit a trailing `--fast`/`-f`; add Step 0 arg-parse paragraph (empty | `--fast`/`-f` | unknown-arg branches per CORE-097.6 precedent); emit `⚡ --fast active` marker once when set
- [x] **S2** — `claude/skills/ft-task/SKILL.md` Step 4 (Phase 1 Discovery): wire `--fast` into the clarifying-questions step + exit-gate branch — when fast AND Verdict ∈ {Proceed}, write `No clarifications needed (--fast)` and take the inline-marker branch; when Verdict ∈ {Re-scope, De-scope}, still take the 🛠️-banner branch (drift carve-out)
- [x] **S3** — `claude/skills/ft-task/SKILL.md` Step 5 (Phase 3): wire `--fast` to suppress the 👁️ frontend visual-confirmation prose ask (lint/type-check still runs)
- [x] **S4** — `claude/skills/ft-task/SKILL.md` Step 6 (Conditional skip rule): wire `--fast` to force the Skip branch regardless of signal trips
- [x] **S5** — `claude/skills/ft-micro-task/SKILL.md`: soften opening grammar + add Step 0 arg-parse + ⚡ marker (mirror S1)
- [x] **S6** — `claude/skills/ft-micro-task/SKILL.md` Step 5: wire `--fast` to force the Skip branch
- [x] **S7** — `claude/commands/ft-task.md`: add a `Usage:` section showing `<TASK-ID>` and `<TASK-ID> --fast` forms (mirror `/ft-epic-discovery` stub)
- [x] **S8** — `claude/commands/ft-micro-task.md`: same Usage section
- [x] **S9** — `SPEC.md` §"Operator-gate cues": add one paragraph describing `--fast` + a footnote row on the gate table
- [x] **S10** — `SPEC.md` §"📝 Phase 1: Discovery" exit gate: document the `--fast` drift carve-out (Re-scope/De-scope still fires 🛠️)
- [x] **S11** — `SPEC.md` §"🧪 Phase 3": document `--fast` suppresses 👁️
- [x] **S12** — `SPEC.md` §"Post-closure protocol" §"Conditional skip rule": document `--fast` forces Skip branch
- [x] **S13** — Phase 3 verification: grep cross-refs to edited sections still resolve; verify 2-banner cap intact (no new 🛠️/📦 banners introduced); verify `⚡` glyph is unique to the `--fast` marker (no collisions); verify default-flow paragraphs remain byte-identical
- [x] **S14** — Phase 4 closure: doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (SPEC.md edited; SKILLs edited; command stubs edited — check each AI-referenced doc); PLAN.md flip; archive

## 🔗 Related

- [[CORE-065]] — `trim gates to 2`; defines the 2-gate ceiling that `--fast` operates within
- [[CORE-087]] — `conditional-phase2-gate` (made 🛠️ conditional on clarifying questions); operator-side complement
- [[CORE-089]] — `conditional-precommit-gate` (made 📦 conditional on diff signals); operator-side complement
- [[CORE-067]] — `gate-UX check-in` 1; precedent for iterating on the gate model
- [[CORE-088]] — `gate-UX check-in` 2; precedent for iterating on the gate model

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Starter captured a real friction in the conditional-gate UX (CORE-087 / CORE-089 left no operator-side knob to force-skip routine trips); design space is well-bounded (one flag, two suppressions, one carve-out); precedent for the shape exists in CORE-097.6's `/ft-epic-discovery --deep` work.

- [x] Read relevant source files
- [x] **Archive skim** — targeted greps across `_project/tasknote/archive/core/` against the four touched files
- [x] **Drift check** — all cited paths and section names verified at HEAD
- [x] Asked clarifying questions (3 AskUserQuestion answers resolved Q1/Q2 + an added visibility-marker question)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Files in scope (drift-checked, all current at HEAD):**

- `SPEC.md` §"Operator-gate cues" — present at L288; banner-format block + 2-row gate table + "Skill-level extensions bundle into 📦" callout
- `SPEC.md` §"📝 Phase 1: Discovery" exit gate (L329-347); §"🧪 Phase 3" (L367-378); §"Post-closure protocol" §"Conditional skip rule" (L406-410+)
- `claude/skills/ft-task/SKILL.md` — Step 0 (path resolution), Step 1 (PLAN.md locate + grammar check), Step 4 (Phase 1 Discovery), Step 5 Phase 3 (👁️ ask), Step 6 (Conditional skip rule branch)
- `claude/skills/ft-micro-task/SKILL.md` — Step 0, Step 1 grammar, Step 5 (Post-closure skip/fire branch); no Phase 1→2 banner and no separate 👁️ ask in this skill (📦 fire-branch is the only suppressible gate)
- `claude/commands/ft-task.md` + `claude/commands/ft-micro-task.md` — both already pass `$ARGUMENTS` via `args="$ARGUMENTS"`; need `Usage:` sections only

**Load-bearing archive precedents:**

- **[[CORE-097.6]]** is the canonical pattern for adding `--<flag>` to a `/ft-*` skill (added `--deep` to `/ft-epic-discovery`). Pattern: dedicated `Step n.5 — Parse $ARGUMENTS` section with three branches (empty / known-flag / unknown-arg → usage-notice + AskUserQuestion); command stub gains a `Usage:` section showing both forms; default flow byte-identical to pre-flag behavior. CORE-131 mirrors this faithfully but folds the parse into Step 0 (per the starter's Q4 decision, since Step 1.5 in `/ft-task` is already the model gate).
- **[[CORE-066]]** established the mandatory preview line on 🛠️ + 📦 banners and the 🟢 commit-go prefix. When `--fast` suppresses 📦, the autonomous-commit motion (existing Skip branch) takes over; no preview line or 🟢 prefix to emit. No additional changes needed beyond routing to Skip.
- **[[CORE-097.4]]** flagged §"Operator-gate cues" + §"Post-closure protocol" as heavy sections; CORE-131 additions should be tight (one paragraph + one footnote row in §"Operator-gate cues"; one sentence each in §"Phase 1 exit gate" / §"🧪 Phase 3" / §"Conditional skip rule").
- **[[CORE-065]] + [[CORE-087]] + [[CORE-089]]** define the 2-banner cap and the conditional-trip model; `--fast` operates strictly within that ceiling — it does not introduce new banners.

**No prior task introduced a `--*` flag to `/ft-task` or `/ft-micro-task`.** Net-new arg-handling for both skills.

**Clarifications resolved (via AskUserQuestion):**

| Q | Resolution |
|---|---|
| Q1 — Scope (sibling skills) | `--fast` extends to `/ft-micro-task` (same flag, same `⚡` marker, force Skip branch in Step 5). `/ft-epic-discovery` + `/ft-close-epic` out of scope per starter (AskUserQuestion review-and-confirm gates are a different category per SPEC/epic.md). |
| Q2 — 👁️ suppression | `--fast` also suppresses the 👁️ frontend visual-confirmation prose ask (consistent framing: --fast means "no routine confirmations"). Lint/type-check on changed code still runs. |
| Q3 — Active marker | Emit `⚡ --fast active` once at Step 0 (after path resolution). Mirrors existing inline-marker conventions (✅ Phase 1 complete · ✅ Closure complete · 🏁 state-marker). |
| Q4 — Flag-parse location (decided in starter) | `claude/skills/ft-task/SKILL.md` Step 0 alongside path resolution; same in `/ft-micro-task`. Step 1.5 stays the model gate. |
| Q5 — Banner-format presentation (decided in starter) | One paragraph + a one-row footnote on the 2-row gate table in §"Operator-gate cues" (not a new column). |

**Out of scope (per starter, confirmed in Phase 1):**

- Separate `--noquestions` flag — single `--fast` knob, no tiered shapes
- Drift carve-out suppression — Re-scope/De-scope STILL fires 🛠️
- AskUserQuestion review-and-confirm gates inside `/ft-epic-discovery` + `/ft-close-epic` — different category (per SPEC/epic.md L64)
- `docs/MIGRATION.md` — purely additive opt-in; adopters pick up the flag on next submodule bump (CORE-097.6 precedent set the no-migration-needed pattern)
- Release version bump — handled by the next `/ft-release` cohort separately

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** CORE-097.6 set the canonical `--<flag>` precedent on `/ft-epic-discovery` (dedicated `Step n.5 — Parse $ARGUMENTS` section with `empty | known-flag | unknown-arg → usage-notice + AskUserQuestion` branches; command-stub `Usage:` section; default flow byte-identical). CORE-131 mirrors this faithfully but folds parse into Step 0 (per starter Q4 decision — `/ft-task`'s Step 1.5 is already the model gate, so a new Step 0.5 would awkwardly bracket it). Same parse shape transfers cleanly to `/ft-micro-task`.
- **Edits — `/ft-task` SKILL (4 sites):** (a) opening grammar softened to permit trailing `--fast`/`-f`; (b) Step 0 gains a `Parse args` paragraph + ⚡ marker; (c) Step 4 clarifying-questions step + drift carve-out paragraph; (d) Step 5 Phase 3 👁️ suppression clause; (e) Step 6 Conditional skip override paragraph.
- **Edits — `/ft-micro-task` SKILL (3 sites):** opening grammar; Step 0 parse + ⚡ marker (narrower marker text since this skill has no Phase 1→2 banner and no 👁️ ask); Step 5 Conditional skip override.
- **Edits — command stubs:** `Usage:` sections added to both `claude/commands/ft-task.md` and `claude/commands/ft-micro-task.md`, mirroring the `/ft-epic-discovery` stub shape (default form + `--fast` form, one-line description each).
- **Edits — `SPEC.md` (4 sites):** §"Operator-gate cues" gets one italicized footnote paragraph immediately under the 2-row gate table (chose footnote-under-table over new-column to avoid table-schema churn per CORE-097.4's density observation); §"📝 Phase 1: Discovery" exit gate gets a `--fast drift carve-out` paragraph; §"🧪 Phase 3" gets a `--fast` suppression paragraph; §"Conditional skip rule" gets a `--fast operator override` paragraph clarifying that the "No AI override" semantics still hold — `--fast` is operator-side explicit input, distinct from AI judgment.
- **Default-flow preservation:** every edit additive — original prose preserved verbatim before/after each new `**When fast-mode = true**` clause; no behavior change in the absent-flag path.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Flowtron has no automated test or lint suite for markdown contract surface — verification is structural greps + conceptual re-read of default-flow paragraphs.
- **Cross-ref integrity:** `§"Operator-gate cues"` · `§"📝 Phase 1: Discovery"` · `§"🧪 Phase 3"` · `§"Conditional skip rule"` — all targets still resolve at their original headings (grep across SPEC.md + edited SKILLs; no orphaned cross-refs).
- **2-banner cap intact:** grep for `AWAITING APPROVAL` returns 3 hits in SPEC.md (1 banner template at L295 + 2 table rows at L304/L305 — all pre-existing); 0 hits in either SKILL. No new banner blocks introduced; the conditional gates remain the only banner-blocks per the §"Operator-gate cues" 2-banner contract.
- **⚡ glyph collision noted:** `⚡` is also the section heading for micro-tasknote `## ⚡ Notes` (SPEC.md L552 + `claude/skills/ft-micro-task/SKILL.md` + `templates/tasknote-micro-template.md`). The new `--fast active` inline marker uses the same glyph but in a different context (inline status line vs. tasknote body section heading). Non-confusing in practice — operator picked `⚡` explicitly in Q3 — but worth recording as a known dual-use.
- **`--fast` reference audit:** 19 total references across SPEC.md (6), `/ft-task` SKILL (6), `/ft-micro-task` SKILL (4), `/ft-task` stub (1), `/ft-micro-task` stub (1) + the marker emit lines. All consistent in shape (`--fast` / `-f` flag, `fast-mode` internal name, drift carve-out language).
- **Frontend N/A** — no UI changes. The 👁️ suppression itself is the convention for *future* frontend visual-confirmation asks under `--fast`; CORE-131 has no UI surface to confirm against.
- **`git diff --stat`** (pre-archive-move): 6 files changed in non-tasknote scope (SPEC.md +29/-3, ft-task SKILL +14/-3, ft-micro-task SKILL +10/-1, ft-task stub +5/-0, ft-micro-task stub +5/-0, PLAN.md flip +1/-1) — markdown only; no frontend / privileged-ops / perf-narrative surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (7 AI-referenced docs):**

| Doc | Verdict |
|---|---|
| `README.md` | no change — overview doc; no per-flag enumeration |
| `SPEC.md` | **updated** — §"Operator-gate cues" footnote + §"Phase 1 exit gate" drift carve-out + §"🧪 Phase 3" 👁️ suppression + §"Conditional skip rule" `--fast` override |
| `docs/MIGRATION.md` | no change — adoption + bump doc; `--fast` is opt-in additive, default flow byte-identical, adopters pick it up on next submodule bump (CORE-097.6 set the no-migration-needed precedent for skill flags) |
| `claude/AGENTS-snippet.md` | no change — adopter paste-block names the commands; flag documentation lives in the command-stub `Usage:` sections (which the snippet implicitly surfaces via the slash-command menu) |
| `docs/CONVENTIONS.md` | no change — conventions doc (commits / versioning / formatting); flag UX not in scope |
| `CONTRIBUTING.md` | no change — solo-maintenance + issue/PR doc; mentions "gate cues" only as a SPEC.md cross-ref |
| `SECURITY.md` | no change — threat model; mentions `/ft-task` only as a skill name |

**Final Summary:**

_Plain English:_ Added a `--fast` / `-f` operator flag to `/ft-task` and `/ft-micro-task` that suppresses the routine conditional gates (🛠️ Phase 1→2, 👁️ frontend visual-confirmation prose ask, and 📦 ready-to-commit signal trips) so the operator can run an autonomous end-to-end execution on a task they already know is low-risk. Re-scope and De-scope verdicts STILL fire 🛠️ — the flag silences routine signal trips, not drift. Default flow (no flag) is byte-identical to the pre-flag behavior.

_Technical:_ 6 files edited across the markdown contract surface — `SPEC.md` (4 sections: footnote on the §"Operator-gate cues" gate table + drift-carve-out paragraph in §"Phase 1 exit gate" + 👁️-suppression paragraph in §"🧪 Phase 3" + `--fast` override paragraph in §"Conditional skip rule"); `claude/skills/ft-task/SKILL.md` (Step 0 parse + ⚡ marker; Step 4 clarifying-questions branch + drift carve-out; Step 5 Phase 3 👁️ suppression; Step 6 Skip branch override); `claude/skills/ft-micro-task/SKILL.md` (Step 0 parse + narrower ⚡ marker; Step 5 Skip branch override); `claude/commands/ft-task.md` + `claude/commands/ft-micro-task.md` (`Usage:` sections per `/ft-epic-discovery` precedent). Pattern mirrored from CORE-097.6's `--deep` shape with the parse folded into Step 0 (since `/ft-task`'s Step 1.5 is already the model gate). 2-banner cap intact (3 `AWAITING APPROVAL` hits in SPEC.md, all pre-existing; 0 in SKILLs). `git diff --stat`: 6 files, +63/-8. Verification ask: skim the SPEC.md §"Operator-gate cues" footnote (L307) + §"Phase 1 exit gate" drift carve-out (L351-357) + `claude/skills/ft-task/SKILL.md` Step 0 parse (L30-36) for the operator-facing shape.

**Archived:** 2026-05-22
