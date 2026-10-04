---
title: screenshot-discipline audit
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-483, CORE-483.1, CORE-483.2, CORE-483.3, CORE-483.4]
---

# CORE-483.N | screenshot-discipline audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-483]]

## 🎯 Goal

Verify the completed `CORE-EPIC-483` (`screenshot-discipline`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-483.N — audit CORE-EPIC-483` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-483.N` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-483.N.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-483` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-483.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-483]] — parent epic (screenshot-discipline)
- [[CORE-483.1]] — Discovery; locked the epic's policy (also recorded "no `.N` audit" — superseded by operator decision at this audit's filing)
- [[CORE-483.2]] — screenshot-policy-rewrite (personal-layer CLAUDE.md + MCP + memory)
- [[CORE-483.3]] — natabula-deposit-alignment
- [[CORE-483.4]] — screenshot-prune-sweep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four implementation children (`.1`–`.4`) are closed. `[[CORE-483.1]]`'s Discovery originally resolved "no `.N` audit (small policy epic)"; the operator explicitly chose to run it anyway when this skill flagged the contradiction at invocation. No open siblings — no early-audit scope caveat applies.

- [x] Read relevant source files — archived tasknotes `.flowtron/tasknote/archive/core/CORE-483.{1,2,3,4}.md` (Final Summary + Implementation Notes of each); `SPEC/epic.md`; `.flowtron/tasknote/README.md` §"AI-referenced docs" (17-entry list); `.flowtron/PLAN.md` cohort block

- [x] **Best Practices Review** — N/A: no code surface; the audit is a verification pass over already-closed personal-layer/natabula deliverables plus a cohort-coherence read

- [x] **Archive skim** — self-referential: the cohort under audit *is* the archive skim target (see Discovery Notes below for the per-child inventory)

- [x] **Drift check** — re-verified live: `grep -rln screenshot` over the 17 doc-set entries (README/AGENTS/SPEC/docs/claude/codex/cursor/grok surfaces) returns only `README.md:21`, the pre-existing `[[CORE-383]]` `viz-board.png` hero-shot reference — unchanged, correctly out of scope. No cited path in any of the four children's Final Summaries has moved.

- [x] Asked clarifying questions — none beyond the pre-invocation AskUserQuestion (audit-vs-skip), already resolved

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory (all four children, verified against archived tasknotes):**

- **`[[CORE-483.1]]`** (Discovery) — root-caused the screenshot-accretion habit to the global `~/.claude/CLAUDE.md` path rule (not a flowtron contract); locked policy via operator scoping table (self-verification-only trigger, absolute `~/Code/_screenshots/<project>/` destination, "prune all" scope, flowtron stays silent). Filed `.2`–`.4`; declined a `.N` audit at filing time.
- **`[[CORE-483.2]]`** (screenshot-policy-rewrite) — rewrote `~/.claude/CLAUDE.md:54`, repointed `~/.claude.json` playwright MCP `--output-dir` off `/tmp/playwright-mcp`, rewrote memory `feedback_playwright_artifact_paths.md` in place. All three edits outside any git repo; verified persisted by re-read.
- **`[[CORE-483.3]]`** (natabula-deposit-alignment) — added a 3-line safety-net-framing comment above `.flowtron/screenshots/` in both `~/Code/natabula/configs/.gitignore` (the adopter deposit) and `~/Code/natabula/.gitignore` (dogfooded copy). Explicitly left `configs/.claudeignore`/`.cursorignore` untouched (identical bare line, flagged as a visible out-of-scope gap) and adopter-repo comment drift out of scope (routed to `/natabula-layer-drift` per `[[CORE-483.1]]`'s resolution).
- **`[[CORE-483.4]]`** (screenshot-prune-sweep) — created `~/Code/_screenshots/`; deleted 904 gitignored/untracked files (~300MB) across 15 of 19 adopter repos. Mid-flight finding: 4 repos (bananapeel, siteguy, InvisiPaw, delparte-partial) had git-tracked screenshot content contradicting the "all gitignored" filing-time premise — surfaced via AskUserQuestion, operator chose "skip tracked files," guarded by a per-file `git ls-files` check. Zero tracked-file deletions confirmed post-sweep.

**Coherence finding — fixed inline (see Implementation Notes).** `[[CORE-483.3]]`'s top-level `## ✅ Acceptance` and `## 🧩 Subtasks` checkboxes were archived as `- [ ]` (unchecked) despite `status: completed` and its own Phase 4 closure box stating "every criterion ticked." `.1`, `.2`, and `.4` all correctly show `[x]` in the same sections. Corrected in place.

**No other coherence issues found.** Naming is consistent (`screenshot-discipline` / `screenshot-policy-rewrite` / `natabula-deposit-alignment` / `screenshot-prune-sweep`); Fan-out declarations in `[[CORE-483.1]]` (`.3` ∥ `.4`, both Sequential after `.2`) match the `blocked-by:`/`parallel-safe-with:` YAML each child actually carries; cross-refs (`[[CORE-EPIC-483]]`, sibling wikilinks) all resolve; the "flowtron stays silent" premise holds across all four children's doc-drift sweeps and this audit's independent re-check.

**Deferred items surfaced by the cohort (acknowledged, no flowtron-side follow-up needed):** natabula's `configs/.claudeignore`/`.cursorignore` still carry the pre-`.3` bare `.flowtron/screenshots/` line, and adppro's gitignore comment claims 13 tracked PNGs that no longer exist. Both are natabula/adopter-side drift explicitly routed to `/natabula-layer-drift` from their own sessions per `[[CORE-483.1]]`'s "Adopter layer" resolution — outside this repo and this audit's surface.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed `[[CORE-482.N]]`'s epic-audit shape (cohort inventory → coherence pass → doc-drift sweep); no code pattern to extend, this is a verification pass

- [x] **Minimal refactor gate** — one inline fix applied (checkbox-state correction on an already-archived tasknote), nothing else touched

- [x] Implemented the minimal solution — cohort coherence inventory complete (Phase 1); one miss found and fixed inline; doc-drift sweep run (below)

- [x] Updated/added tests for non-trivial behavior — N/A: no executable surface

**Implementation Notes:**

**Cohort coherence pass — result: one miss, fixed inline.** `[[CORE-483.3]]`'s `## ✅ Acceptance` (5 boxes) and `## 🧩 Subtasks` (7 boxes) were archived unchecked (`- [ ]`) despite `status: completed` and its own Phase 4 closure line asserting "every criterion ticked." Corrected to `- [x]` in `.flowtron/tasknote/archive/core/CORE-483.3.md` — a state-only fix, no prose changed, no other line touched. Root cause: likely a copy/paste or closure-ordering slip specific to that one child's Phase 4 pass; `.1`, `.2`, `.4` were unaffected.

**No other findings.** All four children's stated deliverables verified present and consistent: `~/.claude/CLAUDE.md:54` policy rewrite, `~/.claude.json` MCP output-dir repoint, memory rewrite ([[CORE-483.2]]); natabula `configs/.gitignore` + `.gitignore` comment additions ([[CORE-483.3]]); `~/Code/_screenshots/` creation + 904-file prune across 15 repos with tracked-file guards ([[CORE-483.4]]) — all internally consistent with the policy `[[CORE-483.1]]` locked and with each other. No contradictory cross-refs; no regression surfaced against any earlier-shipped child's surface (each child's own post-write verification table was re-read, not re-executed, and nothing in later children's work touches earlier children's edited files).

**No `/ft-file-followup` candidates.** The two deferred items (natabula's `.claudeignore`/`.cursorignore` gap, adppro's stale comment) are natabula/adopter-side and already explicitly routed to `/natabula-layer-drift` by `[[CORE-483.1]]`'s own resolution — filing a flowtron-PLAN follow-up for them would duplicate that routing, not add coverage.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only checkbox-state fix, no executable surface

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (below)

- [x] **Quality assertions** — the `.3` fix is a pure state correction (no prose byte changed beyond `[ ]`→`[x]`); re-diffed `CORE-483.3.md` to confirm only the 12 targeted checkbox markers changed and no adjacent line moved

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend surface

**Testing Notes:**

`git diff --stat .flowtron/tasknote/archive/core/CORE-483.3.md` confirms a single-file, checkbox-only diff (12 lines changed, `[ ]` → `[x]`, no other bytes touched). No other file in the repo modified by this audit beyond this tasknote itself.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 17 entries: `README.md`: no change (the `[[CORE-383]]` `viz-board.png` reference is the only screenshot mention, unaffected by this epic) · `AGENTS.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/AGENTS-snippet.md`: no change · `codex/AGENTS-snippet.md`: no change · `cursor/AGENTS-snippet.md`: no change · `grok/AGENTS-snippet.md`: no change · `docs/CONVENTIONS.md`: no change · `CONTRIBUTING.md`: no change · `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change · `docs/PLATFORMS.md`: no change · `claude/CAPABILITIES.md`: no change · `docs/AGENT-COMPAT.md`: no change · `docs/EXTERNAL-AGENTS.md`: no change · `docs/WORKTREES.md`: no change. Cumulative cross-check confirms all four children's individual "flowtron stays silent" verdicts hold — the entire epic's deliverable lands in the personal layer and natabula, by design.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` to be flipped to `completed` on archive move below, PLAN.md line to be flipped to stub form and kept nested under `CORE-EPIC-483`

- [x] **Evidence-based recap** drafted — surfaces at the 📦 ready-to-commit gate

**Final Summary:**

Audited the closed `CORE-EPIC-483` (`screenshot-discipline`) cohort. All four children (`.1`–`.4`) verified internally consistent with the policy `[[CORE-483.1]]`'s Discovery locked: the global self-verification-only screenshot trigger and absolute `~/Code/_screenshots/<project>/` destination ([[CORE-483.2]]), the natabula deposit's safety-net-framed gitignore comment ([[CORE-483.3]]), and the 904-file/~300MB prune across 15 adopter repos with tracked-file guards ([[CORE-483.4]]). One coherence miss found and fixed inline: `[[CORE-483.3]]`'s archived Acceptance/Subtasks checkboxes (12 boxes) were left unchecked despite its completed status — corrected to `[x]` in place, no prose changed. Doc-drift sweep: 17/17 flowtron docs "no change," confirming the epic's own "flowtron stays silent" premise cumulatively. No `/ft-file-followup` candidates — the two natabula/adopter-side gaps surfaced by the children (`.claudeignore`/`.cursorignore` parity, adppro's stale comment) are already explicitly routed to `/natabula-layer-drift` by `[[CORE-483.1]]`'s own resolution.

**Parent-flip:** operator confirmed Yes. `CORE-EPIC-483` flipped to stub form and moved with its full nested cohort (`.1`–`.4`, `.N`) atomically to the top of `## Completed` in `.flowtron/PLAN.md`.

**Archived:** 2026-08-27
