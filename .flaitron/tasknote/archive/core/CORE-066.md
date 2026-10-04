---
title: gate-UX refinements
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [FE-023, CORE-065, CORE-059]
---

# CORE-066 | gate-UX refinements

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-023]] · [[CORE-065]] · [[CORE-059]]

## 🎯 Goal

Apply the four in-session FE-023 gate-UX refinements to flowtron's 4-phase workflow banners and investigate the broader "overly gated" concern.

## ✅ Acceptance

- [ ] **R1 — Banner preview line.** SPEC.md §"Operator-gate cues" banner format extended with a 1-2 sentence plain-English "what executes on approval" preview, placed *inside* the banner block between the emoji-label line and the closing `---`. Convention applies to both 🛠️ Phase 1→2 and 📦 ready-to-commit banners.
- [ ] **R2 — 👁️ visual-confirmation prefix.** SPEC.md §"🧪 Phase 3: Testing & Linting" + `templates/tasknote-template.md` Phase 3 third checkbox spell out that the (frontend) visual-confirmation prose ask carries a `👁️` inline prefix. No banner block — purely a scannable emoji prefix on the conversational ask. (Gate count stays at 2; CORE-065's trim direction preserved.)
- [ ] **R3 — Commit-go emoji prompt.** SPEC.md §"Post-closure protocol" step 1 + `/task`, `/epic-discovery`, `/close-epic` SKILLs prescribe a `🟢` (or equivalent) prefix on the "Reply `commit` / `go` to land" line at the bottom of the 📦 bundle so it stands out under the closure-review tables.
- [ ] **R4 — Plain-English-first recap.** SPEC.md §"🚀 Phase 4: Closure" + §"Post-closure protocol" step 1 redefine the recap (work summary) to lead with 1-2 plain-English sentences of *what the task accomplished* before the technical detail (file paths, LOC, decisions, verification ask). Bundle stays 3 parts (closure review / recap / commit message) — no new component.
- [ ] **/task, /epic-discovery, /close-epic SKILLs** updated to surface the four refinements at every gate-emit and visual-confirmation point in their step walks.
- [ ] **Out-of-scope skills (`/release`, `/micro-task`, `/file-followup`, `/starter-task`)** untouched — same deferral pattern as CORE-065/CORE-059.
- [ ] **Clarifying-questions surface untouched** — Phase 1 Discovery checklist's "Asked clarifying questions OR logged..." box and the SKILL imperative to "use AskUserQuestion for anything genuinely ambiguous" remain unchanged. R1–R4 sit at gate-banner / Phase 3 / Phase 4 surfaces only.
- [ ] **Followup filed** — new CORE-* PLAN.md line opens the broader "overly gated" investigation as a deferred check-in after R1–R4 ship.
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" lands updates only where the conventions read through (SPEC.md primary; SKILLs are not in the AI-referenced doc set per `tasknote/README.md` §"AI-referenced docs").

## 🧩 Subtasks

- [ ] **SPEC.md §"Operator-gate cues"** — extend the banner-format code block with the optional preview line slot (`_What executes on approval: …_` between the emoji-label line and the closing `---`); add one short paragraph to the surrounding prose stating the preview is mandatory on the 🛠️ + 📦 banners (1-2 sentence plain-English summary of what runs if approved).
- [ ] **SPEC.md §"🧪 Phase 3: Testing & Linting"** — reword the visual-confirmation checkbox from `(frontend) Asked the user for visual confirmation` to `(frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)`; add one-line note that 👁️ is an inline prefix, not a banner block.
- [ ] **SPEC.md §"🚀 Phase 4: Closure"** — reshape the recap-paragraph definition to lead with the 1-2 sentence plain-English summary, then technical (file paths / LOC / key decisions / optional verification ask). Restate the "Recap is recap-only" callout to clarify the new shape (plain-English first / technical second) is part of the recap definition.
- [ ] **SPEC.md §"Post-closure protocol"** step 1 — restate the recap entry in the 3-part bundle to specify the plain-English-first shape; add a one-line note that the commit-go prompt at the bottom of the bundle carries a `🟢` emoji prefix to stand out under the closure-review tables.
- [ ] **/task SKILL.md Step 5** — Phase 3 bullet updated for `👁️` visual-confirmation prefix; Phase 4 bullet updated for the reshaped recap (plain-English first).
- [ ] **/task SKILL.md Step 6** — bundle description updated: 🛠️/📦 banners carry preview line per SPEC; recap reshaped (plain-English first); commit-go prompt carries 🟢 prefix.
- [ ] **/epic-discovery SKILL.md** — same shape: Step 6/7 (Phase 1→2 banner preview), Step 9 (recap reshape), Step 10 (bundle preview + 🟢 commit-go prefix). Visual-confirmation 👁️ unlikely relevant for epic-discovery (no frontend visual surface) but checked.
- [ ] **/close-epic SKILL.md** — same shape: Step 5 (Phase 1→2 banner preview), Step 7 (recap reshape), Step 9 (bundle preview + 🟢 commit-go prefix). Visual-confirmation 👁️ unlikely relevant for close-epic audit (no frontend visual surface) but checked.
- [ ] **`templates/tasknote-template.md`** — Phase 3 third checkbox synced to the new SPEC wording (`(frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)`). Same strict-entailment shape as CORE-065's template-sync edit (the template ships the canonical phase checklists; out-of-sync drift would propagate to every new tasknote).
- [ ] **File "overly gated" follow-up** — add a new PLAN.md line under Medium (or Low) for a deferred check-in: re-evaluate gate-count + bundle ergonomics after R1–R4 have been used in 2-3 task closures. ID assigned at execution time (next CORE-* number).
- [ ] **Phase 3 mental-pass** — markdown rendering (banner block rules + horizontal rule integrity, table alignment, emoji glyph parity, no trailing whitespace), all cross-refs to `SPEC §"Operator-gate cues"` still resolve.
- [ ] **Phase 4 closure** — doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; PLAN.md flip to stub form; archive tasknote.

## 🔗 Related

- [[FE-023]] — source of the four in-session UX-feedback bullets (SCRATCHPAD.md §"Gate / AI-prompt UX feedback")
- [[CORE-065]] — trimmed operator-gates 4→2 (most recent gate-UX change; defines the current 🛠️ / 📦 baseline this task refines)
- [[CORE-059]] — original "task workflow visual gate cues" (introduced banner-cue convention)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pure SPEC + SKILL prose edits over an established (one-day-old) convention; no behavioral or schema changes. User has direct UX feedback (SCRATCHPAD §"Gate / AI-prompt UX feedback") captured in-session during FE-023 — four named refinements + one open concern. Pattern survey already done by CORE-059 and CORE-065 precedents (same shape: SPEC.md defines once, SKILLs cross-reference). Low-risk, high-signal UX-layer extension.

- [x] Read relevant source files
- [x] **Archive skim** — `grep -l 'operator-gate\|AWAITING APPROVAL\|🛠️\|📦' _project/tasknote/archive/core/*.md` returned 56 matches; load-bearing precedents are **CORE-059** (introduced 4-banner convention) and **CORE-065** (trimmed 4→2; defines current baseline). Both used the same architecture: SPEC.md is canonical define-once, SKILLs cross-reference, templates synced for any phase-checklist text changes (CORE-065 set the template-sync precedent for the Phase 4 third box). Other matches are incidental references in unrelated tasknotes (file-paths, banner-emoji glyphs in completed-summary text, etc.) — not load-bearing for this task. Read CORE-065's Implementation Notes for the diff-shape envelope: 5 files, +118/-81 (SPEC + 3 SKILLs + template). CORE-066's surface should land in the same envelope (SPEC + 3 SKILLs + template); preview-line / 👁️ / 🟢 / recap-reshape are smaller hunks each than CORE-065's gate-trim.
- [x] **Drift check** — all paths and concepts cited in the PLAN.md description + SCRATCHPAD source still match HEAD:
  - `SCRATCHPAD.md` §"Gate / AI-prompt UX feedback" present with all four bullets verbatim (lines 9-17) + open "overly gated" concern (line 17) + "Other in-session findings" (lines 19-24).
  - `[[FE-023]]` archived 2026-05-10 (PLAN.md line 37).
  - SPEC.md §"Operator-gate cues" present at top of §"The 4-phase workflow" with 2-row gates table (🛠️ Phase 1→2 + 📦 ready-to-commit; lines 247-250).
  - SPEC.md §"🧪 Phase 3: Testing & Linting" carries `(frontend) Asked the user for visual confirmation` (line 322).
  - SPEC.md §"🚀 Phase 4: Closure" carries the recap-paragraph definition + "Recap is recap-only" callout (lines 332-343).
  - SPEC.md §"Post-closure protocol" step 1 carries the 3-part bundle (closure review / recap / commit message; lines 358-373).
  - `templates/tasknote-template.md` Phase 3 third box reads `(frontend) Asked the user for visual confirmation` (line 62).
  - `/task`, `/epic-discovery`, `/close-epic` SKILL banner-emit and bundle-description points all match the SPEC convention (verified via grep).
  - **No drift.** Surface is exactly as the SCRATCHPAD bullets described.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Resolved scoping (via AskUserQuestion 2026-05-10):**

  | Question | Answer |
  |---|---|
  | Banner preview placement | **Inside, above closing rule** — preview line sits between the emoji-label line and the closing `---`, visually attached to the banner cue. |
  | Visual-confirmation 👁️ shape | **Inline prefix on the prose ask** — purely an emoji prefix on the conversational visual-confirmation prompt; no banner block, no third gate. Preserves CORE-065's 4→2 trim direction. |
  | Bundle layout for plain-English summary | **Reshape recap, plain-English first then technical** — keep the 3-part bundle (closure review / recap / commit msg); restructure the recap itself to lead with 1-2 plain-English sentences then technical detail (file paths / LOC / decisions / verification ask). |
  | Overly-gated investigation scope | **File as follow-up after R1–R4 ship** — the four refinements ARE the first response; land them, then evaluate. New CORE-* PLAN.md line filed at the end of this task's execution to capture the deferred check-in. |
  | (User reassurance ask) | The clarifying-questions surface (Phase 1 box + SKILL "use AskUserQuestion for anything genuinely ambiguous" imperative + mid-execution AskUserQuestion when surprises surface) is **untouched** by R1–R4. Confirmed; flagged in Acceptance. |

  **Commit-go emoji choice (assistant decision, no AskUserQuestion needed):** Use `🟢` over `🚦` per SCRATCHPAD's first-listed alternative + green = go semantic clarity. Single-glyph (🟢) renders more reliably than multi-frame transit signal (🚦). User can override at execution review.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Refinement summary (locked):**

  | ID | Refinement | Surface |
  |---|---|---|
  | R1 | Plain-English preview line on 🛠️ + 📦 banners (inside, above closing rule) | SPEC §"Operator-gate cues"; SKILLs at every banner-emit |
  | R2 | 👁️ inline prefix on Phase 3 visual-confirmation prose ask | SPEC §"🧪 Phase 3"; `templates/tasknote-template.md`; /task SKILL Step 5 |
  | R3 | 🟢 prefix on commit-go prompt at 📦 close | SPEC §"Post-closure protocol" step 1; SKILLs at bundle close |
  | R4 | Recap reshaped: plain-English first, then technical | SPEC §"🚀 Phase 4" + §"Post-closure protocol" step 1; SKILLs |

- **No new gates introduced.** R1–R4 are all UX layers over the existing 🛠️ + 📦 pause points (or, for R2, the existing Phase 3 conversational ask). Gate count stays at 2 — CORE-065's trim direction preserved.
- **Out-of-scope skills.** `/release`, `/micro-task`, `/file-followup`, `/starter-task` not touched. CORE-065 set the same precedent: extension skills inherit conventions on next pass when they next see edits. `/release` in particular has its own commit-go + tag/push gates that are structurally different (Step 7.4/7.5) — folding R1/R3/R4 there would expand scope beyond the SCRATCHPAD bullets.
- **Adopters** pick up the refinements on their next flowtron version bump (additive contract change; existing archived tasknotes / completed flows unaffected).
- **Diff envelope** estimate: ~5 files (SPEC + 3 SKILLs + template); SPEC carries the heaviest hunks (~3-4 small additions); SKILLs each get ~2-3 small hunks. Expected magnitude under CORE-065's 5-file/+118/-81 envelope since each refinement is a smaller insertion than gate-trim.
- **Other in-session findings (SCRATCHPAD lines 19-24)** explicitly out of scope for CORE-066: viz Tags-row redesign (FE-* candidate), `~/Code/flowtron-nat-011/` exploration, `viz/` tasknote-README quick-command drift (`Viz lint` script doesn't exist), and the BananaPeel dev-port collision (already fixed in FE-023). These can be filed as separate tasks/follow-ups when the user is ready; no overlap with CORE-066's gate-UX surface.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** SPEC.md is the canonical "define-once" surface (gate cues, recap shape, post-closure protocol all centralized in SPEC and cross-referenced by SKILLs). CORE-066 reuses CORE-059 / CORE-065's exact pattern: edit SPEC.md to extend the contract, then update each SKILL's gate-emit / recap / bundle prose to match. `templates/tasknote-template.md` Phase 3 third box synced for R2 — same template-sync precedent CORE-065 set for the Phase 4 third box. No new structure introduced; same shape, smaller surface than the predecessors.
- **R1 — Banner preview line. SPEC.md §"Operator-gate cues":** banner-format code block extended with an optional preview slot (`_<1-2 sentence plain-English preview of what executes on approval>_`) placed inside the banner block immediately above the closing `---`. New paragraph spells out the preview is **mandatory** on both 🛠️ + 📦 gates, italicized, scoped to "what am I greenlighting?" intent (not file paths / LOC counts — those live in the recap).
- **R2 — 👁️ visual-confirmation prefix. SPEC.md §"🧪 Phase 3":** third checkbox reworded to `(frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)`. New paragraph spells out 👁️ is an inline prose prefix only (concrete example: `👁️ Could you take a look at viz at http://localhost:5176 …`); explicitly **not a banner block, not an operator-gate** — gate count stays at 2 per CORE-065's trim direction.
- **R3 — 🟢 commit-go prompt. SPEC.md §"Post-closure protocol" step 1:** added one paragraph noting the commit-go prompt at the bottom of the bundle carries a `🟢` emoji prefix (concrete example: `🟢 Reply commit / go to land.`) so the call-to-action stands out under the closure-review tables. Cohort precedent: SCRATCHPAD listed 🟢 first (over 🚦); single-glyph for render reliability.
- **R4 — Plain-English-first recap. SPEC.md §"🚀 Phase 4: Closure":** recap paragraph reshaped to "two-pass summary leading with 1-2 plain-English sentences of *what the task accomplished*, then technical detail (file paths, LOC, key decisions, plus optional verification request)". §"Recap is recap-only" callout updated to clarify the two-pass shape stays inside the recap-only constraint (no next-task suggestion). §"Post-closure protocol" step 1 bundle entry restated with the same shape.
- **/task SKILL.md edits** (3 hunks): Step 4 last bullet (Phase 1→2 cue carries mandatory preview line); Step 5 Phase 3 + Phase 4 bullets (👁️ prefix mention + recap two-pass shape); Step 6 (📦 banner mandatory preview + recap two-pass shape + 🟢 commit-go prompt).
- **/epic-discovery SKILL.md edits** (3 hunks): Step 6 last line (Phase 1→2 banner preview); Step 9 recap-draft bullet (two-pass shape); Step 10 (📦 banner preview + recap two-pass + 🟢 commit-go).
- **/close-epic SKILL.md edits** (4 hunks): Step 4 last line (Phase 1→2 banner preview); Step 7 recap-draft bullet (two-pass shape); Step 9 first bullet (📦 banner preview + recap two-pass); Step 9 4th bundle item (🟢 commit-go prompt).
- **`templates/tasknote-template.md` edit** (1 hunk): Phase 3 third box synced to new SPEC wording (`(frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)`). Strict-entailment edit beyond stated scope, same precedent as CORE-065 — the template ships the canonical phase checklist; out-of-sync drift would propagate to every new tasknote scaffold. Documented here.
- **CORE-067 follow-up filed** under `## Medium` immediately after CORE-066: `**CORE-067** [opus] | gate-UX check-in — Deferred check-in after [[CORE-066]] R1–R4 see use across 2-3 task closures. Re-evaluate gate-count, bundle ergonomics (recap two-pass shape, preview-line clarity, 🟢/👁️ prefix utility), and whether the workflow still feels overly gated. Adjust SPEC + SKILLs only if real friction surfaced — otherwise close as no-op.` (~45 words; under 50w target).
- **Out-of-scope skills (`/release`, `/micro-task`, `/file-followup`, `/starter-task`)** untouched. Same precedent CORE-059 / CORE-065 set: extension skills inherit conventions on next pass when they next see edits. `/release` in particular has its own commit-go + tag/push gates that are structurally different (Step 7.4/7.5); folding R1/R3/R4 there would expand scope beyond the SCRATCHPAD bullets.
- **No tests added** — pure markdown / SKILL prose edits; no executable code surface.
- **Diff stat:** 6 files changed, +62/-29 (SPEC.md +47/-11, /task SKILL.md +6/-3, /close-epic +6/-3, /epic-discovery +6/-3, _project/PLAN.md +2/-0, templates/tasknote-template.md +1/-1). Comparable in magnitude to CORE-065's 5-file/+118/-81 envelope; CORE-066 carries less prose because each refinement is a smaller insertion than the gate-trim it builds on.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure markdown / SKILL prose edits — no executable code surface. Test suite N/A.
- Lint substitute: grep verification across the 5 edited files confirmed (1) AWAITING APPROVAL banners use only the canonical 🛠️ + 📦 emoji (3 hits in SPEC, none in SKILLs); (2) 👁️ references are inline only (5 hits across SPEC + template + /task SKILL — no banner-block usage); (3) 🟢 commit-go prompt references appear in all 3 SKILLs + SPEC §"Post-closure protocol" step 1 (4 new hits, alongside 6 pre-existing nav-header status-chip uses unchanged); (4) cross-refs to `SPEC §"Operator-gate cues"` still resolve across 6 SKILL hits (canonical heading text unchanged); (5) no trailing whitespace introduced.
- Markdown mental-pass over edited blocks: banner-format code block balanced (open `---` / blank line / emoji-label line / blank line / preview line / blank line / close `---`); §"Operator-gate cues" 2-row gates table column-alignment intact; emoji-glyph parity (🛠️ 📦 👁️ 🟢) consistent across SPEC + 3 SKILLs + template; no broken fenced blocks.
- Frontend N/A — no UI changes. R2 (👁️ prefix) is itself the convention for *future* frontend visual-confirmation asks; CORE-066 has no UI surface to confirm against. Phase 3 third box also synced to new template wording (the tasknote was scaffolded before the template updated).
- `git diff --stat`: 6 files changed, +62/-29 (SPEC.md +47/-11, /task SKILL.md +6/-3, /epic-discovery +6/-3, /close-epic +6/-3, _project/PLAN.md +2/-0, templates/tasknote-template.md +1/-1).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

| Entry | Verdict |
|---|---|
| `README.md` | no change — public-facing repo overview; gate-UX refinements are SPEC-internal, not adopter-facing |
| `SPEC.md` | **updated** — §"Operator-gate cues" banner format extended with mandatory preview-line slot (R1); §"🧪 Phase 3" 👁️ prefix on visual-confirmation ask (R2); §"🚀 Phase 4: Closure" recap reshaped to plain-English first then technical + "Recap is recap-only" callout restated (R4); §"Post-closure protocol" step 1 banner-preview reference + recap shape + 🟢 commit-go prompt (R1+R3+R4) |
| `docs/MIGRATION.md` | no change — adoption procedure unchanged; adopters pick up the refinements on next version bump |
| `claude/CLAUDE-snippet.md` | no change — snippet wires skills; banner / recap / cue conventions surface from SPEC + SKILLs at runtime, not from the snippet text |

**Final Summary:**

Workflow gate banners and recap got a small UX layer so approvals show what's about to run and post-task recaps lead with intent before file paths. Four refinements landed: R1 (mandatory 1-2 sentence plain-English preview line inside both 🛠️ + 📦 banners, above the closing `---`), R2 (👁️ inline prefix on Phase 3 frontend visual-confirmation prose asks — emoji only, no banner block, no third gate), R3 (🟢 emoji prefix on the commit-go prompt at the bottom of the 📦 bundle so the call-to-action stands out under the closure-review tables), R4 (recap reshaped into a two-pass summary leading with 1-2 plain-English sentences of *what the task accomplished*, then technical detail — file paths / LOC / key decisions + optional verification ask).

_Technical:_ SPEC.md updated in 4 hunks (§"Operator-gate cues" banner-format + mandatory-preview prose; §"🧪 Phase 3" checkbox + 👁️ paragraph; §"🚀 Phase 4: Closure" recap paragraph + callout; §"Post-closure protocol" step 1 expanded). `/task`, `/epic-discovery`, `/close-epic` SKILLs each updated at every gate-emit / recap-draft / bundle-description point (3-4 small hunks each). `templates/tasknote-template.md` Phase 3 third box synced for R2 — strict-entailment edit to keep new tasknote scaffolds in step with SPEC (CORE-065 set the same precedent for Phase 4's third box). CORE-067 follow-up filed under `## Medium` for a deferred check-in after R1–R4 see use across 2-3 task closures (re-evaluate gate-count + bundle ergonomics; close as no-op if no real friction). `/release`, `/micro-task`, `/file-followup`, `/starter-task` deferred — same out-of-scope pattern as CORE-059 / CORE-065. Diff stat: 6 files changed, +62/-29. No new behavioral gates introduced or removed; same approval moments, sharper UX. Verification ask: skim SPEC.md §"Operator-gate cues" for the banner-format block + mandatory-preview prose, and SPEC.md §"Post-closure protocol" step 1 for the new bundle shape.

**Archived:** 2026-05-10
