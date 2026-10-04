---
title: audit-refactor-candidacy
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-577.2, CORE-577.1, CORE-577.3, CORE-494]
touches:
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
blocked-by:
  - CORE-577.2
parallel-safe-with:
  - CORE-577.3
  - CORE-577.4
  - CORE-577.6
---

# CORE-577.5 | audit-refactor-candidacy

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-577]] · 🔗 [[CORE-577.2]]

## 🎯 Goal

Make `/ft-audit` §5 and `/ft-refactor` Step 5 propose `[unattended]` for the rows they file — inside the existing AskUserQuestion write-step review on each (token written only on rows the operator confirms), trivial-fix carve-out rows excluded, and `/ft-refactor --fast` emitting `unattended-candidates:` with zero tokens written.

## ✅ Acceptance

- [x] `/ft-audit` §5 step 1: the predicate runs over each proposed ticket line and candidates are shown with the token in place inside the existing write-step AskUserQuestion; step 3 writes `[unattended]` after `[model]` only on confirmed rows — `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-audit/SKILL.md`
- [x] `/ft-audit` trivial-fix carve-out rows (`- [x]` under `## Completed`) are never evaluated or proposed, stated in the carve-out paragraph — `grep -q 'carve-out.*never.*candidate\|never a candidate' claude/skills/ft-audit/SKILL.md`
- [x] `/ft-audit` has no `--fast` / `--unattended`, so only the attended branch applies; the `unattended-candidates:` literal is present (Pair N) and its non-emission from this surface is stated — `grep -q 'unattended-candidates:' claude/skills/ft-audit/SKILL.md`
- [x] `/ft-refactor` Step 4 review shows candidate children / `.N` with the token in place (clause-6 predecessor named); Step 5 item 2 writes the token only on confirmed rows, after `[<model>]`; parent never proposed — `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-refactor/SKILL.md`
- [x] `/ft-refactor --fast`: rows written without the token and `unattended-candidates: <IDs|none>` emitted on its own line in the Step 6 hand-off — `grep -q '^unattended-candidates:' claude/skills/ft-refactor/SKILL.md`
- [x] Pair N passes at HEAD (literal + resolving label on both files) — the §7.1 Pair N block run locally → exit 0, prints nothing
- [x] `claude/skills/ft-audit/SKILL.md` stays under the 33,000-byte cap — `[ $(wc -c < claude/skills/ft-audit/SKILL.md) -lt 33000 ]`
- [x] No new gate, cue, banner, or checklist box on either surface; `/ft-audit` §6 "Subroutine-safe" still skips §5 wholesale (so no candidacy there either) — `judgment`: read the diff against `SPEC/unattended-candidacy.md` §"Recommend, never write" → "Not a cue, not a gate"

## 🧩 Subtasks

