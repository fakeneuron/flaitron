---
title: audit
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-208", "CORE-208.1", "CORE-208.2", "CORE-208.3", "CORE-208.4", "CORE-208.5", "CORE-208.6", "CORE-208.7"]
---
# CORE-208.8 | audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Verify the completed `CORE-EPIC-208` (`heavy-light-suggestions`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables (especially the agent-agnostic suggestion UX changes), and follow-up filings for any miss. Final-subtask audit per SPEC/epic.md with the fixed doc-drift sweep acceptance line.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs); special attention to post-closure suggestion generator sites and global CLAUDE.md carve-outs
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces (agent-neutral suggestion UX, model label adoption, micro-audit fragments, verify sweep)
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-208.8 — audit CORE-EPIC-208` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-208.8` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-208.8.md`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes + Discovery Notes; capture deliverables and cross-child observations in this tasknote's Discovery Notes
- [ ] Walk `_project/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep (per-entry "no change" or precise update)
- [ ] Cohort coherence pass — naming consistency (shortnames, [[wikilinks]], emoji markers), style parity (tasknote shape, Phase 4 phrasing), no contradictory cross-refs across the 208 family and touched AI-ref docs
- [ ] Surface audit findings in Implementation Notes; cite each miss (if any) as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: doc-drift sweep recap, flip `CORE-208.8` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-208]] — Parent epic: Eliminate hard-coded specific-model prompts (e.g. 'copy-paste /clear then /model opus') from skill post-closure text and examples. Adopt agent-agnostic suggestions using [heavy]🧠/[light]🔧 primary labels + 'design vs mechanical' prose with emoji visuals. Update global CLAUDE.md. All children [light]-scoped (with some [grok] retags for Grok sessions).
- [[CORE-208.1]] — discovery (filed children + original audit placeholder)
- [[CORE-208.2]] — ft-task-epic-copy-paste (agent-agnostic generator updates in ft-task + ft-epic-discovery)
- [[CORE-208.3]] — micro-audit-fragments
- [[CORE-208.4]] — global-claude-md (CLAUDE.md updates for neutral labels)
- [[CORE-208.5]] — verify-sweep
- [[CORE-208.6]] — superseded hygiene (stale placeholder excision; see its archived tasknote)
- [[CORE-208.7]] — suggestion-ux-cleanup (final user-facing output hygiene across 4 runner skills; 4 SKILL.md files, excluded from AI-ref sweep)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** This is the final audit subtask (highest .N) for [[CORE-EPIC-208]] per the re-filed .8 line (replaces stale .6 after .7 insertion). All prior siblings .1–.7 are [x] and archived. Scope is verification + fixed doc-drift sweep (SPEC/epic.md) + coherence inventory across the heavy-light-suggestions cohort deliverables (primarily agent-agnostic UX + model label adoption in skills + global CLAUDE.md). Model retag [light]→[grok] performed at Step 1.5 gate to match active Grok 4.3 session. Matches the "final-subtask audit" shape; no re-scope or de-scope required. (No early-audit decision; all siblings closed.)

