---
title: conditional-phase2-gate
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: [CORE-066, CORE-067, CORE-065, CORE-059]
---

# CORE-087 | conditional-phase2-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-066]] · [[CORE-067]] · [[CORE-065]] · [[CORE-059]]

## 🎯 Goal

Skip the 🛠️ Phase 1→2 operator-gate banner when Discovery's clarifying-questions checkbox was logged via the "No clarifications needed" branch — flow straight from Phase 1 into Phase 2 Execution after a brief one-line marker, so unambiguous tasks don't pause for a redundant approval.

## ✅ Acceptance

- [ ] **C1 — SPEC §"Operator-gate cues" gates table** updated so the 🛠️ Phase 1→2 row is marked *conditional* with one-line skip rule pointing at the §"📝 Phase 1: Discovery" exit gate for the full contract.
- [ ] **C2 — SPEC §"Operator-gate cues" intro prose** notes that 🛠️ may be skipped when Discovery surfaced zero clarifications; the 📦 ready-to-commit gate stays unconditional. Net gate count drops from 2 to 1-or-2 depending on Discovery shape; nominal count language ("two operator-gate banners") softened to "up to two".
- [ ] **C3 — SPEC §"📝 Phase 1: Discovery" exit gate paragraph** carries the canonical skip rule: when the clarifying-questions box was ticked via the "No clarifications needed" branch (i.e., zero AskUserQuestion + zero prose asks during Discovery), the assistant emits the inline transition marker `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` and proceeds into Phase 2 without the 🛠️ banner. Otherwise (clarifications surfaced and were resolved), the 🛠️ banner fires as before.
- [ ] **C4 — /task SKILL.md Step 4 last bullet** reshaped to the conditional form: check the Phase 1 "No clarifications needed" branch first; on skip, emit the inline marker + start Step 5 Phase 2 immediately; on no-skip, emit the 🛠️ banner with preview line and wait for go.
- [ ] **C5 — /epic-discovery SKILL.md Step 6 conclusion** (line 144) same reshape — conditional banner + inline marker on skip.
- [ ] **C6 — /close-epic SKILL.md Step 4 conclusion** (line 127) same reshape — conditional banner + inline marker on skip.
- [ ] **C7 — Skip rule binds to the Phase 1 checklist branch** (per AskUserQuestion 2026-05-14 Q2): the signal is the "No clarifications needed" branch of the Phase 1 box, not a raw count of AskUserQuestion calls. Re-scope/De-scope deliberations and prose asks that reshape the work all count as "clarifications surfaced" and keep the gate.
- [ ] **C8 — Transition marker shape locked** (per AskUserQuestion 2026-05-14 Q3): inline single-line `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` Emitted as plain prose, not a banner block. Not a new gate.
- [ ] **C9 — Out-of-scope skills** (`/release`, `/micro-task`, `/file-followup`, `/starter-task`) untouched — same deferral pattern as CORE-059 / CORE-065 / CORE-066. `/micro-task` has no Phase 1→2 gate (single-section shape); `/release`, `/file-followup`, `/starter-task` don't drive the 4-phase workflow.
- [ ] **C10 — Templates** — `templates/tasknote-template.md` Phase 1 checklist is the canonical contract surface; verify the "Asked clarifying questions OR logged 'No clarifications needed'" wording stays exact so the skip rule reads cleanly off the box.
- [ ] **C11 — Phase 4 doc-drift sweep** across `_project/tasknote/README.md` §"AI-referenced docs" — SPEC.md gets the contract update; SKILLs are not in the AI-referenced doc set per `tasknote/README.md` §"AI-referenced docs".

## 🧩 Subtasks

