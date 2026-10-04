---
title: repo-best-practices-sweep audit
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-EPIC-324, CORE-324.1, CORE-324.2, CORE-324.3, CORE-324.4]
---

# CORE-324.5 | repo-best-practices-sweep audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-324]]

## 🎯 Goal

Verify the completed `CORE-EPIC-324` (`repo-best-practices-sweep`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-324.5 — audit CORE-EPIC-324` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-324.5` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-324.5.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-324` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-324.5` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-324]] — parent epic (repo-best-practices-sweep)
- [[CORE-324.1]] — discovery subtask (scoped the cohort)
- [[CORE-324.2]] — viz-best-practices
- [[CORE-324.3]] — spec-skill-consistency
- [[CORE-324.4]] — docs-tooling-sweep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-324.5`; Step 2 pre-flight passed (parent `CORE-EPIC-324` active, children `.1`–`.4` all `[x]`, `.5` is the highest `.N`, no open siblings). Full cohort closed 2026-06-14 — no early-audit / partial-cohort decision.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (read each child's archived tasknote — Final Summary + Implementation Notes):

- **CORE-324.1 — discovery.** Scoped the epic; filed concrete child lines `.2`–`.4` into PLAN.md (no code). Deliverable: the cohort scoping itself.
- **CORE-324.2 — viz-best-practices.** Audited `viz/src/` across five dimensions (typing, hooks, decomposition, test coverage, a11y) — code came back clean. One proportionate fix: added `eslint-plugin-react-hooks` (v7.1.1) to `viz/package.json` + `viz/eslint.config.js` with two canonical rules (`rules-of-hooks: error`, `exhaustive-deps: warn`), deliberately not v7's React-Compiler preset (rationale in a config comment). One inline `exhaustive-deps` fix in `App.tsx` `navigateToTask` (stable-setter deps, zero behavior). 190/190 tests green.
- **CORE-324.3 — spec-skill-consistency.** Swept SPEC.md + 7 SPEC/ modules + 2 procedure SOPs + contract-bearing skills; cross-ref surface sound (every `§"..."` anchor resolves, ft-flowtron roster = 23 skills). 3 inline fixes: (1) `ft-micro-task` model gate binary→four-way tier-aware (SKILL.md + `step-1.5-model-edge.md`, mirrors ft-task); (2) `SPEC/model.md` loader line names all three Step-1.5 loaders; (3) `/ft-release` `SPEC.md:313` → stable `§"Operator-gate cues"` anchor. One by-design observation left as-is (`SPEC/procedures/ft-task.md` last-verified stamp lags — honest refresh needs a real re-verification run).
- **CORE-324.4 — docs-tooling-sweep.** Audited all 10 `docs/` files + `tools/update-adopters.mjs` (tool clean). 3 inline doc-drift fixes: (1) `AGENT-COMPAT.md` Grok stamp `v5.5.0`→`v5.7.0`; (2) `GLOSSARY.md` `[model]` gained `[medium]`; (3) `GLOSSARY.md` archetypes "four shapes"→"six". One judgment non-finding left (MIGRATION §3.4 `[opus]`/`[sonnet]` examples are valid specific-name tokens).

**Archive skim:** Self-referential — the cohort children are themselves the archive entries inventoried above. No non-cohort archive history needed re-reading; each child already logged its own predecessor skim (FE-* for viz, prior SPEC/doc sweeps for `.3`/`.4`).

**Drift check (cohort edits verified present at HEAD — see Phase 2 grep):** all three implementation children's cited edits landed and read coherently. No drift; no surface moved post-closure.

**Clarifications:** None needed — cohort scope unambiguous, full cohort closed same day, no deferred children.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass over existing cohort deliverables, no new code surface.

- [x] Implemented the minimal solution — verification work; no inline fix needed (audit surfaced no miss).

- [x] Updated/added tests for non-trivial behavior — N/A (no code edits).

**Implementation Notes:**

**Cohort coherence pass — clean. No findings, no inline fixes, no follow-ups.**

Verified every cohort edit landed and remains coherent at HEAD (grep sweep):

- **324.2 (viz):** `eslint-plugin-react-hooks` in `viz/package.json` (`^7.1.1`) + `viz/eslint.config.js` (`plugins: { 'react-hooks' }`, both rules active). ✓
- **324.3 (SPEC/skills):** `ft-micro-task` SKILL.md + `step-1.5-model-edge.md` carry the four-way branch (Satisfied / Category under-tier ⚠️ / Concrete mismatch STOP / Absent legacy), section headings mirror ft-task; `SPEC/model.md` loader line names `/ft-task`, `/ft-micro-task`, `/ft-debug`; `/ft-release` cites `§"Operator-gate cues"` (no residual `SPEC.md:313`). ✓
- **324.4 (docs/tool):** `AGENT-COMPAT.md:96` Grok prose reads `v5.7.0` (matches matrix row + PLATFORMS footer); `GLOSSARY.md:63` `[model]` lists `[heavy]`/`[medium]`/`[light]`; `GLOSSARY.md:81` "six shapes" + members match SPEC + VISION. ✓

**Coherence verdict:**

- **Disjoint surfaces, no contradiction.** The three implementation children partitioned cleanly — viz config (`.2`) / SPEC + skills (`.3`) / docs + tooling (`.4`) — with zero shared file. No contradictory cross-refs across deliverables.
- **Naming/style parity.** All three honored the cohort's stated deliverable shape ("audit + inline-fix high-confidence findings"); each recorded a "non-findings left as-is" judgment block, consistent style. The `[medium]` rung is now uniform across the surfaces that carry the `[model]` vocabulary (GLOSSARY now matches SPEC / AGENT-NEUTRALITY / templates / the four-way micro gate).
- **No regressions** in earlier-shipped children's surfaces — `.2`'s viz changes don't touch `.3`/`.4`'s docs/skills, and vice versa; verified by the disjoint-path partition.

**Cumulative doc-drift (the value-add of the audit-level sweep):** checked whether any cohort change should have rippled into an AI-referenced cold-start doc but didn't. It didn't — `.3`'s ft-micro-task gate fix is internal to lazy-loaded SKILL.md + fragment (not the cold-start 11); no AI-referenced doc describes the micro gate's binary-vs-tier mechanics. `.4`'s only cold-start-surface edit (`AGENT-COMPAT.md`) was applied within the cohort and reads current. Nothing slipped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code edits; audit is markdown-prose verification).

- [x] Ran lint/type-check on changed code — N/A (no changed code).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface touched by the audit).

**Testing Notes:** Audit applied no inline fix, so no executable surface changed — no test/lint/typecheck/frontend gate applies. Verification was the grep-backed coherence sweep recorded in Implementation Notes (cohort edits present and coherent at HEAD).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (fixed line — cumulative across the cohort):**

- `README.md` — no change
- `SPEC.md` — no change (the `.3`/`.4` edits aligned skills + GLOSSARY *to* SPEC; no SPEC claim invalidated)
- `docs/MIGRATION.md` — no change (23-command / nine-wired counts still hold)
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change (3-rung `[model]` set already correct here; GLOSSARY aligned to it in `.4`)
- `docs/PLATFORMS.md` — no change (Grok footer already `v5.7.0`; AGENT-COMPAT prose aligned to it in `.4`)
- `claude/CAPABILITIES.md` — no change (last-verified `v5.7.0 · 2026-06-13` current)
- `docs/AGENT-COMPAT.md` — no change *at audit time* (updated within the cohort by `.4`; reads current — Grok/Claude `v5.7.0`, Codex `v5.2.0` skipped @ v5.7.0)

**Final Summary:** Closing audit for `CORE-EPIC-324` (`repo-best-practices-sweep`) — the cohort is coherent and no audit-level miss surfaced. The three implementation children partitioned cleanly across disjoint surfaces (viz config / SPEC + skills / docs + tooling) with zero shared file and no contradictory cross-refs; every cited edit landed and reads coherently at HEAD (grep-verified). The `[medium]` rung is now uniform across all `[model]`-vocabulary surfaces, and `.3`'s ft-micro-task gate fix brought the micro-task model gate into parity with ft-task. Cumulative doc-drift sweep across the 11 AI-referenced docs: all "no change" — `.4`'s sole cold-start-surface edit (AGENT-COMPAT Grok stamp) was applied within the cohort and is current; `.3`'s gate fix lives in lazy-loaded SKILL surface, not the cold-start set. No inline fixes needed, no follow-ups warranted. `chore:` closure (no code edits in the audit itself).

**Archived:** 2026-06-14