- [x] `ft-audit/SKILL.md` §4 item 3: proposed tickets are presented with any candidate's token in place (so the report the operator reviews is the row that will be written)
- [x] `ft-audit/SKILL.md` §5 step 1: candidacy paragraph — Read the module at this write step, run the predicate over each proposed ticket line, show candidates inside the write-step AskUserQuestion, confirmation keeps the token; labeled mirror to §"Three postures"; no flags → attended only, `unattended-candidates:` never emitted here; full-copy forks pick it up at re-reconcile
- [x] `ft-audit/SKILL.md` §5 step 3: line shape gains the optional confirmed `[unattended]` after `[model]`
- [x] `ft-audit/SKILL.md` §5 carve-out paragraph: inline-fix `- [x]` rows are never candidates (nothing to dispatch)
- [x] `ft-refactor/SKILL.md` Step 3: after model tags, run the predicate over the drafted parent / children / `.N` lines (parent never; `.2` reads its predecessor as closed since there is no `.1`; each later child only when its `blocked-by:` predecessor is proposed in the same pass) — labeled mirror
- [x] `ft-refactor/SKILL.md` Step 4: the review shows candidate lines with the token in place; `fast-mode = true` → no act, emit `unattended-candidates:` in the Step 6 hand-off
- [x] `ft-refactor/SKILL.md` Step 5 item 2: write the confirmed token after `[<model>]`; never under `--fast`
- [x] `ft-refactor/SKILL.md` Step 6: the hand-off message carries the `unattended-candidates:` line under `--fast` (own line, always, `none` when empty)
- [x] Phase 3: Pair N block locally; byte-count both bodies; `.editorconfig` pass on changed files
- [x] Phase 4: doc-drift sweep, flip `.5` PLAN line nested under the parent, archive

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-577.2]] — blocked-by: the module (`SPEC/unattended-candidacy.md`) and the Pair N CI check this child mirrors and must pass
- [[CORE-577.1]] — depends-on: gate map row for both surfaces (Discovery Notes table); `.5` scoped as "audit family split by write pattern"
- [[CORE-577.3]] — parallel-safe-with; pattern precedent — the `/ft-epic-discovery` Step 7 candidacy paragraph and its Step 8 mental-pass line
- [[CORE-577.4]] · [[CORE-577.6]] — parallel-safe-with: disjoint skill directories
- [[CORE-494]] — related-decision: minted `[unattended]`; "flowtron itself never writes it" is preserved verbatim

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed the module and the Pair N check; `.3` and `.4` landed the sibling mirrors and fixed the paragraph shape. `/ft-audit` §5 and `/ft-refactor` Step 4/5 are the two rows in the module's §"Surfaces and mirrors" table owned by this child, and each already has exactly the gate the module assumes (AskUserQuestion write-step confirm; AskUserQuestion plan review with an own `--fast` that skips it). Nothing has moved since `.1` filed the line.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (whole module); `SPEC/epic.md` (epic dispatch; Fan-out echo); `claude/skills/ft-audit/SKILL.md` §1, §4–§6 (write-step confirm, ticket grammar, carve-out, subroutine-safe rule); `claude/skills/ft-refactor/SKILL.md` header, Step 1 (`--fast`), Steps 3–6, Notes (no `.1` child); `claude/skills/ft-epic-discovery/SKILL.md` Step 7 diff from `.3` (pattern); `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair N block; `claude/skills/ft-update/SKILL.md` Step 4.5 (fork refresh scope); `templates/audit-overlay-template.md` header; `docs/CONTEXT-BUDGET.md` §"Budgets". No probe — grep-scoped.