- [ ] **S1 — SPEC.md §"Operator-gate cues" gates table** — mark the 🛠️ Phase 1→2 row *conditional* (e.g., column-wise note or new "Trigger" column with `Always` / `Skipped when Discovery surfaced zero clarifications` per row). Adjust surrounding intro prose to soften "two operator-gate banners" → "up to two" and cross-reference §"📝 Phase 1: Discovery" exit gate for the full skip rule.
- [ ] **S2 — SPEC.md §"📝 Phase 1: Discovery" exit gate paragraph** (line 310-312) — rewrite to carry the canonical conditional rule: when the clarifying-questions box was ticked via the "No clarifications needed" branch, emit the inline marker `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` and proceed; otherwise fire the 🛠️ banner per §"Operator-gate cues" and wait. Spell out that the marker is inline prose, not a banner, and not a new gate.
- [ ] **S3 — /task SKILL.md Step 4 last bullet** (line 124) — reshape from unconditional ("Once ticked, surface the 🛠️ banner ... wait for the user's go") to the conditional form: branch on the "No clarifications needed" Phase 1 outcome → emit the inline marker + start Step 5 Phase 2 immediately, OR emit the 🛠️ banner with preview line and wait.
- [ ] **S4 — /epic-discovery SKILL.md Step 6 conclusion** (line 144) — same reshape as S3, scoped to the epic-discovery flow.
- [ ] **S5 — /close-epic SKILL.md Step 4 conclusion** (line 127) — same reshape as S3, scoped to the close-epic flow.
- [ ] **S6 — Spot-check `templates/tasknote-template.md`** — confirm Phase 1 third checkbox wording ("Asked clarifying questions OR logged 'No clarifications needed' with explicit assumptions") matches the skip-rule signal; no edit expected, sync-confirm only. Sets the precedent for adopters reading the skip rule off the template.
- [ ] **S7 — Phase 3 mental-pass** — markdown rendering (gates table column-alignment with the new column or note, no trailing whitespace, cross-refs to `SPEC §"Operator-gate cues"` + `SPEC §"📝 Phase 1: Discovery"` still resolve), emoji-glyph parity (🛠️ 📦 ✅), grep verification that no SKILL still says "Once ticked, surface the **Phase 1→2 operator-gate cue**" in the old unconditional form.
- [ ] **S8 — Phase 4 closure** — doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; PLAN.md flip to stub form; archive tasknote to `_project/tasknote/archive/core/CORE-087.md`.

## 🔗 Related

- [[CORE-066]] — predecessor; defined the R1-R4 gate-UX refinements (banner preview / 👁️ / 🟢 / two-pass recap) that this builds on
- [[CORE-067]] — confirmed R1-R4 work; PLAN.md description hinted at the deferred "overly gated" investigation that CORE-087 partially answers
- [[CORE-065]] — trimmed 4→2 gates; this is the natural next step, making the remaining 🛠️ gate conditional
- [[CORE-059]] — original banner-cue convention

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pure SPEC + SKILL prose edits over the established (one-day-old refinement of a five-day-old) gate-cue convention; no behavioral or schema changes; user has direct UX signal — the 🛠️ Phase 1→2 gate is the most-frequently-redundant pause point in the workflow (every tasknote hits it; many tasknotes have no clarifications). Low-risk UX-layer extension on top of CORE-066's R1-R4 baseline. Aligns with CORE-067's "overly gated" check-in direction.

- [x] Read relevant source files

  Read at HEAD: `SPEC.md` (full), `claude/skills/task/SKILL.md` (full), targeted greps over `claude/skills/epic-discovery/SKILL.md` + `claude/skills/close-epic/SKILL.md` (Phase 1→2 gate references), `templates/tasknote-template.md` (Phase 1 checklist shape), `_project/tasknote/README.md` (AI-referenced doc set).

- [x] **Archive skim** — `grep -l -E "Operator-gate|Phase 1.?2|gate cue|gate-cue" _project/tasknote/archive/core/*.md` returned 6 hits; load-bearing precedents are **CORE-059** (introduced 4-banner convention), **CORE-065** (trimmed 4→2; defines current baseline), **CORE-066** (added R1-R4 UX refinements: preview line, 👁️, 🟢, two-pass recap), **CORE-067** (no-op de-scope check-in; R1-R4 confirmed working — also raised the "overly gated" concern as a deferred follow-up that CORE-087 partially answers). CORE-042.6 + CORE-080 are incidental glyph hits, not load-bearing. Architecture precedent locked across CORE-059/065/066: SPEC.md is the canonical define-once, SKILLs cross-reference, templates synced for any phase-checklist text changes. CORE-087 reuses the exact pattern — smaller surface than CORE-066 (no template edit expected, just sync-confirm).