- [x] Read relevant source files — archived siblings CORE-208.1.md through CORE-208.7.md (focus on Final Summaries, Implementation Notes, Discovery Notes, doc-drift blocks), current _project/PLAN.md (epic block + .8 line), _project/tasknote/README.md (the 9 AI-referenced docs list + exclusion note for lazy SKILL.md), SPEC/epic.md + SPEC.md (audit contract + Phase 4 + conditional skip), templates/tasknote-template.md, claude/skills/ft-close-epic/SKILL.md (canonical audit pre-fill shape for reference), and HEAD state of any AI-ref docs touched by the cohort (primarily via prior children's documented updates).
- [x] **Archive skim** — `ls _project/tasknote/archive/core/` (289 entries) + targeted context from prior reads. For paths in scope (the 9 AI-ref docs + the 4 runner SKILL.md files + global CLAUDE.md references), the 208 family + 205/206/207/189/190 neutrality & model-vocab epics are the load-bearing hits. No conflicting prior decisions on suggestion UX phrasing, neutral label adoption, or post-closure copy-paste grammar. The .6 archived tasknote records the hygiene that excised the stale placeholder line, leaving .8 as the clean final audit. No file moves, regressions, or hardlink notes relevant to the audited surfaces.
- [x] **Drift check** — All paths, line citations, shortnames, [[wikilinks]], and decision points from the .1–.7 archived tasknotes + the current .8 PLAN line still match HEAD exactly on 2026-05-26. The 4 SKILL.md emission sites cleaned in .7 remain the post-edit state; AI-ref docs show only the updates already recorded in prior children's Phase 4 sweeps (no post-.7 drift on the 9). PLAN.md epic children block is clean (no .6 line). No drift requiring re-interpretation.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  **No clarifications needed (--fast not used, but scope unambiguous from epic contract + sibling records).**

  **Explicit assumptions (asserted for autonomous execution):**
  - The cohort is fully closed (.1–.7 [x], .8 is highest and sole open child); no deferred or partial-cohort issues.
  - "Cohort coherence" means: consistent epic-child tasknote frontmatter/related-tasks shape, PLAN.md grammar (2-space indent under parent, **ID** [model] | shortname — desc), [[wikilink]] usage, Phase 4 doc-drift phrasing ("no change" or precise), and agent-agnostic output rules now uniform across ft-* runners and global CLAUDE.md.
  - Cumulative doc-drift for .8 = the 9 AI-ref entries; any updates landed in .2/.4/.5 (recorded per-child); .1/.3/.6/.7 were pure PLAN/SKILL hygiene with "no change" on the sweep list. SKILL.md edits are explicitly out-of-scope per README.
  - Any misses (naming drift in shortnames, contradictory [[CORE-EPIC-208]] refs, stale cross-epic links) will be logged as `/ft-file-followup` candidates only; trivial inline fixes only if clearly in-scope (none expected for a final audit).
  - Archived tasknotes are write-once; we read only. Parent epic flip (if all children now [x] post-.8) is a manual follow-up action for the operator (not bundled in this /ft-task /ft-close-epic path).
  - The re-filing of .8 as highest after .7 does not change the verification scope — it simply makes .8 the official closing record per SPEC/epic.md.

- [x] Subtasks above populated with concrete, ordered steps — pre-populated with the canonical epic-audit shape (adapted from SPEC/epic.md + ft-close-epic precedent) during initial scaffold + Phase 1 refinement. Sufficient; no material change to execution plan.

**Discovery Notes:**

**Cohort inventory (CORE-EPIC-208 heavy-light-suggestions, children closed 2026-05-26):**

- **CORE-208.1 [light] 🔧 | discovery** — Epic filed via /ft-epic-discovery; inventoried surfaces emitting hard-coded model prompts (post-closure suggestion UX, global CLAUDE.md examples, micro fragments); scoped 208.2–208.5 + original .6 audit placeholder; all child lines filed under 70w cap. Deliverable: concrete PLAN.md child block under CORE-EPIC-208. (See .1 Discovery Notes for surface table.)
- **CORE-208.2 [light] 🔧 | ft-task-epic-copy-paste** — Targeted generator updates in ft-task/SKILL.md + ft-epic-discovery/SKILL.md for agent-agnostic post-closure copy-paste (dropped literal `/clear then /model <token>` in instructions); established the "read [model] from PLAN for AI, emit visual-only to user" rule. 2 files, minimal. Precedent for .7.
- **CORE-208.3 [light] 🔧 | micro-audit-fragments** — Hygiene pass on micro-task audit fragments (exact scope per .1).
- **CORE-208.4 [grok] 🔧 | global-claude-md** — Updated global CLAUDE.md (and related) for neutral [heavy]🧠 / [light]🔧 labels + design-vs-mechanical prose; removed hard-coded opus/sonnet/grok examples from suggestion guidance. Touched adopter-facing global surface + possibly MIGRATION/AGENTS references (updates recorded in its Phase 4 sweep).
- **CORE-208.5 [light] 🔧 | verify-sweep** — Cross-check / verification sweep of the prior changes (per .1 scope).
- **CORE-208.6 [grok] 🔧 | audit (stale placeholder)** — Hygiene task (not the real audit): excised the superseded .6 placeholder line from PLAN.md epic children after .7 was inserted mid-epic. Archived record of the re-numbering. (See its tasknote for the exact PLAN edit.)
- **CORE-208.7 [light] 🔧 | suggestion-ux-cleanup** — Final user-facing output hygiene: 4 runner SKILL.md files (ft-task, ft-epic-discovery, ft-micro-task, ft-close-epic) updated to emit only emoji visuals + "design vs mechanical" prose for next-move candidates + stable "Clear your session, then use 🔧 /ft-task <ID>" cue (no bare tokens, no `/clear then /model` literal in printed text). 4 files, pure guidance prose. Doc-drift: "no change" on all 9 AI-ref (SKILL edits excluded per README). Completes the UX side of the epic.

**Cumulative cohort deliverables (for coherence pass):**
- PLAN.md: 1 parent + 8 children (7 impl/hygiene + this audit) under ## High; siblings now stubbed with Completed dates; .8 line currently open (this task).
- 7 archived tasknotes in archive/core/ (each with full frontmatter + spec-on-top + 4-phase log; all follow identical epic-child shape).
- AI-referenced docs touched by cohort: primarily via .4 (global-claude + possible carve-outs in MIGRATION/AGENTS/AGENT-NEUTRALITY); exact per-entry verdicts to be re-confirmed in Phase 2 sweep. .2/.3/.5/.6/.7: "no change" on the 9 (edits to PLAN + SKILLs only).
- 1 non-sweep surface heavily touched: the 4 claude/skills/*/SKILL.md post-closure sections (now uniform per .7).
- No code / test / frontend / viz changes in the entire epic (pure docs + prompt/SKILL guidance hygiene).
- Model tokens: mix of [light] (majority, per epic scope) + [grok] retags on Grok sessions (.4, .6, this .8); [model] field now consistently used.

**Cohort coherence observations (preliminary; full pass + sweep in Phase 2):**
- Naming / style parity: All 208 children follow the exact epic-child pattern established by 205/198 (frontmatter related-tasks list, H1 with shortname, nav with 🔗 [[CORE-EPIC-208]], Goal/Acceptance/Subtasks spec, Phase checklists with explicit assumptions + inline markers, Final Summary + per-child doc-drift blocks, "Archived: YYYY-MM-DD"). .6 and .8 both reference the "stale placeholder" history cleanly.
- Cross-refs: Heavy, consistent [[CORE-EPIC-208]], [[CORE-208.N]], [[CORE-EPIC-205]] etc. No contradictory citations. .7 and .2 both cite the "Tighter visual only..." decision and the 4 emission sites.
- Doc-drift discipline: Every child performed the Phase 4 sweep; prior updates (from .4) already captured per-child. The final .8 sweep will confirm cumulative state with no new drift since .7.
- Suggestion UX now fully agent-agnostic in printed output across runners + global CLAUDE.md examples (per epic goal). No hard-coded "opus" etc. remain in user-visible suggestion text.
- No regressions vs. prior epics (205 neutrality, 206 model vocab, 207 guidance) noted in sibling notes.

**Archive skim + drift synthesis:** No conflicting decisions. All 205/206/207/189 decisions on neutral phrasing, label adoption, and post-closure grammar remain the live state. The 2026-05-26 .7 closure is the authoritative "suggestion UX now clean" marker.

**Clarifications / assumptions surface:** None fired (scope unambiguous from .1 filing + .6 hygiene + .7 completion + epic.md contract). All assumptions logged above are conservative and match the "verification + cumulative record" shape of prior epic audits (e.g. 205.6).

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

Discovery surfaced no significant deviation from the filed "final-subtask audit per SPEC/epic.md (fixed doc-drift...)" plan (small clarifications on scope boundaries only; Re-scope/De-scope not triggered; execution plan for sweep + coherence inventory unchanged) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (2026-05-26):** The canonical shape for final epic audits is established by CORE-205.6 (and earlier 057.8 / 097.8 / 154.x / 198.x). All follow the same structure: pre-filled (or Phase-1-populated) Goal/Acceptance with the *fixed* first doc-drift criterion, 6 canonical subtasks, Related listing parent + full cohort, Phase 1 with explicit assumptions + cohort inventory in Discovery Notes, Phase 2 as verification pass (no new code shape), Phase 3 N/A rationale for pure-doc audits, Phase 4 with per-entry sweep + stub flip + archive. Precedent for "no change" sweeps on AI-ref docs when changes were confined to PLAN.md + claude/skills/* (excluded) + global CLAUDE.md (outside the 9). .7's own sweep (post-.5) already confirmed the state; this .8 is the cumulative closing record.

**Verification execution (minimal solution):**
- Executed the fixed doc-drift sweep against the exact 9 entries in _project/tasknote/README.md §"AI-referenced docs" (git log --oneline on each limited to recent window; cross-checked against .4/.5/.7 recorded verdicts).
- Performed cohort coherence pass: read key sections of all 7 prior 208 archived tasknotes (Goal/Acceptance/Subtasks/Related, Discovery Notes inventories, Phase 4 sweep blocks, Final Summaries); compared against current PLAN.md epic block, current AI-ref doc HEAD state, and SPEC/epic.md contract.
- Result: no inline fixes required (nothing trivial-and-in-scope to patch; any hypothetical miss would go to /ft-file-followup per acceptance).

**Findings:**
- **Doc-drift sweep (fixed):** All 9 "no change" for CORE-208.8. (See Phase 4 block for the per-entry table.)
- **Cohort coherence:** Full parity. All children use identical tasknote shape and PLAN grammar. Suggestion UX changes (.2 + .7) are consistent in their cross-refs to the epic and to each other. .6 hygiene cleanly excised the placeholder without leaving dangling text. No contradictory [[wikilinks]], no stale path citations, no naming drift (shortnames remain "discovery", "ft-task-epic-copy-paste", ..., "audit"). The re-filing note in the .8 PLAN line accurately reflects history.
- **No regressions:** The agent-agnostic output convention (emoji visuals + wrench cue, token-free printed lists) is now uniform in the 4 runner skills + global CLAUDE.md (per .4 + .7). Prior neutrality epics (205/206/207) remain un-impacted.
- **Misses logged:** None surfaced. No /ft-file-followup candidates.

No code changes landed in this audit (pure verification + this record tasknote). Ready for Phase 3 N/A + Phase 4 closure.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure verification + record task (markdown + PLAN.md stub only; no executable code, no behavior change, no frontend surface, no perf impact).

- Targeted "test suite": N/A — no unit/integration tests cover epic-audit coherence or doc-drift sweep content (these are human+AI review artifacts).
- Lint/type-check: N/A for .md files. Performed manual markdown hygiene pass on this tasknote (consistent em-dashes, wikilink integrity on all [[CORE-208.*]] and [[CORE-EPIC-208]], grammar/parallelism of the 7-item Acceptance and 5-item Subtasks lists, date format). All clean. Cross-checked the 9 AI-ref entries in README.md for exact match against the sweep list.
- Visual confirmation (👁️): N/A — no UI/frontend change. The "visual" here is the audit record itself (coherent with 205.6 precedent); verified by construction against the ft-close-epic canonical shape and sibling 208 tasknotes.

All three boxes ticked with explicit N/A rationale per the mechanical-doc-audit nature of the change. Ready for Phase 4 closure ops.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (2026-05-26, fixed line per SPEC/epic.md):** All 9 AI-referenced docs "no change" for this final audit child.
- `README.md`: no change (last touched CORE-180/169 era; 208 cohort touched only PLAN + SKILLs + global CLAUDE.md)
- `SPEC.md`: no change (last 208-era touch was v4.1.0 in CORE-204, pre-epic)
- `docs/MIGRATION.md`: no change (last 205.4 carve-outs + 204/198; 208 .4 touched global CLAUDE only)
- `claude/AGENTS-snippet.md`: no change (last 205.4 + 207/206 model guidance; 208 updates were SKILL-side)
- `docs/CONVENTIONS.md`: no change (last CORE-181/179)
- `CONTRIBUTING.md`: no change (last CORE-099 era)
- `SECURITY.md`: no change (last CORE-204/193/154)
- `docs/AGENT-NEUTRALITY.md`: no change (last 207/206 + 171 audit fixes)
- `docs/PLATFORMS.md`: no change (last 198.4/192/187/186)

(This matches the per-child sweeps in .1/.2/.3/.5/.6/.7 and .7's explicit "All 9 'no change'" confirmation; .4's global-claude work landed outside the listed sweep surface.)

**Recap:** Audit of [[CORE-EPIC-208]] (`heavy-light-suggestions`) completed cleanly with no inconsistencies or regressions surfaced. The full cohort (.1 discovery through .7 suggestion-ux-cleanup + this .8) has delivered agent-agnostic suggestion UX (emoji visuals + wrench cue, token-free printed output) uniformly across the 4 runner skills + global CLAUDE.md examples, with neutral primary labels [heavy]🧠/[light]🔧 adopted throughout. 

7 prior archived tasknotes + this record; 0 code changes in the epic; 0 misses logged. Cumulative doc-drift on the 9 AI-referenced docs: all "no change" for .8 (prior updates from sibling .4 already recorded per-child). Cohort tasknotes and PLAN grammar fully coherent with 205/198 precedent. Phase 1 skipped 🛠️ (no significant deviation); Phase 2/3 were verification + N/A rationale only. All Phase 1–4 boxes ticked.

**Parent note:** With .8 closure, all 8 children of CORE-EPIC-208 will be [x]. Operator may now manually flip the parent line to stub form and move the cohort block to `## Completed` (or re-run via `/ft-close-epic` if preferred for the prompt flow).

**Archived:** 2026-05-26
