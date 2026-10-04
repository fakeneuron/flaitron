---
title: worktree-convention audit
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: ["CORE-EPIC-215", "CORE-215.1", "CORE-215.2", "CORE-215.3", "CORE-215.4", "CORE-215.5"]
---
# CORE-215.6 | worktree-convention audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-215]]

## 🎯 Goal

Verify the completed `CORE-EPIC-215` (`worktree-convention`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-215.6 — audit CORE-EPIC-215` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-215.6` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-215.6.md`
- [ ] (Note: parent-flip prompt is the responsibility of `/ft-close-epic`; this `/ft-task` invocation closes only the audit subtask line itself)

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `_project/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-215.6` PLAN line to stub form + archive tasknote
- [ ] Verify wiring surface updates from .5 and thin-skill implementation from .3/.4 against the actual `claude/` payload + cross-refs in MIGRATION/AGENTS/PLATFORMS

## 🔗 Related

- [[CORE-EPIC-215]] — Parent epic: worktree-convention — Doc convention + thin `/ft-worktree-start` + `/ft-worktree-end` skills for parallel independent epic-child work in isolated git worktrees (adopted from superpowers `using-git-worktrees`). Re-scoped from CORE-196 starter in Phase 1 of that task; .1 Discovery refines and files .2..5 children.
- [[CORE-215.1]] — discovery (epic scope + child task list filed in PLAN)
- [[CORE-215.2]] — worktree-doc (created docs/WORKTREES.md + cross-refs in MIGRATION.md + AGENTS-snippet.md)
- [[CORE-215.3]] — worktree-start (authored thin claude/skills/ft-worktree-start/SKILL.md + command stub)
- [[CORE-215.4]] — worktree-end (authored thin claude/skills/ft-worktree-end/SKILL.md + command stub)
- [[CORE-215.5]] — worktree-wiring (wired the pair into AGENTS-snippet, ft-new-project, MIGRATION §1.2, ft-flowtron roster, PLATFORMS)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** This is the final audit subtask (highest .N) for [[CORE-EPIC-215]] per SPEC/epic.md and the PLAN.md filing ("Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line)"). User invoked via `/ft-task` (normal 4-phase flow; parent-flip orchestration lives in the dedicated `/ft-close-epic` entrypoint if desired later). All prior siblings .1–.5 are [x] and archived as of 2026-05-30. Scope is exactly the verification + fixed doc-drift sweep across the 9 AI-referenced docs + cohort coherence inventory (naming/style parity across the worktree convention children) + findings for any /ft-file-followup candidates. The pre-populated Goal/Acceptance/Subtasks at scaffold match the canonical epic-audit shape (fixed first Acceptance criterion). No Re-scope or De-scope required; the implementation children delivered a thin, orthogonal convention + two thin skills + adopter wiring with no SPEC contract impact.

- [x] Read relevant source files — archived siblings CORE-215.1.md through CORE-215.5.md (focus on Final Summaries, Implementation Notes, Discovery Notes, Phase 4 doc-drift blocks), current _project/PLAN.md (epic block + .6 line), _project/tasknote/README.md (the 9 AI-referenced docs list + explicit exclusion of SPEC/*.md and claude/skills/*/SKILL.md), SPEC/epic.md + SPEC.md (audit contract + gate sections + conditional skip), claude/skills/ft-close-epic/SKILL.md (canonical audit shape precedent), templates/tasknote-template.md, the delivered artifacts on disk (docs/WORKTREES.md, claude/skills/ft-worktree-{start,end}/SKILL.md, claude/commands/ft-worktree-{start,end}.md), and the 5 wiring surfaces touched by .5 (claude/AGENTS-snippet.md, claude/skills/ft-new-project/SKILL.md, docs/MIGRATION.md, claude/skills/ft-flowtron/SKILL.md, docs/PLATFORMS.md) plus HEAD state of the 9 AI-ref docs.

- [x] **Archive skim** — `ls _project/tasknote/archive/core/` (last entries are the 215 cohort + 214/213/212/211 family) + targeted `grep -l 'WORKTREES\|ft-worktree' _project/tasknote/archive/core/*.md` returned only CORE-196.md (the originating starter, re-scoped into this epic) + the five 215 siblings themselves. For paths in scope (docs/WORKTREES.md + the two new skill dirs + two command stubs + the 5 wiring surfaces in MIGRATION/AGENTS/ft-new-project/ft-flowtron/PLATFORMS), the 215 lineage + 196 are the complete record. No conflicting prior decisions on location convention (`~/code/<p>-worktrees/wt-<ID>/`), branch naming (`wt-`), tasknote copy semantics, or the "thin utility, no SPEC change" charter. The .1–.5 archived tasknotes + the actual delivered files on disk are the authoritative source; no file moves, regressions, or hardlink notes relevant beyond the documented design.

- [x] **Drift check** — All paths, shortnames, [[wikilinks]], the 5 locked conventions (location, branch `wt-<ID>`, verbose skill names, tasknote copy, merge/cleanup from main), "thin/orthogonal/no SPEC impact" scope, and decision points from the .1–.5 archived tasknotes + the current .6 PLAN line still match HEAD exactly. The delivered `docs/WORKTREES.md`, the two SKILL.md + command stubs under `claude/`, and the cross-ref + count updates in the 5 adopter surfaces (verified via grep + targeted reads) are present and match the Acceptance criteria in .2–.5. No post-.5 edits to the new surfaces or the 9 AI-ref docs that would invalidate the charter. The originating CORE-196 starter decisions remain the baseline. No drift requiring re-interpretation of the audit scope.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  **No clarifications needed.**

  **Explicit assumptions (asserted for autonomous execution):**
  - The cohort is fully closed (.1–.5 [x]; .6 is highest and sole open child); no deferred, partial-cohort, or early-audit issues.
  - "Cohort coherence" for this epic means: consistent epic-child tasknote frontmatter/related-tasks shape, PLAN.md grammar (2-space indent, **ID** [grok] | shortname — desc), [[wikilink]] usage, Phase 4 doc-drift phrasing, and the "thin utility + doc convention + adopter wiring, zero SPEC contract change" policy locked in .1 and executed by .2–.5.
  - Cumulative doc-drift for .6 = the exact 9 AI-referenced docs in tasknote/README.md. All epic changes were either (a) on explicitly excluded surfaces (SPEC/*.md lazy modules, claude/skills/*/SKILL.md on-demand) or (b) the new `docs/WORKTREES.md` + `claude/` payload additions (the latter not in the 9). Expect "no change" on all 9.
  - The two new thin skills + commands + WORKTREES.md + wiring edits in .5 will be spot-verified for fidelity to their own Acceptance criteria; any naming/style drift vs. sibling epics (195, 211, 208, etc.) or internal contradictions will be logged.
  - Any misses (stale cross-refs, broken "see docs/WORKTREES.md" links, count mismatches in wiring prose) will be logged as `/ft-file-followup` candidates only; no inline fixes expected for a final audit unless trivial-and-clearly-in-scope.
  - Archived tasknotes are write-once; we read only. No parent-flip orchestration in this `/ft-task` invocation (that prompt lives in `/ft-close-epic`).
  - The .6 audit is the closing record for the entire worktree-convention effort; its doc-drift sweep is the cumulative attestation that the 9 stayed clean throughout the slice.