- [x] **Drift check** — all paths and concepts cited in the PLAN.md description still match HEAD:
  - SPEC.md §"Operator-gate cues" present at lines 240-281 with 2-row gates table (lines 257-260: 🛠️ Phase 1→2 + 📦 ready-to-commit).
  - SPEC.md §"📝 Phase 1: Discovery" exit gate paragraph present at lines 310-312 ("Exit gate: once every Phase 1 box is ticked, surface the Phase 2 operator-gate cue …").
  - SPEC.md Phase 1 checklist (lines 287-293) carries the canonical "Asked clarifying questions OR logged 'No clarifications needed' with explicit assumptions" box — this is the skip-rule signal source.
  - /task SKILL.md Step 4 last bullet at line 124 carries the unconditional banner-fire prose (`Once ticked, surface the **Phase 1→2 operator-gate cue** … wait for the user's go before starting Step 5 Phase 2.`).
  - /epic-discovery SKILL.md Step 6 conclusion at line 144 mirrors the same unconditional prose.
  - /close-epic SKILL.md Step 4 conclusion at line 127 mirrors the same unconditional prose.
  - `templates/tasknote-template.md` Phase 1 third box at line 45 reads `Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions` — matches SPEC; no edit needed.
  - **No drift.** Surface is exactly as the PLAN.md description scoped it; one cross-skill nuance (banner fires from /epic-discovery + /close-epic too) is resolved via AskUserQuestion below — Q1 ⇒ "All three skills".

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Resolved scoping (via AskUserQuestion 2026-05-14):**

  | Question | Answer |
  |---|---|
  | Skill scope (just /task, or all three that surface the Phase 1→2 gate?) | **All three skills** — apply to /task, /epic-discovery, /close-epic. The gate-cue contract is shared across SPEC + 3 SKILLs (per CORE-066 baseline), so a consistent skip rule keeps everything in step. PLAN.md description named /task explicitly but the contract is broader. |
  | Skip trigger (zero AskUserQuestion calls, or the Phase 1 checklist branch?) | **Phase 1 checklist branch** — skip when the Phase 1 "Asked clarifying questions OR logged 'No clarifications needed'" box was ticked via the "No clarifications needed" branch. Broader, tasknote-readable signal; covers AskUserQuestion, prose asks, and Re-scope/De-scope deliberations alike. |
  | Transition UX on skip (silent, or brief one-liner?) | **Brief one-liner** — inline `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` Plain prose, not a banner, not a new gate. Lets the user spot the phase boundary in the transcript and intervene if Discovery looks off. |

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Skip rule shape (locked):**

  | Phase 1 outcome | Phase 1→2 banner? | Transition marker |
  |---|---|---|
  | Clarifying-questions branch (AskUserQuestion fired, or prose asks surfaced) | **Fire 🛠️ banner** (per CORE-066 R1 with mandatory preview line) | n/a — banner serves as the marker |
  | "No clarifications needed" branch (zero asks; explicit assumptions logged) | **Skip 🛠️ banner** | Inline `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` |

