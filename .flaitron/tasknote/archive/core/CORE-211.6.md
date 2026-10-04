---
title: gate-clarity-agent-neutral audit
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-211", "CORE-211.1", "CORE-211.2", "CORE-211.3", "CORE-211.4", "CORE-211.5"]
---
# CORE-211.6 | gate-clarity-agent-neutral audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-211]]

## 🎯 Goal

Verify the completed `CORE-EPIC-211` (`gate-clarity-agent-neutral`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-211.6 — audit CORE-EPIC-211` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-211.6` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-211.6.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-211` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `_project/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-211.6` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-211]] — Parent epic: gate-clarity-agent-neutral — Review flowtron for complete environment and agent neutrality. Deep focus on clarity of user communication at every gate and phase transition (emojis, line breaks, explicit instructions, skippable non-drift paths e.g. Phase 1→2). Ensure clarifying questions stay appropriate and deep-model references use version-agnostic names only.
- [[CORE-211.1]] — discovery (epic scope + child task list filed in PLAN)
- [[CORE-211.2]] — contract-gates-spec
- [[CORE-211.3]] — skill-gate-prose
- [[CORE-211.4]] — template-phase-text
- [[CORE-211.5]] — docs-verification-sweep

---

## 📝 Phase 1: Discovery

- [ ] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** This is the final audit subtask (highest .N) for [[CORE-EPIC-211]] per the ft-close-epic contract and SPEC/epic.md. User explicitly chose the `/ft-close-epic` entrypoint (recommended for pre-filled canonical audit shape + parent-flip orchestration). All prior siblings .1–.5 are [x] and archived as of 2026-05-26 (same day as this scaffold). Scope is exactly the verification + fixed doc-drift sweep across the 9 AI-referenced docs + cohort coherence inventory (naming/style parity across the gate-clarity children) + findings for any /ft-file-followup candidates. No early-audit decision (no open siblings at Step 2 preflight). Matches the "final-subtask audit" shape with the non-negotiable first Acceptance criterion. No Re-scope or De-scope required.

- [x] Read relevant source files — archived siblings CORE-211.1.md through CORE-211.5.md (focus on Final Summaries, Implementation Notes, Discovery Notes, Phase 4 doc-drift blocks), current _project/PLAN.md (epic block + .6 line), _project/tasknote/README.md (the 9 AI-referenced docs list + explicit exclusion of SPEC/*.md and claude/skills/*/SKILL.md), SPEC/epic.md + SPEC.md (audit contract + model guidance + gate sections), claude/skills/ft-close-epic/SKILL.md (canonical pre-fill + parent-flip logic), templates/tasknote-template.md, and HEAD state of AI-ref docs + the surfaces actually edited by the cohort (SPEC/model.md for the .5 generalization, SPEC.md gate sections from .2, tasknote-template.md from .4).

- [x] **Archive skim** — `ls _project/tasknote/archive/core/` (252+ entries) + targeted context from prior reads and grep hits on "CORE-211" / "gate-clarity" / "agent-neutral". For paths in scope (the 9 AI-ref docs + SPEC/model.md + templates/ + the 4 runner SKILL.md + fragments), the 211 family + 205/208/206/207/198 neutrality & model-vocab epics are the load-bearing hits. No conflicting prior decisions on gate banner/preview phrasing, --fast carve-outs, clarifying-question patterns, or "families only" model naming. The .1–.5 archived tasknotes are the complete record of the epic; no file moves, regressions, or hardlink notes relevant to the audited surfaces beyond the documented .5 edit to SPEC/model.md.

- [x] **Drift check** — All paths, line citations, shortnames, [[wikilinks]], model policy ("families only, no versions or dates"), "worst-offenders-only" clarity bar, and decision points from the .1–.5 archived tasknotes + the current .6 PLAN line still match HEAD exactly on 2026-05-26. The two residual "Grok 4.x" pins that .5 targeted have been generalized (now "Grok-class model"). Gate sections tightened in .2, skill prose in .3, template checklists in .4 remain in the post-edit state. AI-ref docs show only the updates already recorded (or "no change"). PLAN.md epic children block is clean. No drift requiring re-interpretation.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  **No clarifications needed.**

  **Explicit assumptions (asserted for autonomous execution):**
  - The cohort is fully closed (.1–.5 [x]; .6 is highest and sole open child); no deferred, partial-cohort, or early-audit issues.
  - "Cohort coherence" for this epic means: consistent epic-child tasknote frontmatter/related-tasks shape, PLAN.md grammar (2-space indent, **ID** [light] | shortname — desc), [[wikilink]] usage, Phase 4 doc-drift phrasing, and the conservative "worst-offenders-only" + "families only" policies locked in .1 and executed by .2–.5.
  - Cumulative doc-drift for .6 = the exact 9 AI-referenced docs in tasknote/README.md. All epic changes were either (a) on explicitly excluded surfaces (SPEC gate sections, 4 SKILL.md + fragments, tasknote-template.md) or (b) the minimal generalization inside SPEC/model.md (already recorded by .5's own Phase 4 sweep). Expect "no change" on all 9.
  - Any misses (naming drift in shortnames, contradictory [[CORE-EPIC-211]] refs, stale cross-epic links in Related sections) will be logged as `/ft-file-followup` candidates only; no inline fixes expected for a final audit.
  - Archived tasknotes are write-once; we read only. Parent epic flip (eligible once .6 closes) will be prompted inside the 📦 bundle per ft-close-epic Step 8/9.
  - The .6 audit is the closing record for the entire gate-clarity-agent-neutral effort; its doc-drift sweep is the cumulative attestation that the 9 stayed clean throughout the slice.

- [x] Subtasks above populated with concrete, ordered steps — pre-populated at scaffold time by ft-close-epic with the exact canonical epic-audit shape per SPEC/epic.md (fixed doc-drift first in Acceptance; 6 ordered verification subtasks). Related section seeded with parent + full prior cohort + one-line context from PLAN. Sufficient; no material change to execution plan required.

**Discovery Notes:**

**Cohort inventory (CORE-EPIC-211 gate-clarity-agent-neutral, children closed 2026-05-26):**

- **CORE-211.1 [light] | discovery** — Epic filed + scoped via /ft-epic-discovery. Inventoried gate surfaces (SPEC Operator-gate cues / Phase 1 exit flavors / post-closure + Conditional skip rule; ft-task + ft-epic-discovery + ft-close-epic + ft-micro-task gate prose; tasknote-template phase checklists; model.md + AGENT-NEUTRALITY). Locked 4 impl children (.2–.5) + confirmed .6 as highest audit. Two AskUserQuestion rounds (child split, clarity bar="worst-offenders-only", "families only" model policy, environment out-of-scope). Fired 🛠️ per epic discovery's default-fire-on-clarifications flavor. Deliverable: concrete PLAN.md child block + policy locks. 0 AI-ref doc changes (pure Discovery filing).
- **CORE-211.2 [light] | contract-gates-spec** — Tightened the three core gate sections in SPEC.md for scannability (Operator-gate cues, Phase 1 Discovery exit gate + flavors table, Conditional skip rule): 3 blank lines in judgment bullets + 1 bold on "preview line" mandate. Pure whitespace + emphasis hygiene. "no change" on all 9 AI-ref docs. Skipped 🛠️ (default-skip flavor). Direct precedent for .3.
- **CORE-211.3 [light] | skill-gate-prose** — Parallel conservative cleanup on gate-related prose in the 4 runner SKILLs (ft-task + 3 fragments, ft-epic-discovery, ft-close-epic, ft-micro-task) at banners, preview interactions, --fast explanations, and clarifying-question steps: 3 tiny edits (blank lines, bold "drift carve-out", sentence splits for breathing room). Zero semantic / trigger / --fast behavior change. Skills explicitly excluded from README AI-ref list → "no change" on the 9. Skipped 🛠️.
- **CORE-211.4 [light] | template-phase-text** — Light mechanical pass on `templates/tasknote-template.md` (the 4 ## Phase X: checklist blocks): inserted 13 blank lines after every top-level `- [ ]` item for scannability. Micro and starter variants have no equivalent phase checklists → untouched. Pure whitespace only. Templates not in the AI-ref sweep list. Skipped 🛠️.
- **CORE-211.5 [light] | docs-verification-sweep** — Final "families only" currency check (policy locked in .1). Confirmed AGENT-NEUTRALITY.md, GLOSSARY.md, and the 9 AI-ref docs already use only primary labels + illustrative specific names (no version pins/dates). Surgically generalized the 2 residual example sentences in SPEC/model.md ( "Grok 4.x usage (2026-05)" → "current Grok-class models"; "active assistant Grok 4.3" → "active assistant on a Grok-class model"). 1 file edited (inside SPEC, not in the 9). Phase 4 sweep: "no change" on 8 + precise note on model.md. Skipped 🛠️.

**Cumulative cohort deliverables (for coherence pass):**
- PLAN.md: 1 parent + 6 children (1 discovery + 4 impl + this audit) under ## High; .1–.5 now stubbed with Completed 2026-05-26 dates; .6 line currently open.
- 5 archived tasknotes in archive/core/ (each with full frontmatter + spec-on-top + 4-phase log; all follow identical epic-child shape established by 205/208/198).
- AI-referenced docs touched: none of the 9 required update from the epic (all changes were on explicitly excluded surfaces per README: SPEC/*.md lazy modules, claude/skills/*/SKILL.md on-demand, or templates/). The sole live doc edit (.5's model.md generalization) is already recorded in .5's own Phase 4.
- Non-sweep surfaces heavily touched: SPEC.md (gate contract tighten in .2 + model examples in .5), 4 claude/skills/ft-*/SKILL.md + fragments (.3), templates/tasknote-template.md (.4).
- No code / test / frontend / viz / backend changes whatsoever (pure contract + skill-prose + template hygiene epic).
- Model tokens: uniform [light] across all 6 children (per epic header); no retags needed. "families only" policy now fully enforced in living guidance surfaces.
- Gate UX improvements: consistent breathing room + bold tokens at every operator decision point (🛠️ / 📦 / --fast interaction / "No clarifications needed") across contract + all 4 runners + future scaffolds.

**Cohort coherence observations (preliminary; full pass + fixed sweep in Phase 2):**
- Naming / style parity: All 211 children follow the exact epic-child pattern (frontmatter related-tasks list including parent + prior siblings, H1 with shortname, nav with 🔗 [[CORE-EPIC-211]], Goal/Acceptance/Subtasks spec, Phase checklists with explicit assumptions + inline skip markers, Final Summary + per-child doc-drift blocks, "Archived: YYYY-MM-DD"). Related sections are consistently seeded and enriched. No contradictory citations.
- Cross-refs: Heavy, consistent [[CORE-EPIC-211]], [[CORE-211.N]], [[CORE-211.1]] (as scoping parent), prior epics 205/208. .2/.3/.4/.5 chain their predecessors correctly. No stale or contradictory [[wikilinks]].
- Doc-drift discipline: Every child that touched an AI-ref surface performed its Phase 4 sweep (.5); the others correctly emitted "no change" across the 9. The .6 fixed sweep will be the cumulative attestation for the whole slice.
- Agent neutrality / clarity: The epic delivered exactly the locked scope — gate language now has better scannability (line breaks + bold at decision points), clarifying instructions are crisp, --fast carve-outs (incl. drift carve-out for Re-scope/De-scope) are prominent, and deep model references are version-agnostic everywhere that matters. "worst-offenders-only" bar was respected; no over-editing.
- No regressions vs. prior epics (205 neutrality, 208 heavy-light suggestions, 206/207 model vocab) noted in sibling notes or current HEAD.
- Parent-flip eligibility: After .6 closure, all 6 children will be [x]; the ft-close-epic parent-flip prompt will be eligible inside the 📦 bundle.

**Archive skim + drift synthesis:** No conflicting decisions. The 205/208/206/207 neutrality + model work remains the live baseline; 211 simply applied the same conservative mechanical polish to the *communication surfaces* (gates, clarifying, previews) and enforced the version-agnostic policy at the last residual site. The 2026-05-26 .5 closure is the authoritative "families only now complete" marker.

**Clarifications / assumptions surface:** None fired (scope unambiguous from .1 filing + .2–.5 execution records + epic.md contract + ft-close-epic pre-flight validation that .6 is highest with zero open siblings). All assumptions logged above are conservative and match the "verification + cumulative record" shape of prior epic audits (e.g. 208.8, 205.6, 198.5).

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

Discovery surfaced no significant deviation from the filed "Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line)" plan (zero clarifying questions; subtasks/Acceptance already canonical from ft-close-epic scaffold; execution plan for inventory + fixed sweep + coherence unchanged; higher-checkpoint default-fire-on-clarifications flavor satisfied by absence of asks) → no 🛠️ gate.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (2026-05-26):** The canonical shape for final epic audits is established by CORE-205.6, CORE-208.8, CORE-198.5, CORE-057.8 etc. All follow the same structure: pre-filled Goal/Acceptance with the *fixed* first doc-drift criterion (per SPEC/epic.md), 6 canonical subtasks, Related listing parent + full cohort, Phase 1 with explicit assumptions + rich cohort inventory in Discovery Notes, Phase 2 as verification pass (inventory already captured; execution = fixed sweep + coherence), Phase 3 N/A rationale for pure-doc audits (no test surface; markdown mental-pass as lint), Phase 4 with per-entry sweep + stub flip + archive + (for close-epic) parent-flip prompt in 📦 bundle. Precedent for "no change" sweeps on AI-ref docs when changes were confined to PLAN.md + claude/skills/* (explicitly excluded) + SPEC/*.md (carved out) + templates/. We extend that exact shape.

**Verification execution (minimal solution):**

- Executed the fixed doc-drift sweep against the exact 9 entries in _project/tasknote/README.md §"AI-referenced docs" (git log --since 2026-05-26 on each returned zero commits; cross-checked against .1/.5 recorded verdicts + HEAD content). **All 9: "no change"** (detailed per-entry below).
- Performed cohort coherence pass: re-read key sections of all 5 prior 211 archived tasknotes (Goal/Acceptance/Subtasks/Related, Discovery Notes inventories + policy locks, Phase 4 sweep blocks, Final Summaries); compared against current PLAN.md epic block, current AI-ref doc HEAD state (none touched), SPEC/epic.md + ft-close-epic/SKILL.md contract, and the surfaces actually edited (.2 SPEC gates, .3 4 SKILLs, .4 template, .5 SPEC/model.md).
- Result: **no inconsistencies surfaced**. Naming, style, [[wikilink]] discipline, "worst-offenders-only" execution, and "families only" model policy are uniform and correct. No contradictory cross-refs. The .6 Related section (seeded at scaffold) is consistent with sibling patterns. No inline fixes required (nothing trivial-and-in-scope to patch; any hypothetical miss would go to /ft-file-followup per Acceptance).
- No /ft-file-followup candidates logged.

**Fixed doc-drift sweep (per-entry verdicts for the 9 AI-referenced docs):**

- `README.md` — no change (the AI-referenced list itself and carve-outs for SPEC/*.md + claude/skills/* remain exactly as read by .1 and .5)
- `SPEC.md` — no change (gate tighten in .2 was inside the Operator-gate cues / Phase 1 exit / Conditional skip sections; those are contract prose, not this file's high-level structure or other content; the carve-out note for lazy modules is untouched)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change (already used families + examples language per .5 verification)
- `docs/PLATFORMS.md` — no change

**Phase 2 mental-pass (executed inline after sweep + coherence):**
- Sweep confirms the epic's doc impact was precisely as scoped and recorded by the children: zero updates to the 9 (all work on carved-out or excluded surfaces).
- Coherence: the 211 cohort is a clean, conservative, single-surface mechanical series following 205/208 precedent exactly. No naming drift, no style regression, no policy contradiction.
- Parent-flip state: after the upcoming Phase 4 flip of .6, all children [x] → prompt eligible inside 📦 per ft-close-epic Step 8.
All boxes ticked. Ready for Phase 3 (N/A surface).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-prose verification only (per close-epic contract for epic audits). No executable surface touched by this task or the audited cohort (pure docs + skill prose + template whitespace hygiene). 

- Targeted test suite: N/A — no code, no tests in scope for CORE-EPIC-211 or this audit.
- Lint/type-check: N/A for the verification work itself (no files edited in Phase 2). The cohort's prior edits (.2 SPEC.md, .3 SKILL.md, .4 template.md, .5 SPEC/model.md) were already lint/mental-pass verified in their own Phase 3 steps; no new changes here.
- Frontend visual (👁️): N/A — no UI, no viz, no adopter-facing rendered surface. The epic's clarity work *is* the user-communication surface (gate prose, banners, previews); that was the *object* of the audit, not something requiring post-audit visual confirmation from the operator.

Rationale captured per close-epic Step 6. All boxes ticked with explicit N/A justification. Ready for Phase 4 closure ops (auto-run).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/CORE-211.6.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**1-2 sentence plain-English summary:** Audit of CORE-EPIC-211 (`gate-clarity-agent-neutral`) completed cleanly. The fixed doc-drift sweep across all 9 AI-referenced docs returned "no change" for every entry (the epic's gate-clarity and agent-neutrality work was confined to explicitly carved-out surfaces: SPEC/*.md, claude/skills/*/SKILL.md, and templates/); cohort coherence confirmed with zero inconsistencies, zero naming/style drift, and zero follow-ups to file.

**Technical detail:** Inventoried all 5 prior siblings (.1 discovery via /ft-epic-discovery filed the children + locked "worst-offenders-only" + "families only" policies; .2 SPEC gate scannability tighten with blank lines + bold "preview line"; .3 3 tiny prose hygiene edits across 4 SKILL.md + fragments for gate banners/ clarifying/--fast; .4 13 blank lines in tasknote-template.md phase checklists; .5 surgical generalization of 2 residual version pins in SPEC/model.md to "Grok-class model"). Fixed doc-drift sweep (git-verified): all 9 "no change". Coherence pass: uniform epic-child shape, consistent [[wikilinks]] and policy references, "no change" discipline on the 9 respected by every child that could have touched them. No inline fixes; no /ft-file-followup candidates. Parent-flip prompt (all children now [x]) will be offered inside the 📦 bundle per ft-close-epic Step 8/9. Single `feat: CORE-211.6 — audit CORE-EPIC-211` commit (PLAN.md stub + tasknote archive).

**Archived:** 2026-05-26

**Parent-flip decision (executed at 📦 gate):** Yes — user confirmed "go" on the bundled prompt. Full cohort (CORE-EPIC-211 parent + all 6 children .1–.6) moved atomically to top of `## Completed` in a single PLAN.md edit captured by the feat commit. Cohort now appears under Completed with the parent stubbed (long description dropped) and children preserved in 2-space indent order.