- [x] Subtasks above populated with concrete, ordered steps — pre-populated at scaffold time with the exact canonical epic-audit shape per SPEC/epic.md (fixed doc-drift first in Acceptance; 6 ordered verification subtasks) plus the .5-specific wiring verification item. Related section seeded with parent + full prior cohort + one-line context from PLAN. Sufficient; no material change to execution plan required during Discovery. The two thin skills and WORKTREES.md already spot-checked against .3/.4/.2 Acceptance during reads; the 5 wiring surfaces match .5 claims.

**Discovery Notes:**

**Cohort inventory (CORE-EPIC-215 worktree-convention, children closed 2026-05-30):**

- **CORE-215.1 [grok] | discovery** — Epic filed via re-scope of CORE-196 starter. Locked the five conventions (location `~/code/<p>-worktrees/wt-<ID>/`, branch `wt-<ID>`, verbose `/ft-worktree-*` names, tasknote copy into worktree, cleanup from main only). Surveyed adopter surfaces and precedents (CORE-195 ft-debug, CORE-186). Filed concrete .2 (doc) + .3/.4 (thin start/end pair) + .5 (wiring) + confirmed .6 as audit. Deliverable: PLAN.md child block + policy locks. 0 AI-ref doc changes (pure Discovery filing).
- **CORE-215.2 [grok] | worktree-doc** — Authored `docs/WORKTREES.md` (Diátaxis-adjacent: five locked conventions table + when-to-use + start/end conceptual flow). Added lightweight cross-ref prose in `docs/MIGRATION.md` §1.2 and `claude/AGENTS-snippet.md` (Workflow section). "no change" on all 9 AI-ref docs. Skipped 🛠️.
- **CORE-215.3 [grok] | worktree-start** — Authored thin `claude/skills/ft-worktree-start/SKILL.md` (5 steps: preconditions/git-dir safety, collision checks on branch+dir, the 4 git+copy steps, verify, handoff block with exact "Clear your session, then use 🔧 /ft-task <ID>" + cd target). Plus matching thin command stub. Heavy reference to WORKTREES.md; no 4-phase scaffolding inside. Matches Acceptance exactly. Skipped 🛠️.
- **CORE-215.4 [grok] | worktree-end** — Authored symmetric thin `claude/skills/ft-worktree-end/SKILL.md` (verify merged-or-explicit-discard gate, archive-copied-tasknote copy from worktree into main's canonical archive/, `git worktree remove`, optional prune, UX summary). Plus command stub. Belt-and-suspenders archive capture even across merge edge cases. Matches Acceptance. Skipped 🛠️.
- **CORE-215.5 [grok] | worktree-wiring** — Wired the pair into the five adopter surfaces: AGENTS-snippet (symlink list + prose mention), ft-new-project (Step 3 heading, Step 7 git-add block with 2 cmds+2 skills, Step 8 18-symlink verify list, "eighteen" count), MIGRATION §1.2 (heading "nine slash commands", prose, git-add example, smoke test), ft-flowtron roster (two new rows in the table), PLATFORMS (table cell + "Today's surface" enumeration + counts 19→21). Phase 4 sweep recorded the specific updates. Skipped 🛠️.

**Cumulative cohort deliverables (for coherence pass):**
- PLAN.md: 1 parent + 6 children (1 discovery + 4 impl + this audit) under ## Medium; .1–.5 now stubbed with Completed 2026-05-30 dates; .6 line currently open.
- 5 archived tasknotes in archive/core/ (each with full frontmatter + spec-on-top + 4-phase log; all follow identical epic-child shape).
- New surfaces delivered: `docs/WORKTREES.md` (full convention doc), `claude/skills/ft-worktree-{start,end}/` (2 SKILL.md), `claude/commands/ft-worktree-{start,end}.md` (2 thin command descriptors). All present on disk and faithful to their tasknote Acceptance.
- Adopter wiring surfaces updated (prose + lists + counts + symlink examples) in exactly the 5 places scoped by .5; the payload under `claude/` is the source of truth (adopters symlink from it).
- AI-referenced docs touched: none of the 9 (new doc + claude/ payload additions are outside the declared sweep list; wiring edits were to MIGRATION/AGENTS/PLATFORMS which are in the 9 — their Phase 4 sweeps in .2/.5 already attested the precise changes).
- Non-sweep surfaces: the two new thin utilities are deliberately outside SPEC contract (workflow-orthogonal accelerator only).
- Model tokens: uniform [grok] across all 6 children (per epic header).
- No code / test / frontend / viz / backend changes (pure docs + thin procedural skills + wiring hygiene epic).

**Cohort coherence observations (preliminary; full pass + fixed sweep in Phase 2):**
- Naming / style parity: All 215 children follow the exact epic-child pattern (frontmatter related-tasks including parent + priors, H1 with shortname, nav with 🔗 [[CORE-EPIC-215]], Goal/Acceptance/Subtasks, Phase checklists with explicit assumptions + skip markers, Final Summary + doc-drift blocks). Related sections consistently seeded. The thin skills use parallel structure (Step 0-5, identical path computation, symmetric notes). No contradictory citations.
- Cross-refs: Heavy, consistent [[CORE-EPIC-215]], [[CORE-215.N]], [[CORE-215.1]], [[CORE-196]] (origin), WORKTREES.md self-refs in the skills. The new doc correctly cites the epic/.1. No stale links.
- Doc-drift discipline: Every child that touched an AI-ref surface performed its Phase 4 sweep (.2 and .5); the others correctly emitted "no change". The .6 fixed sweep will be the cumulative attestation for the whole slice.
- Thin/orthogonal contract: The skills explicitly disclaim any change to 4-phase, gates, --fast, or post-closure. The convention is narrowly scoped to independent epic children only. Matches the charter.
- No regressions vs. prior epics (195 debug-skill wiring, 211 gate-clarity, 208 heavy-light) noted in sibling notes or current HEAD.
- Parent-flip: Not part of this /ft-task invocation; after .6 closure the parent + cohort remain under ## Medium until a future `/ft-close-epic CORE-215.6` (or manual) flip.

**Archive skim + drift synthesis:** Only the 196 starter + this 215 cohort ever mentioned the worktree surfaces. No conflicting decisions on the five locked conventions or the "thin + no SPEC impact" rule. The 2026-05-30 .5 closure is the authoritative "wiring complete" marker; the delivered files on disk (verified in Discovery reads) match the claims.

**Clarifications / assumptions surface:** None fired (scope unambiguous from .1 filing + .2–.5 execution records + epic.md contract). All assumptions logged above are conservative and match the "verification + cumulative record" shape of prior epic audits (211.6, 208.8, 205.6, 198.5).

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

Discovery surfaced no significant deviation from the filed "Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line)" plan (zero clarifying questions; subtasks/Acceptance already canonical from scaffold + enriched with .5-specific item; execution plan for inventory + fixed sweep + coherence + wiring spot-check unchanged; default-skip flavor satisfied by absence of asks) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (2026-05-30):** The canonical shape for final epic audits is established by CORE-211.6, CORE-208.8, CORE-205.6, CORE-198.5, CORE-057.6 etc. All follow the same structure: pre-filled Goal/Acceptance with the *fixed* first doc-drift criterion (per SPEC/epic.md), 6 canonical subtasks (plus any cohort-specific verification items), Related listing parent + full cohort, Phase 1 with explicit assumptions + rich cohort inventory in Discovery Notes, Phase 2 as verification pass (inventory already captured; execution = fixed sweep + coherence + spot-check of deliverables), Phase 3 N/A rationale for pure-doc audits (no test surface; markdown mental-pass as lint), Phase 4 with per-entry sweep + stub flip + archive. Precedent for "no change" (or "update already recorded by child Phase 4") sweeps when changes were confined to the declared wiring surfaces + new payload outside the 9. We extend that exact shape. The thin skills themselves follow the "thin procedural utility" pattern from ft-debug (CORE-195) and ft-audit-context (CORE-186) — explicit Step 0-N, heavy doc reference, no internal tasknote driving.

**Verification execution (minimal solution):**

- Executed the fixed doc-drift sweep against the exact 9 entries in _project/tasknote/README.md §"AI-referenced docs" (git log --since 2026-05-28 on each + cross-check against .2/.5 recorded verdicts + HEAD content). Detailed per-entry below.
- Performed cohort coherence pass: re-read key sections of all 5 prior 215 archived tasknotes (Goal/Acceptance/Subtasks/Related, Discovery Notes inventories + 5-convention locks, Phase 4 sweep blocks, Final Summaries); compared against current PLAN.md epic block, current AI-ref doc HEAD state, the actual delivered files on disk (WORKTREES.md + 2 skills + 2 commands), and the 5 wiring surfaces.
- Spot-checked fidelity: the two SKILL.md + command stubs match the Acceptance in .3/.4 (5 explicit steps, safety gates, exact handoff phrasing, symmetric structure, "thin/orthogonal" disclaimers). WORKTREES.md matches the 5 locked decisions from .1. Wiring in the 5 surfaces matches .5 claims (lists, counts "nine"/"eighteen", symlink examples, roster rows, PLATFORMS enumeration).
- Result: **no inconsistencies surfaced**. Naming, style, [[wikilink]] discipline, thin-utility contract, and "no SPEC change" policy are uniform and correct. No contradictory cross-refs. The .6 Related section (seeded at scaffold) is consistent with sibling patterns. No inline fixes required.
- No /ft-file-followup candidates logged.

**Fixed doc-drift sweep (per-entry verdicts for the 9 AI-referenced docs):**

- `README.md` — no change (the AI-referenced list itself and carve-outs for SPEC/*.md + claude/skills/* remain exactly as read by .1)
- `SPEC.md` — no change (only an unrelated 195-era commit in the window; epic charter explicitly scoped "No SPEC contract change")
- `docs/MIGRATION.md` — update from this epic already recorded in .5 (and .2): fa97315 "chore: wire /ft-worktree-start + /ft-worktree-end into 5 adopter surfaces (CORE-215.5)" + 41a5a75 (the .2 cross-ref). No further changes since .5. The heading "nine slash commands", git-add examples, and smoke-test list now include the pair.
- `claude/AGENTS-snippet.md` — update from this epic already recorded in .5 (and .2): fa97315 + 41a5a75. No further changes. Symlink block and Workflow prose now document the worktree pair.
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — update from this epic already recorded in .5: fa97315. No further changes. Table cell and "Today's surface" enumeration now include the two thin worktree utilities (counts bumped to 19→21 in commands/skills).

**Phase 2 mental-pass (executed inline after sweep + coherence + deliverable spot-check):**
- Sweep confirms the epic's doc impact was precisely as scoped and recorded by the children (.2 and .5): the three wiring surfaces (MIGRATION, AGENTS, PLATFORMS) received their intended updates; the other six stayed clean. New convention doc + thin skills live outside the declared 9 (as designed).
- Coherence: the 215 cohort is a clean, conservative, single-surface mechanical series (doc + thin pair + wiring) following 195/211 precedent exactly. The five locked conventions from .1 are faithfully implemented in the delivered artifacts. Naming/style uniform; "thin utility" disclaimers consistent; cross-refs correct.
- No misses requiring follow-up. The worktree convention is fully present, wired, and documented.
- Parent-flip state: after the upcoming Phase 4 flip of .6, all children [x] but the parent remains under ## Medium (no bundled flip prompt in /ft-task flow; use /ft-close-epic later if desired).
All boxes ticked. Ready for Phase 3 (N/A surface).

## 🧪 Phase 3: Testing & Linting

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-prose verification + git-verified doc history only (per epic-audit contract for final subtasks). No executable surface touched by this task or the audited cohort (pure docs + thin procedural skills + wiring hygiene epic; the new skills are shell-invoked utilities, not test-bearing code).

- Targeted test suite: N/A — no code, no tests in scope for CORE-EPIC-215 or this audit. The thin skills have no unit tests by design (procedural, git-dependent, operator-facing).
- Lint/type-check: N/A for the verification work itself (no files edited in Phase 2; the tasknote edit and upcoming PLAN.md flip are markdown-only). The cohort's prior edits (.2 docs/WORKTREES.md + cross-refs, .3/.4 skills+commands, .5 wiring) were already verified in their own Phase 3 steps or via the Discovery/Phase 2 reads here (file presence + content fidelity + git history). Markdown mental-pass on this tasknote + the planned PLAN stub is sufficient.
- Frontend visual (👁️): N/A — no UI, no viz, no adopter-facing rendered surface. The epic's worktree convention *is* the execution surface (handoff UX, cleanup summary); that was the *object* of the audit, not something requiring post-audit visual confirmation from the operator.

Rationale captured per close-epic Step 6 precedent (adapted for /ft-task invocation). All boxes ticked with explicit N/A justification. Ready for Phase 4 closure ops (auto-run).

## 🚀 Phase 4: Closure

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/CORE-215.6.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**1-2 sentence plain-English summary:** Audit of CORE-EPIC-215 (`worktree-convention`) completed cleanly. The fixed doc-drift sweep across all 9 AI-referenced docs returned "no change" for the 6 untouched entries and "update already recorded by .5 (and .2)" for the 3 wiring surfaces (MIGRATION, AGENTS-snippet, PLATFORMS); the new WORKTREES.md + thin skills/commands live outside the declared sweep list per design. Cohort coherence confirmed with zero inconsistencies, zero naming/style drift, zero follow-ups to file, and full fidelity of the delivered artifacts to the .2–.5 Acceptance criteria.

**Technical detail:** Inventoried all 5 prior siblings (.1 discovery via /ft-task re-scope of 196 locked the 5 conventions + filed children; .2 created docs/WORKTREES.md + 2 cross-refs; .3/.4 authored the thin start/end skill+command pair with safety gates and exact handoff UX; .5 wired into the 5 adopter surfaces with list/count updates). Fixed doc-drift sweep (git-verified since 2026-05-28): 6× "no change", 3× "epic update already recorded in child Phase 4". Coherence pass + deliverable spot-check: uniform epic-child shape, consistent [[wikilinks]] and "thin/orthogonal" disclaimers, five conventions faithfully implemented on disk, wiring complete and accurate. No inline fixes; no /ft-file-followup candidates. Single `feat: CORE-215.6 — audit CORE-EPIC-215` (or `chore:`) commit (PLAN.md stub + tasknote archive). Parent remains under ## Medium (no flip prompt in /ft-task flow).

**Archived:** 2026-05-30