- **Gate count semantics.** Currently the workflow has exactly 2 operator-gate banners (🛠️ + 📦). After CORE-087: the workflow has **up to 2** — 📦 always, 🛠️ conditional on Phase 1 outcome. Underlying approval-pause-points behavior is preserved (the user can still intervene at any time; the inline marker is scan-visible); only the banner ceremony adapts.
- **Re-scope/De-scope deliberations count as clarifications.** A Re-scope updates the PLAN.md line + tasknote header before continuing — that's a structural reshape that the user should greenlight via the 🛠️ banner. A De-scope jumps straight to Phase 4 closure, bypassing Phase 2 entirely (no Phase 1→2 transition; no gate to skip). These both correctly route through "clarifications surfaced" → keep banner (or no banner needed at all in De-scope).
- **`/micro-task` has no Phase 1→2 gate** (single ⚡ Notes section, not the 4-phase shape) — no surface to update. `/release`, `/file-followup`, `/starter-task` don't drive the 4-phase workflow either. CORE-087 surface stays at SPEC + 3 SKILLs (same envelope as CORE-066, minus the template edit since the template's Phase 1 checklist already carries the right wording).
- **Adopters** pick up the conditional skip on their next flowtron version bump (additive contract change; existing archived tasknotes / completed flows unaffected — the skip is a runtime convention, not a tasknote-shape change).
- **Diff envelope estimate:** ~4 files (SPEC + 3 SKILLs); SPEC carries 2 small hunks (gates table + Phase 1 exit gate paragraph); each SKILL gets ~1 small hunk (Step 4 / Step 6 conditional reshape). Magnitude smaller than CORE-066's 6-file/+62/-29 envelope since CORE-087 doesn't touch templates and the per-SKILL edits are localized to one bullet each.
- **No new tests / no executable code surface** — pure markdown / SKILL prose, same precedent as CORE-059 / CORE-065 / CORE-066.
- **CORE-087's own Discovery just surfaced 3 clarifying questions via AskUserQuestion → the 🛠️ banner fires at end of Phase 1 per the new rule.** Meta-validation: the skip rule correctly preserves the banner here, because the work shape was genuinely ambiguous.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** CORE-059 / CORE-065 / CORE-066 set the exact precedent — SPEC.md is the canonical define-once surface for the operator-gate contract; SKILLs cross-reference at each gate-fire / recap-draft / bundle-close point. CORE-087 reuses the pattern verbatim: extend SPEC's contract (gates table + Phase 1 exit gate paragraph + intro/after-table prose), then update each of the 3 SKILLs' Phase 1→2 fire bullets to branch on the new conditional. No new structure introduced; smaller surface than CORE-066 since the template's Phase 1 third checkbox already carries the right wording — sync-confirm only, no edit (S6).
- **SPEC.md edits** (4 hunks, +48/-29):
  - **§"Operator-gate cues" intro** (lines 242-247): "**two** operator-gate banners" → "**up to two**"; added one sentence noting 🛠️ is conditional and 📦 always fires, cross-referencing §"📝 Phase 1: Discovery" exit gate for the full rule; "surfaces a banner cue at each one" → "at each one that fires".
  - **§"Operator-gate cues" gates table** (lines ~260-263): added 4th "Trigger" column; 🛠️ row marked **Conditional** with one-line skip rule + cross-ref; 📦 row marked Always.
  - **§"Operator-gate cues" after-table prose**: "mandatory on both gates" → "mandatory on every banner that fires"; "After the user clears the 🛠️ gate, Phase 2 → Phase 3 → Phase 4 …" → "Once Phase 1 closes (either via the 🛠️ banner clearing or via the conditional-skip path — see §'📝 Phase 1: Discovery' exit gate), Phase 2 → Phase 3 → Phase 4 …" so the continuous-flow language no longer presupposes the banner fired.
  - **§"📝 Phase 1: Discovery" exit gate paragraph** (lines 310-312 → expanded): replaced the unconditional `Exit gate:` prose with `**Exit gate (conditional):**` + a 2-bullet branch: "No clarifications needed" → emit inline marker `✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.` + proceed; "Clarifications-surfaced" → fire 🛠️ banner per §"Operator-gate cues" as before. Marker spelled out as plain prose, not a banner block, not a new gate. Closing sentence binds the skip rule to the Phase 1 checklist branch (not a raw tool-call count) so Re-scope deliberations and prose asks both keep the banner.
