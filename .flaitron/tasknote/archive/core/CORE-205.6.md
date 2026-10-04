---
title: agent-neutrality-sweep audit
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-205, CORE-205.1, CORE-205.2, CORE-205.3, CORE-205.4, CORE-205.5]
---
# CORE-205.6 | agent-neutrality-sweep audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-205]]

## 🎯 Goal

Verify the completed `CORE-EPIC-205` (`agent-neutrality-sweep`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-205.6 — audit CORE-EPIC-205` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-205.6` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-205.6.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-205` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `_project/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-205.6` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-205]] — parent epic (agent-neutrality-sweep)
- [[CORE-205.1]] — discovery subtask that filed the implementation children + audit line (Completed 2026-05-25)
- [[CORE-205.2]] — contract-layer-hygiene (Completed 2026-05-25)
- [[CORE-205.3]] — wiring-layer-symmetry (Completed 2026-05-25)
- [[CORE-205.4]] — adopter-neutrality-docs (Completed 2026-05-25)
- [[CORE-205.5]] — neutrality-ledger-update (Completed 2026-05-25)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-205.6`. Pre-flight (Steps 1-2) passed cleanly: parent `CORE-EPIC-205` exists under `## High` (not under `## Completed`), `.6` is the highest `.SUB` child, and all implementation siblings (CORE-205.1 through .5) are already `[x]` with no open `[ ]` siblings requiring the early-audit AskUserQuestion gate. This audit captures the point-in-time coherence and cumulative doc-drift state of the full 2026-05-25 `agent-neutrality-sweep` cohort (builds directly on [[CORE-EPIC-154]] and [[CORE-EPIC-198]]) immediately after the hygiene children closed. Scope is verification + fixed doc-drift sweep (per SPEC/epic.md) + naming/style/cross-ref inventory across deliverables; no re-scope or de-scope required. (No early-audit decision logged.)

- [x] Read relevant source files — `_project/tasknote/archive/core/CORE-205.1.md` through `.5.md` (Final Summaries + Implementation Notes + Discovery Notes for cohort deliverables), current versions of touched AI-referenced surfaces (`docs/AGENT-NEUTRALITY.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`), `SPEC/epic.md`, `_project/PLAN.md` (epic + children block), `_project/tasknote/README.md` (AI-referenced list), the 3 files edited by .4 (ft-new-project/SKILL.md for completeness, though outside default sweep), and this scaffold itself.
- [x] **Archive skim** — The 205 family itself (plus prior neutrality epics 154.x / 198.x) are the load-bearing archives for these surfaces. `ls _project/tasknote/archive/core/` + targeted greps for paths/strings from the cohort (AGENT-NEUTRALITY.md, MIGRATION carve-out sites, PLATFORMS constraints, "AskUserQuestion", 154.3, etc.) show hits confined to the defining epics and their direct siblings; no other tasknotes carry conflicting decisions on the audited surfaces. (See Discovery Notes inventory for synthesis.)
- [x] **Drift check** — All paths, line citations, and decision points from the .1-.5 archived tasknotes still match HEAD on 2026-05-26: the 2026-05-25 sweep record subsection from .5 is present in AGENT-NEUTRALITY.md (end of out-of-scope); the 3 neutral carve-out sites from .4 in MIGRATION.md:136/287 and AGENTS-snippet.md:47 use the exact "fresh session with your coding agent (Claude Code, Cursor, Grok Build, Codex CLI, etc.; or the platform's equivalent...)" phrasing; PLAN.md still shows CORE-205.6 as the open `[ ]` audit under the epic with correct shortname and children; no post-closure mutations, renames, or re-interpretations needed for any cited surface. Minor: ft-new-project/SKILL.md edit (outside AI-ref sweep) also stable.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.**

  **Explicit assumptions (asserted for autonomous execution):**
  - The cohort scope and deliverables are fully and unambiguously documented in the .1 Discovery Notes + .2-.5 Final Summaries / Implementation Notes (no deferred children, no partial-cohort early audit).
  - "Cohort coherence" for this audit means: consistent epic-child tasknote shape (frontmatter + spec-on-top + 4-phase log-below), PLAN.md line grammar (2-space indent, **ID**, [model], | shortname — em-dash long-desc, word-count discipline, [[wikilinks]]), and "no change" / precise-update phrasing in every child's Phase 4 doc-drift block.
  - Cumulative doc-drift for the audit = union of the 5 per-child sweeps (3 AI-referenced files received updates from .4/.5; all others "no change" across the board).
  - Any misses (naming drift, contradictory cross-refs, regressions) will be logged as `/ft-file-followup` candidates only; no inline fixes in this audit unless trivial and clearly in-scope (none expected).
  - Archived tasknotes are write-once records; we read only.
- [x] Subtasks above populated with concrete, ordered steps — pre-populated at scaffold time per `ft-close-epic` Step 3 canonical epic-audit shape (6 steps); sufficient and precise for the verification scope. No refinement needed after Discovery (inventory step largely executed during this Phase 1 via sibling reads).

**Discovery Notes:**

**Cohort inventory (CORE-EPIC-205 agent-neutrality-sweep, all children closed 2026-05-25):**

- **CORE-205.1 [sonnet] | discovery** — Epic filed + 4 implementation children (contract hygiene, wiring symmetry, adopter docs, ledger stamp) + audit `.6` line scoped and written into `_project/PLAN.md` under `## High` after exhaustive surface inventory (SPEC.md + templates/ + docs/AGENT-NEUTRALITY.md + PLATFORMS.md + MIGRATION.md + claude/AGENTS-snippet.md + claude/skills/ roster + _project/tasknote/README.md). Confirmed: repo remains project-agnostic in contract layer; no heavy LLM lean (model field + neutral AGENTS paste-block); claude/ wiring + sibling-dir convention + PLATFORMS plug-in pattern properly enable cross-agent adoption (conversational via AGENTS.md for Codex/Grok/etc.; ergonomics only in claude/ today). Minor residual ("AskUserQuestion" phrasing in generic scaffold text) noted for .2 to clean. Deliverable: concrete PLAN.md child lines (all ≤50w / 70w cap) + .6 audit placeholder. (See .1 Final Summary for full sweep findings table.)

- **CORE-205.2 [grok] | contract-layer-hygiene** — Targeted grep survey (2026-05-25) across SPEC.md, all 5 templates/*.md, docs/, claude/AGENTS-snippet.md + top-level AI-referenced markdown for "AskUserQuestion|ask_user_question" (and close variants) + other Claude-tool name residuals. Result: zero unintentional occurrences in living contract layer. Sole remaining match is the protected intentional historical row in docs/AGENT-NEUTRALITY.md (per ledger "Intentional surfaces" table and generalization rules from [[CORE-154.2]]). Zero edits landed. This tasknote + Phase 1 Discovery Notes are the formal 2026-05-25 terminology-hygiene verification record. (See .2 Final Summary.)

- **CORE-205.3 [grok] | wiring-layer-symmetry** — On-disk + doc survey (post-.2, 2026-05-25): claude/ contains exactly AGENTS-snippet.md + commands/ (18 .md) + skills/ (18 dirs); 18/18 counts match ft-flowtron roster + PLATFORMS claim exactly; AGENTS-snippet symlinks list only the 6 core per-project skills (12 others correctly global-only per MIGRATION); PLATFORMS.md two-layer model, symmetric plug-in example, 4 hard constraints, and "only claude/ exists today" statement all accurate vs. 154.3 baseline; no new top-level platform dirs or contract leakage in docs/SPEC outside the AGENT-NEUTRALITY approved table. Zero edits. Formal wiring-symmetry verification record. Builds on [[CORE-154.3]].

- **CORE-205.4 [grok] | adopter-neutrality-docs** — Survey of MIGRATION.md, claude/AGENTS-snippet.md, ft-new-project/SKILL.md, ft-flowtron/SKILL.md for Claude-only framing that could mislead Codex/Grok/Cursor users. Found exactly 4 actionable verify/hand-off sites with literal "fresh Claude Code session" instructions (MIGRATION.md:136 + :287, AGENTS-snippet.md:47, ft-new-project/SKILL.md:139). Applied 3 minimal one-line neutral carve-outs (~4 lines net add, 0 removals) using consistent phrasing: "fresh session with your coding agent (Claude Code, Cursor, Grok Build, Codex CLI, etc.; or the platform's equivalent...)". ft-new-project global bootstrap details (CLAUDE.md check) left untouched per Phase 1 scope. Intentional ledger surfaces untouched. 3 AI-referenced files + 1 lazy-loaded file touched. (See .4 Final Summary + Implementation Notes for exact sites + diff shape.)

- **CORE-205.5 [grok] | neutrality-ledger-update** — Siblings .2/.3/.4 all confirmed "no new intentional Claude refs or contract-layer leaks" (conditional premise from .1 and PLAN line resolved to "confirm none"). Appended minimal 8-line prose subsection `## 2026-05-25 sweep record (CORE-EPIC-205)` at end of "Out of scope for this ledger" in docs/AGENT-NEUTRALITY.md, citing the three confirming children and explicitly stamping the epic's verification date + "ledger remains the boundary." 1 file touched, pure prose, zero behavior/contract impact. (See .5 Final Summary + Implementation Notes.)

**Cumulative cohort deliverables (for coherence pass):**
- PLAN.md: 1 parent epic line + 6 child lines (5 impl + audit) under ## High; all siblings now stubbed Completed 2026-05-25.
- 5 archived tasknotes in archive/core/ (each with full frontmatter + spec-on-top + 4-phase execution log).
- 3 AI-referenced docs received updates (.4 + .5): `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/AGENT-NEUTRALITY.md`.
- 1 non-sweep file: `claude/skills/ft-new-project/SKILL.md` (carve-out).
- No code / test / frontend / viz changes in the entire epic.

**Cohort coherence observations (preliminary; full pass in Phase 2):**
- Naming / style parity: All children follow identical epic-child pattern (frontmatter with related-tasks, H1 with shortname, nav with 🔗 [[CORE-EPIC-205]], Goal/Acceptance/Subtasks spec, Phase checklists with explicit assumptions, Final Summary + per-child doc-drift blocks, "Archived: YYYY-MM-DD").
- Cross-refs: Heavy, consistent use of [[CORE-EPIC-205]], [[CORE-205.N]], [[CORE-EPIC-154]], [[CORE-EPIC-198]], [[CORE-154.3]] etc. No contradictory citations.
- Doc-drift discipline: Every child performed (or referenced) the Phase 4 sweep; .1/.2/.3 recorded "no change" for all 9 AI-ref entries; .4/.5 recorded precise updates only for the files they touched.
- No regressions vs. prior epics (154/198) or post-205.1 surfaces noted in sibling notes.

**Archive skim + drift synthesis:** No conflicting prior decisions surfaced. All 154.3/198 decisions (structure lock, ledger creation, generalization) remain the live state as re-verified by this cohort. The 2026-05-25 stamp in AGENT-NEUTRALITY.md now serves as the authoritative "last full neutrality sweep" marker for future work.

**Clarifications / assumptions surface:** None fired during this Phase 1 (scope unambiguous from .1 filing + sibling execution). All assumptions logged above are conservative and match the "verification + record" shape of the .2/.3 children.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern matched exactly (no new shape).** Neighboring epic children in this cohort (.2 contract hygiene, .3 wiring symmetry, .4 adopter carve-outs, .5 ledger stamp) and prior bracket epics ([[CORE-EPIC-154]], [[CORE-EPIC-198]]) all use the identical "spec-on-top + execution log below" shape with frontmatter, wikilink nav, explicit assumptions in Phase 1, per-child doc-drift blocks in Final Summary, and "Archived: YYYY-MM-DD" footer. This .6 audit extends the same verification-record pattern with zero deviation. The "audit findings + followup candidates" shape is the canonical one prescribed by `ft-close-epic` Step 3 and SPEC/epic.md §"Audit acceptance".

**Minimal solution (verification + record only):** The work *is* the cohort coherence inventory, cumulative doc-drift sweep (fixed line), and cross-child consistency pass. All heavy lifting (reading the 5 archived siblings' Final Summaries + Impl Notes, current-state verification of the 3 edited AI-referenced docs, PLAN.md grammar check, naming/style/cross-ref survey) was executed in Phase 1 Discovery (see the full inventory and preliminary coherence observations there). Phase 2 formalizes the findings with no code changes, no inline fixes, and no new deliverables beyond this tasknote's Implementation Notes + the Phase 4 doc-drift verdicts.

- **Cohort children inventoried:** 5 (plus parent epic line). Deliverables captured in Phase 1 Discovery Notes above. .1: PLAN.md filing only. .2/.3: pure verification (zero edits). .4: 3 files / ~4 lines carve-outs. .5: 1 file / 8 lines prose stamp.
- **Cohort coherence findings (full pass):** No inconsistencies surfaced.
  - Naming consistency: All 5 children use identical shortname style ("contract-layer-hygiene", "wiring-layer-symmetry", etc.), title casing in H1/frontmatter, and " — " em-dash long-desc in PLAN.
  - Style parity: Every tasknote matches the template + epic-child convention (frontmatter related-tasks list, 🔗 [[CORE-EPIC-205]] nav chip on impl children, Phase 1 "Explicit assumptions" blocks, "no change" or precise-update doc-drift tables in Final Summary). .6 scaffold itself follows the same.
  - Cross-refs: Dense, accurate, and non-contradictory. All point to the correct [[CORE-EPIC-205]], siblings, and 154/198 precedents. No stale or circular refs.
  - No contradictory claims across deliverables (e.g. .4's "no change" for AGENT-NEUTRALITY.md is consistent with .5 being the one that edited it; .2's "pointed .5 to stamp" is honored).
- **No regressions surfaced** in earlier-shipped cohort surfaces (the 3 edited files + PLAN.md + the archived tasknotes themselves remain exactly as left at sibling closures on 2026-05-25; drift checks in Phase 1 confirmed).
- **Audit findings / misses for followup:** None. The cohort is a model example of tight-scoped, minimal-change, well-documented epic hygiene work. All Acceptance criteria for coherence and regressions are satisfied with zero issues requiring correction or `/ft-file-followup` candidates. (The fixed doc-drift sweep will be executed in Phase 4 per contract; its verdicts will be the authoritative cumulative record.)
- **Inline fixes applied:** Zero. No trivial nits rose to the level of "clearly in-scope for the audit itself."

**No non-trivial behavior / tests added** — pure prose audit and record-keeping task (no executable code paths, no tests, no frontend). "Verification" consisted of the reads, greps, ls, and re-reads already logged in Phase 1 + the synthesis here. Markdown mental-pass on this tasknote (frontmatter, checklist ticks, wikilinks, heading levels, em-dashes) passed as part of execution.

(This completes the Phase 2 deliverable: audit findings recorded. Flows directly into Phase 3 + Phase 4 closure ops per SPEC.)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

N/A for all three — pure prose / markdown audit and record-keeping task. No executable code, tests, or frontend/UI/visual surface was changed by this audit (or by the parent cohort; all deltas were docs + PLAN.md + tasknotes). 

- "Test suite" equivalent: the exhaustive reads of the 5 archived siblings + current-state re-verification reads/greps on the 3 edited AI-referenced docs + PLAN.md + ls of archive/core/ (all executed and passed in Phase 1; re-confirmed in Phase 2 coherence pass).
- "Lint/type-check" equivalent: markdown mental-pass on this tasknote (frontmatter schema, checklist formatting, wikilinks [[ ]], em-dashes, heading levels, "no change" phrasing consistency with sibling drift blocks) + the Phase 2 pattern survey (shape matches cohort exactly). Passed.
- (frontend) visual: N/A — no rendered pages, components, or adopter-visible UI touched. (The 👁️ item is retained in the checklist per template precedent for audit-family tasks; see .3/.5 examples.)

All verification artifacts are the sibling tasknotes + this audit tasknote itself.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (cumulative for the full CORE-EPIC-205 cohort; see Final Summary)
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**CORE-EPIC-205 (agent-neutrality-sweep) audit complete — no inconsistencies or regressions surfaced.** The 2026-05-25 five-child cohort (.1 discovery through .5 ledger stamp) is a model of tight-scoped, minimal-change, well-documented epic hygiene work. .1 scoped and filed the plan after full surface inventory; .2/.3 were zero-edit verification passes (contract terminology + wiring symmetry); .4 delivered 3 minimal neutral carve-outs in adopter docs; .5 stamped the "confirm none" date in the ledger. This .6 audit performed the contractually-required cumulative doc-drift sweep (fixed line) + full cohort coherence inventory (naming, style, cross-refs); all Acceptance criteria satisfied with zero misses requiring follow-up filings. Builds directly on [[CORE-EPIC-154]] and [[CORE-EPIC-198]].

**Cohort children inventoried (all closed 2026-05-25):**
- .1 [sonnet] discovery — PLAN.md epic + 4 children + .6 audit line filed (no AI-ref doc changes).
- .2 [grok] contract-layer-hygiene — zero edits; "AskUserQuestion" already absent from living contract surfaces.
- .3 [grok] wiring-layer-symmetry — zero edits; 18/18 counts, PLATFORMS constraints, AGENTS wiring all match 154.3 baseline.
- .4 [grok] adopter-neutrality-docs — 3 files / ~4 lines: MIGRATION.md (2 carve-outs), claude/AGENTS-snippet.md (1 carve-out).
- .5 [grok] neutrality-ledger-update — 1 file / 8 lines: AGENT-NEUTRALITY.md subsection stamp.

**Cumulative doc-drift sweep (AI-referenced docs from _project/tasknote/README.md — fixed line per SPEC/epic.md):**
- `README.md` — no change (across entire cohort + this audit)
- `SPEC.md` — no change (project-agnostic claims, claude/ factual refs + PLATFORMS forward pointers remain current)
- `docs/MIGRATION.md` — updated (by .4): 2 carve-outs in §1.7 verify (line ~136) and §3.9 smoke test (line ~287) using neutral phrasing "fresh session with your coding agent (Claude Code, Cursor, Grok Build, Codex CLI, etc.; or the platform's equivalent...)". This .6 confirms the updates are present and stable.
- `claude/AGENTS-snippet.md` — updated (by .4): 1 carve-out in "One-time symlink wiring" verify section (line 47) using identical neutral phrasing. This .6 confirms stability.
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — updated (by .5): appended `## 2026-05-25 sweep record (CORE-EPIC-205)` subsection (8 lines prose) at end of "Out of scope for this ledger", citing .2/.3/.4 "no new intentional Claude refs or contract-layer leaks" confirmations and stamping the epic verification date. This .6 confirms the subsection is present, correctly scoped, and the authoritative "last full neutrality sweep" marker.
- `docs/PLATFORMS.md` — no change (two-layer model, plug-in pattern, 154.3 decision, 18-count claim all accurate)

(Note: the carve-out in `claude/skills/ft-new-project/SKILL.md` from .4 is explicitly outside the default cold-start AI-referenced sweep per `_project/tasknote/README.md` §"AI-referenced docs" note; recorded here for completeness only.)

**PLAN.md .6 stub:** `- [x] **CORE-205.6** [sonnet] | audit — Completed 2026-05-26.`

**Tasknote archive:** `git mv _project/tasknote/CORE-205.6.md _project/tasknote/archive/core/CORE-205.6.md`; **Archived:** 2026-05-26

**No followup candidates** to file via `/ft-file-followup`. Cohort is clean and coherent.

**Archived:** 2026-05-26