- [x] **Best Practices Review** — prose skills, no code. Boundaries: (1) rule lives once in the module; each skill carries a one-line labeled mirror at its write step (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors"); (2) Pair N binds every `claude/skills/` file naming the module path — both bodies name it, so both carry the literal + a resolving label; `passes/*.md` and `scaffold-bootstrap.md` are not touched and do not name the module; (3) `/ft-audit`'s skill body already says `AskUserQuestion` in its own prose (Claude-specific body, not contract), so the new paragraph matches the surrounding idiom rather than the module's agent-neutral "structured ask".

- [x] **Archive skim** — `ls archive/core/` non-empty (759 notes; area from the README table). `grep -l 'ft-audit/SKILL.md\|ft-refactor/SKILL.md'` → 38 hits; load-bearing read directly: [[CORE-577.1]] (gate-map rows for both surfaces; `.5` split rationale), [[CORE-577.2]] (Pair N exclusion + label-resolves-to-heading rule; agent-neutral vocabulary applies to *contract* prose), [[CORE-577.3]] (paragraph shape: predicate over rows as written, review prompt shows the token in place, confirmation adds it in place), [[CORE-563]] (§5 step 5 post-stage verification — the commit item must stay the filing's last write), [[CORE-561]] (operator-action filter sits at finding time, upstream of §5 — unaffected), [[CORE-463.x]] (`/ft-refactor` origin: Step 4 review is the commit authorization; `--fast` "never widens what gets written"), [[CORE-570]] (`/ft-refactor` writes starters from the template directly). No ⚠️ pointers on any.

- [x] **Drift check** — PLAN line cites "`/ft-audit` §5", "`/ft-refactor` Step 5", "existing AskUserQuestion write-step review", "`/ft-refactor --fast` emits `unattended-candidates:` and writes none", "trivial-fix carve-out rows excluded", "adopter forks … only via `/ft-update`'s fork refresh": all match HEAD — §5 step 1 is the AskUserQuestion confirm; `/ft-refactor` Step 4 is the AskUserQuestion review and Step 1 owns `--fast`; the carve-out lives in §5 as a `- [x]` `## Completed` line. One precision on the last claim: `/ft-update` Step 4.5 auto-copies only *newly shipped pass files*; a full-copy fork's `SKILL.md` is reached by the **drift warning** (item 4) and the forker's manual re-reconcile, while a thin overlay reads the bundled body by reference and inherits on the bump. The module's "only through `/ft-update`'s fork refresh" sentence stays true in spirit; the skill paragraph names the mechanism precisely. No SPEC contradiction: token written only after the operator's confirm, never under `--fast`; `/ft-audit` accepts no flag so its `unattended-candidates:` literal is present for Pair N but stated as never emitted (same shape `.3` used for `/ft-epic-discovery`).

- [x] Asked clarifying questions — No clarifications needed. Explicit assumptions: (a) `/ft-audit`'s trivial-fix `- [x]` rows are excluded by the module's own carve-out sentence — stated once in the carve-out paragraph, not re-derived through the predicate. (b) `/ft-audit` §6 "Subroutine-safe" skips §5 entirely, so a subroutine invocation (`/ft-release` §7.1 → `/ft-audit docs`) runs no candidacy; the invoking skill owns filing. (c) `/ft-refactor` clause 6: with no `.1`, the first child `.2` reads its predecessor as closed (the run *is* the discovery, per Notes); each later child is admitted only when its `blocked-by:` predecessor (the sequence chain Step 5 item 3 writes) is proposed in the same pass, or — where `parallel-safe-with:` decoupled it — when its stem predecessor is; `.N` needs clauses 1–4 only; the parent is never proposed. (d) `/ft-refactor` starter tasknotes carry no token — the marker is a PLAN-row segment only. (e) Under `/ft-refactor --fast` the line lands in the Step 6 hand-off message (the run's "write report"), not in a file — the skill has no `--unattended`, so the module's §"Persistence" duty does not apply. (f) No edit to `ft-update`, the overlay template, or any pass file.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared.

**Discovery Notes:**

**Gate map for these two surfaces** (what the module's three postures land on):

| Surface / mode | Predicate runs | Proposal shown | Token written | `unattended-candidates:` |
|---|---|---|---|---|
| `/ft-audit` (no flags) | §5 step 1, over each proposed ticket line | inside the §5 step 1 write-step AskUserQuestion, ticket shown with token in place | §5 step 3, only on confirmed rows | never (literal present for Pair N; stated as never emitted) |
| `/ft-audit` carve-out rows | **no** | — | never | — |
| `/ft-audit` as subroutine | **no** (§5 skipped wholesale) | — | never | — |
| `/ft-refactor` default | Step 3, over parent / children / `.N` as drafted | inside the Step 4 AskUserQuestion review, with clause-6 predecessor named | Step 5 item 2, only on confirmed rows | never |
| `/ft-refactor --fast` | Step 3 | no gate | never | Step 6 hand-off, own line, always (`none` when empty) |

**Budget:** `ft-audit/SKILL.md` 25,051 / 33,000 at entry (≈7,900 headroom); `ft-refactor/SKILL.md` 13,699. Expected growth ≈ +1,500 / +1,800.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the `.3` paragraph shape (`/ft-epic-discovery` Step 7: predicate over rows as written, review shows the token in place, confirmation adds it in place, mental-pass line) and the module's `--fast` fenced-`text` emission block. On `/ft-audit` the paragraph nests under §5 step 1 (the write-step confirm it rides); on `/ft-refactor` it is a Step 3 doctrine bullet (the drafting step), with Step 4 / 5 / 6 each gaining the one sentence their step owns. No new shape.

- [x] **Minimal refactor gate** — none. No adjacent prose touched beyond the sentences each edit needed; `passes/*.md`, `scaffold-bootstrap.md`, the overlay template, and `ft-update` untouched.

- [x] Implemented the minimal solution — `ft-audit/SKILL.md`: §4 item 3 (present tickets exactly as §5 writes them, token included), §5 step 1 candidacy paragraph (labeled mirror; attended-only; literal stated as never emitted; fork note), §5 step 3 line shape, carve-out "never a candidate" sentence. `ft-refactor/SKILL.md`: Step 3 candidacy bullet (labeled mirror; clause-6 reading with no `.1`; never on a starter note), Step 4 default review shows candidates + `--fast` emission block, Step 5 item 2 token write, Step 6 hand-off carries the line.

- [x] Updated/added tests for non-trivial behavior — N/A (prose skills); the Pair N CI step is the test and was run locally against HEAD (Phase 3).

**Implementation Notes:**

- **Pair N label must be single-line.** The first `ft-refactor` draft wrapped `` mirror of `SPEC/unattended-candidacy.md` §"Three postures" `` across two lines at the body's 76-col wrap and Pair N reported `NO LABELED MIRROR` — the `grep -oE` is line-scoped. Kept the label on one line (the only over-wrap line in the edit); every other line rewrapped.
- **`/ft-audit` ordering:** the predicate runs when the §4 item 3 ticket list is drafted (so the report the operator reads is the row that will be written) and the confirm is §5 step 1 — worded as "drafted for §4 item 3 … shown in the report and again in the write-step ask" rather than as a second display step.
- **`/ft-audit` literal:** present for Pair N and stated as never emitted (no `--fast` / `--unattended` on this surface) — the same shape `.3` used on `/ft-epic-discovery`.
- **Fork mechanism named precisely:** thin overlays read the bundled body by reference and inherit on the bump; full-copy forks reach it only when the forker re-reconciles after `/ft-update` Step 4.5's drift warning (that step auto-copies pass files only). The module's "only through `/ft-update`'s fork refresh" sentence is left as is — true in spirit, and the skill paragraph is where a forker reads.
- **Foreign PLAN.md hunk mid-session:** another session appended `CORE-578` to `## Low` while this task ran (routed by natabula NAT-245) and committed it as `9b90f79` before this closure. Preserved untouched; by closure time `PLAN.md` carried only this task's `.5` stub hunk, so the commit stages it normally.
- **Growth:** `ft-audit/SKILL.md` 25,051 → 26,972 (+1,921; 6,028 under cap); `ft-refactor/SKILL.md` 13,699 → 15,861 (+2,162).
- Downstream-impact scan: `.3` / `.4` / `.6` touch disjoint skill dirs; the `.N` audit's degrade walk now has this surface's five-row gate map (Discovery Notes). No reconcile edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — Pair N block (§7.1 / CI `drift` step) run locally at HEAD → exit 0, printed nothing; now binds five files (`ft-epic-discovery`, `ft-file-followup`, `ft-task/unattended-mode.md`, `ft-audit`, `ft-refactor`).

- [x] Ran lint/type-check on changed code — `.editorconfig` pass over the two changed skill files + this tasknote (no trailing whitespace, final newline present); `passes/*.md` and `scaffold-bootstrap.md` confirmed not to name the module path (0 hits — outside Pair N).

- [x] **Verification receipt** — below. No duplication (rule cited, not restated); no public-surface growth beyond the PLAN line (no flag, cue, banner, or checklist box added); no stale code-facing doc.

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-audit/SKILL.md` → 0
- `grep -q 'never a candidate' claude/skills/ft-audit/SKILL.md` → 0
- `grep -q 'unattended-candidates:' claude/skills/ft-audit/SKILL.md` → 0
- `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-refactor/SKILL.md` → 0 (after the single-line fix; first run → `NO LABELED MIRROR`)
- `grep -q '^unattended-candidates:' claude/skills/ft-refactor/SKILL.md` → 0
- Pair N block (bash, from §7.1) → 0, printed nothing
- `[ $(wc -c < claude/skills/ft-audit/SKILL.md) -lt 33000 ]` → 0 (26,972)
- judgment (no new gate/cue/banner/box; §6 "Subroutine-safe" still skips §5 wholesale): diff read against §"Recommend, never write" — the candidacy rides the existing `AskUserQuestion` on both surfaces, the `--fast` line is a report, §6 untouched → holds
- editorconfig pass over changed files → clean

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `AGENTS.md`, `SPEC.md`: no change (no new module, roster, or flag; the SPEC pointer from `.2` already covers these surfaces) · `docs/MIGRATION.md`: no change (§1.2.1 fork guidance unchanged; the fork note lives in the skill body a forker reads) · `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md`: no change (Codex wrappers read the canonical bodies; no roster or flag change) · `claude/commands/ft-audit.md` / `ft-refactor.md`: no change (`argument-hint:` flags unchanged — Pairs J/M) · `docs/CONVENTIONS.md`: no change (mirror convention applied, not amended) · `CONTRIBUTING.md`, `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change (skill bodies are Claude-specific and already say `AskUserQuestion`; contract prose untouched) · `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`: no change (no flag added; `/ft-refactor --fast` already listed) · `docs/EXTERNAL-AGENTS.md`: no change · `docs/WORKTREES.md`, `docs/VISION.md`, `docs/CONTEXT-BUDGET.md`: no change (ledger is release-refreshed; both bodies under cap) · `templates/audit-overlay-template.md`: no change (overlay reads the bundled body by reference).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` → `completed`; `.5` PLAN.md line flipped to stub form, kept nested under `CORE-EPIC-577` in `## High`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

**Final Summary:**

`/ft-audit` and `/ft-refactor` now propose `[unattended]` for the rows they file. On `/ft-audit`, the predicate runs over each proposed ticket as the §4 list is drafted, the candidate is shown with the token in place in the report and in the §5 write-step `AskUserQuestion`, and step 3 writes it only on rows the operator's confirmation kept; trivial-fix carve-out rows are never candidates, subroutine invocations run no candidacy (§5 skipped wholesale), and — with no flag on this surface — the `unattended-candidates:` line never emits. On `/ft-refactor`, the Step 3 draft runs the predicate over children + `.N` (parent never; `.2` reads its predecessor as closed since there is no `.1`; later children only when their `blocked-by:` predecessor is proposed in the same pass), the Step 4 review shows candidates with the token in place, Step 5 writes it only on confirmed rows, and `--fast` writes no token and reports `unattended-candidates: <IDs|none>` in the Step 6 hand-off. The CORE-494 rule that flowtron never seeds the marker holds verbatim; Pair N now binds five files.

- **Changed (2 files, +43/−7):** `claude/skills/ft-audit/SKILL.md` (+1,921 B → 26,972 / 33,000) · `claude/skills/ft-refactor/SKILL.md` (+2,162 B → 15,861).
- **Verification:** seven grep/size criteria → 0; Pair N block → 0, printing nothing; judgment criterion holds on diff read; editorconfig pass clean.
- **`touches:` reconciliation:** declared 2, changed 2 (+ `.flowtron/PLAN.md` stub flip and this tasknote — closure paths). Undeclared: none. The foreign `CORE-578` row landed in its own commit (`9b90f79`) before closure.
- **Scope decisions:** Pair N label kept single-line on `/ft-refactor` (line-scoped grep) · `/ft-audit` literal present-but-never-emitted, matching `.3` · fork mechanism named precisely in the skill paragraph, module sentence untouched · no edit to `ft-update`, pass files, overlay template, or command stubs.
- **Documentation:** all AI-referenced docs swept "no change" (list above).
- **Maintainability effect:** the two remaining filers with an AskUserQuestion write gate degrade per the module's table without a paraphrase anywhere — one labeled sentence each pointing at the rule, and the CI check fails the day a label or literal drifts.

**Archived:** 2026-09-11