- **/task SKILL.md edits** (1 hunk, +3/-1, line 124): Step 4 last bullet reshaped from unconditional banner-fire to the conditional 2-bullet form (No-clarifications → marker + Step 5 immediately; Clarifications-surfaced → 🛠️ banner + wait).
- **/epic-discovery SKILL.md edits** (1 hunk, +4/-1, line 144): Step 6 conclusion reshaped same way (Step 7 reference; epic-discovery's Phase 1 is the cohort-children-filing Discovery).
- **/close-epic SKILL.md edits** (1 hunk, +4/-1, line 127): Step 4 conclusion reshaped same way (Step 5 reference; close-epic's Phase 1 is the audit Discovery).
- **Templates spot-check (S6):** `templates/tasknote-template.md` Phase 1 third box at line 45 reads `Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions` — matches the skip-rule signal source verbatim. No edit needed.
- **Out-of-scope skills untouched:** `/release`, `/micro-task`, `/file-followup`, `/starter-task` carry no Phase 1→2 operator-gate (micro-task uses single ⚡ Notes section; release/file-followup/starter-task don't drive the 4-phase workflow). Same deferral pattern as CORE-059 / CORE-065 / CORE-066.
- **Meta-validation:** CORE-087's own Discovery surfaced 3 clarifying questions via AskUserQuestion → the 🛠️ banner correctly fired before Phase 2 per the new rule. The rule preserves the banner exactly where it adds value (genuine ambiguity) and skips it where it'd be redundant (zero ambiguity).
- **No tests added** — pure markdown / SKILL prose; no executable code surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure markdown / SKILL prose edits — no executable code surface. Test suite N/A.
- **Lint substitute** — grep verifications across the 4 edited files:
  - `git diff --check` clean (no trailing whitespace, no conflict markers).
  - No SKILL still carries the old unconditional `surface the **Phase 1→2 operator-gate cue** with the mandatory` prose at top-level — only inside the new `**Clarifications-surfaced branch**` sub-bullet of each SKILL (verified: 3 hits, all wrapped in the conditional).
  - No SPEC text still says `After the user clears the 🛠️ gate` or `**two** operator-gate banners` — both reshaped to the conditional language.
  - Cross-refs to `SPEC §"📝 Phase 1: Discovery"` resolve in all 3 SKILLs at the Phase 1 exit-gate point (6 hits total).
- **Markdown mental-pass** — gates table column alignment intact with the new "Trigger" column; sub-bullets under the new "Exit gate (conditional):" paragraph use 2-space indent with proper continuation indentation for the nested ` ```text ` fence; emoji-glyph parity (🛠️ 📦 ✅) consistent across SPEC + 3 SKILLs; fence langtag (`text`) consistent with the CORE-086 fence-langtags contract surface.
- **Frontend N/A** — no UI changes. The transition marker (`✅ Phase 1 Discovery …`) is a runtime convention for future tasknotes; CORE-087 has no UI surface to confirm.
- **Diff stat:** 4 files changed, +62/-29 (SPEC.md +48/-29, /task SKILL.md +3/-1, /epic-discovery +4/-1, /close-epic +4/-1).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

| Entry | Verdict |
|---|---|
| `README.md` | no change — public-facing repo overview; conditional-gate is SPEC-internal, not adopter-facing |
| `SPEC.md` | **updated** — §"Operator-gate cues" intro softened ("up to two") + gates table gained "Trigger" column marking 🛠️ Conditional / 📦 Always + preview-line scope clarified ("every banner that fires") + after-table flow language reshaped ("Once Phase 1 closes (either via the 🛠️ banner clearing or via the conditional-skip path …)"); §"📝 Phase 1: Discovery" exit gate paragraph replaced with `Exit gate (conditional):` 2-bullet branch (No-clarifications → inline `✅` marker + proceed; Clarifications-surfaced → 🛠️ banner + wait) |
| `docs/MIGRATION.md` | no change — adoption procedure unchanged; adopters pick up the conditional skip on next version bump |
| `claude/CLAUDE-snippet.md` | no change — snippet wires skills; gates / markers surface from SPEC + SKILLs at runtime, not from the snippet text |

**Final Summary:**

The 🛠️ Phase 1→2 operator-gate banner is now conditional: when a tasknote's Discovery surfaces zero clarifying questions, the workflow skips the approval pause and proceeds straight into Phase 2 after a brief inline marker (`✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.`). When Discovery does surface clarifications, the banner fires exactly as before. The 📦 ready-to-commit gate remains unconditional. Net effect: unambiguous tasks lose one ceremonial pause; ambiguous tasks keep the review surface.

_Technical:_ SPEC.md updated in 4 hunks — §"Operator-gate cues" intro softened ("**two**" → "**up to two**" + conditional cross-ref), gates table gained a "Trigger" column (🛠️ **Conditional** / 📦 Always), preview-line scope clarified to "every banner that fires", and the continuous-flow paragraph reshaped to not presuppose the 🛠️ banner fired; §"📝 Phase 1: Discovery" exit gate paragraph replaced with `Exit gate (conditional):` + 2-bullet branch ("No clarifications needed" → inline marker + Phase 2 immediately; "Clarifications-surfaced" → 🛠️ banner with mandatory preview line + wait). The skip rule binds to the Phase 1 checklist "No clarifications needed OR logged …" branch (not a raw AskUserQuestion call count) so Re-scope deliberations and prose asks both keep the banner. `/task` SKILL Step 4, `/epic-discovery` SKILL Step 6, and `/close-epic` SKILL Step 4 all reshaped to the same 2-bullet form (3 hunks, one per SKILL). `templates/tasknote-template.md` sync-confirmed — its Phase 1 third box already carries the canonical "Asked clarifying questions OR logged 'No clarifications needed'" wording; no edit needed. Out-of-scope skills (`/release`, `/micro-task`, `/file-followup`, `/starter-task`) untouched — same deferral pattern as CORE-059 / CORE-065 / CORE-066. Diff stat: 4 files, +62/-29. No new behavioral gates introduced; gate count drops from 2 → up to 2 (📦 always, 🛠️ conditional on Phase 1 outcome). Meta-validation: CORE-087's own Discovery surfaced 3 clarifying questions → the 🛠️ banner correctly fired before Phase 2 here, exactly as the new rule prescribes. Verification ask: skim `SPEC.md` §"Operator-gate cues" (new "Trigger" column on the gates table + softened intro/after-table prose) and §"📝 Phase 1: Discovery" exit gate (new 2-bullet conditional branch) to confirm the contract reads cleanly.

**Archived:** 2026-05-14
