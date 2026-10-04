---
title: repo-context-candidacy
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-577.2, CORE-577.1, CORE-577.5]
touches:
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-audit-context/SKILL.md
blocked-by:
  - CORE-577.2
parallel-safe-with:
  - CORE-577.3
  - CORE-577.4
  - CORE-577.5
---

# CORE-577.6 | repo-context-candidacy

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-577]] · 🔗 [[CORE-577.2]]

## 🎯 Goal

Make `/ft-audit-repo` §6 and `/ft-audit-context` §5 propose `[unattended]` for the rows they file — candidates folded into each surface's existing write-confirm ask, token written only on rows the operator's confirmation kept, epic parents and `.N` placeholders never proposed.

## ✅ Acceptance

- [x] `/ft-audit-repo` §6: predicate runs over each drafted implementation-child line (never the `<AREA>-EPIC-<N>` parent or `.N` placeholder); candidates shown with `[unattended]` in place in the milestone-plan preview; the "after the user confirms" write step places the token after `[model]` only on rows kept — `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-audit-repo/SKILL.md`
- [x] `/ft-audit-repo` states its carve-out explicitly (parents and `.N` never candidates) — `grep -q 'never.*candidate' claude/skills/ft-audit-repo/SKILL.md`
- [x] `/ft-audit-context` §5: predicate runs over each drafted ticket line before the `AskUserQuestion` offer; candidates shown with the token in place alongside that ask; the ticket-format step gains an optional `[unattended]` after `[model]`, written only on rows the answer kept — `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-audit-context/SKILL.md`
- [x] Neither surface accepts `--fast`/`--unattended`, so only the attended branch applies on both; the `unattended-candidates:` literal is present on both (Pair N) and stated as never emitted — `grep -q 'unattended-candidates:' claude/skills/ft-audit-repo/SKILL.md` and `grep -q 'unattended-candidates:' claude/skills/ft-audit-context/SKILL.md`
- [x] Pair N passes at HEAD (literal + resolving label on both files) — the §7.1 Pair N block run locally → exit 0, prints nothing
- [x] Both skill bodies stay under the 33,000-byte cap — `[ $(wc -c < claude/skills/ft-audit-repo/SKILL.md) -lt 33000 ] && [ $(wc -c < claude/skills/ft-audit-context/SKILL.md) -lt 33000 ]`
- [x] No new gate, cue, banner, or checklist box on either surface — `judgment`: diff read against `SPEC/unattended-candidacy.md` §"Recommend, never write" → "Not a cue, not a gate"

## 🧩 Subtasks

- [x] `ft-audit-repo/SKILL.md` §6: candidacy paragraph before the write-confirm bullet — predicate over each drafted implementation-child line, parent + `.N` carved out explicitly, candidate shown with token in place in the item-3 preview; labeled mirror; no flags → attended-only, `unattended-candidates:` stated as never emitted
- [x] `ft-audit-repo/SKILL.md` §6 write-plan bullet list: new bullet — confirmed candidate children write `[unattended]` immediately after `[model]`; parents/`.N` never carry it
- [x] `ft-audit-context/SKILL.md` §5: insert a candidacy step before the `AskUserQuestion` offer — draft each finding's ticket line now (per the existing format step), run the predicate over each, show candidates with the token in place alongside the offer; labeled mirror; no flags → attended-only, `unattended-candidates:` stated as never emitted
- [x] `ft-audit-context/SKILL.md` §5 offer step: note the drafted lines (candidate token included) are shown alongside the four options; a dropped/subset-excluded line loses its token
- [x] `ft-audit-context/SKILL.md` §5 ticket-format step: line shape gains the optional confirmed `[unattended]` after `[model]`
- [x] Phase 3: Pair N block locally; byte-count both bodies; `.editorconfig` pass on changed files
- [x] Phase 4: doc-drift sweep, flip `.6` PLAN line nested under the parent, archive

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-577.2]] — blocked-by: the module (`SPEC/unattended-candidacy.md`) and the Pair N CI check this child mirrors and must pass
- [[CORE-577.1]] — depends-on: gate-map/surfaces table naming these two rows
- [[CORE-577.5]] — pattern precedent: `/ft-audit` and `/ft-refactor` candidacy paragraph shape, and the Pair N single-line label footgun
- [[CORE-577.3]] · [[CORE-577.4]] — parallel-safe-with: disjoint skill directories
- [[CORE-494]] — related-decision: minted `[unattended]`; "flowtron itself never writes it" is preserved verbatim

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed the module and the Pair N check; `.3`/`.4`/`.5` landed the sibling mirrors. `/ft-audit-repo` §6 and `/ft-audit-context` §5 are the remaining row in the module's §"Surfaces and mirrors" table this child owns. Neither surface has moved since `.1` filed the line.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (whole module, esp. §"Candidacy predicate" clause 5-6, §"Surfaces and mirrors" row for these two skills); `SPEC/epic.md` (epic-child dispatch; Fan-out echo); `claude/skills/ft-audit-repo/SKILL.md` (whole file, 8,640 B); `claude/skills/ft-audit-context/SKILL.md` (whole file, 10,209 B); `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair N block; `docs/CONTEXT-BUDGET.md` §"Budgets" (`claude/skills/*/SKILL.md` cap 33,000, applies uniformly); precedent tasknote `.flowtron/tasknote/archive/core/CORE-577.5.md` (audit-refactor-candidacy — same shape: candidacy paragraph + labeled mirror + carve-out sentence + attended-only literal). No probe needed — grep-scoped, two files.

- [x] **Best Practices Review** — prose skills, no code. Boundaries: (1) rule lives once in the module; each skill carries a one-line labeled mirror at its write step; (2) Pair N binds every `claude/skills/` file naming the module path — both bodies will name it, so both must carry the literal + a resolving label; (3) `ft-audit-repo` has no forker overlay (stack-neutral, no fork) and `ft-audit-context` is a standalone global-install skill (not part of the audit-family fork chain) — neither needs a fork-refresh note like `.5`'s `ft-audit` paragraph did.

- [x] **Archive skim** — `ls archive/core/` non-empty (area from the README table). `grep -l 'ft-audit-repo/SKILL.md\|ft-audit-context/SKILL.md' archive/core/*.md` → hits on `.1`, `.2`, `.3`, `.5`; load-bearing: [[CORE-577.1]] (surfaces table entry for these two rows, scoped "milestone / ticket write"), [[CORE-577.2]] (Pair N mechanics, label-resolves-to-heading rule), [[CORE-577.5]] (identical paragraph/mirror/carve-out shape on the sibling `ft-audit`/`ft-refactor` pair — direct template for this edit). No ⚠️ pointers on any.

- [x] **Drift check** — PLAN line cites "`/ft-audit-repo` §6 and `/ft-audit-context` §5", "predicate over milestone children / ticket lines", "candidates folded into the existing write-confirm AskUserQuestion", "token only on confirmed rows", "Epic parents and `.N` placeholders never proposed": all match HEAD. `ft-audit-repo` §6 item 3 is the milestone-plan preview + "after the user confirms, write the plan" step (a prose review, not literally `AskUserQuestion` — item 5 of the same section is the only literal `AskUserQuestion` call, reserved for ambiguity questions); `ft-audit-context` §5 item 2 is the literal `AskUserQuestion` offer, but the actual ticket-line text is only assembled in item 3 today — so "folded into the existing write-confirm AskUserQuestion" requires drafting ticket lines *before* that ask (moving what item 3 does today one step earlier) rather than adding a new gate. Neither skill accepts `--fast`/`--unattended` (confirmed: no flag parsing in either file), so both take the module's attended-only branch, same as `.5`'s `ft-audit` (no flags) precedent. No SPEC contradiction.

- [x] Asked clarifying questions — No clarifications needed. Explicit assumptions: (a) "Epic parents and `.N` placeholders never proposed" is `/ft-audit-repo`-specific (per the module's own carve-out list: "the epic parents and `.N` placeholders `/ft-audit-repo` files at first contact"); `/ft-audit-context` has no epic/`.N` concept — its tickets are plain `<AREA>-<N>` rows, so only the module's base predicate (clauses 1-4) applies there. (b) "Folded into the existing write-confirm AskUserQuestion" for `/ft-audit-context` means drafting the ticket lines earlier (at the point item 2 today only offers coarse choices) so the same `AskUserQuestion` call review covers the exact lines that would be written — not adding a second ask. (c) Both files' internal step numbering inside §5/§6 may shift by one item as the candidacy step is inserted; no other file in the repo cites a numbered sub-item inside these sections (checked via grep), so this is safe. (d) Neither skill needs a fork-refresh note (`.5`'s `ft-audit` paragraph) — `ft-audit-repo` has no fork and `ft-audit-context` is a standalone global install, not part of the forkable audit-family chain.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared.

**Discovery Notes:**

**Gate map for these two surfaces:**

| Surface / mode | Predicate runs | Proposal shown | Token written | `unattended-candidates:` |
|---|---|---|---|---|
| `/ft-audit-repo` (no flags) | §6, over each drafted implementation-child line (never parent/`.N`) | in the item-3 milestone-plan preview, token in place | in the "after the user confirms, write the plan" step, only on kept rows | never (literal present for Pair N; stated as never emitted) |
| `/ft-audit-repo` parent / `.N` rows | **no** (module's own carve-out) | — | never | — |
| `/ft-audit-context` (no flags) | §5, over each drafted ticket line, before the `AskUserQuestion` offer | alongside the offer, token in place | in the ticket-format step, only on rows the answer kept | never (literal present for Pair N; stated as never emitted) |
| `/ft-audit-context` "File none" | predicate still runs (drafted before the ask) | shown, then discarded | never (nothing filed) | — |

**Budget:** `ft-audit-repo/SKILL.md` 8,640 / 33,000 (≈24,360 headroom); `ft-audit-context/SKILL.md` 10,209 / 33,000 (≈22,791 headroom). Both far under cap; expected growth ≈ +600–900 each.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the exact mirror-paragraph shape used by `ft-epic-discovery`/`ft-audit`/`ft-file-followup` (bold heading + parenthetical mirror + "Read that module now" + predicate clause + "proposed, never seeded" sentence + attended-only-literal sentence + CORE-494 closing sentence) rather than the looser prose I drafted in Discovery — grep confirmed the fixed shape before writing.

- [x] **Minimal refactor gate** — none; only the sentences each edit needed. No other prose in either file touched.

- [x] Implemented the minimal solution — `ft-audit-repo/SKILL.md` §6: item-3 preview note (token in place), candidacy paragraph (parent/`.N` carve-out, attended-only), write-plan bullet for the token. `ft-audit-context/SKILL.md` §5: new item 2 (draft ticket lines + candidacy paragraph), item 3 offer note (drafted lines shown, subset drops tokens), item 4 ticket-format token segment.

- [x] Updated/added tests for non-trivial behavior — N/A (prose skills); Pair N block is the test.

**Implementation Notes:**

- Matched the mirror-paragraph's fixed shape verbatim (label parenthetical, predicate-clause sentence, "proposed, never seeded" sentence, attended-only sentence, CORE-494 sentence) rather than the shorter form drafted during Discovery — keeps the sentence-level idiom identical across all six mirrors, not just the label.
- `ft-audit-context` has no epic/`.N` concept, so its candidacy clause 5-6 note is "no `Blocked by` clause on these (plain `<AREA>-<N>` tickets, no epic concept here)" rather than a parent/`.N` carve-out.
- `ft-audit-context`'s existing flow only assembled ticket-line text at what was item 3 (now item 4); inserted a new item 2 so the drafted lines — and any candidate token — exist before the `AskUserQuestion` offer, per the PLAN line's "folded into the existing write-confirm AskUserQuestion." Old items 2/3 renumbered to 3/4; no other file in the repo cites a numbered sub-item inside either skill's §5/§6 (grepped), so the shift is safe.
- Growth: `ft-audit-repo/SKILL.md` 8,640 → 9,873 (+1,233); `ft-audit-context/SKILL.md` 10,209 → 11,438 (+1,229). Both stay far under the 33,000 cap.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — Pair N block (§7.1 / CI `drift` step) run locally at HEAD → exit 0, printed nothing; now binds six files.

- [x] Ran lint/type-check on changed code — `.editorconfig` pass on both changed skill files + this tasknote: no trailing whitespace, final newline present on all three.

- [x] **Verification receipt** — below. No duplication (rule cited via mirror, not restated); no new gate/cue/banner/box; no stale code-facing doc.

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-audit-repo/SKILL.md` → 0
- `grep -q 'never.*candidate' claude/skills/ft-audit-repo/SKILL.md` → 0
- `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-audit-context/SKILL.md` → 0
- `grep -q 'unattended-candidates:' claude/skills/ft-audit-repo/SKILL.md` → 0
- `grep -q 'unattended-candidates:' claude/skills/ft-audit-context/SKILL.md` → 0
- Pair N block (bash, from §7.1) → 0, printed "PAIR N: OK"
- `[ $(wc -c < claude/skills/ft-audit-repo/SKILL.md) -lt 33000 ]` → 0 (9,873); `[ $(wc -c < claude/skills/ft-audit-context/SKILL.md) -lt 33000 ]` → 0 (11,438)
- judgment (no new gate/cue/banner/box): diff read against `SPEC/unattended-candidacy.md` §"Recommend, never write" → "Not a cue, not a gate" — the candidacy rides each surface's existing review/ask, no new banner or checklist box on either → holds
- editorconfig pass over changed files → clean (no trailing whitespace, final newline present)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change across the board: only `claude/skills/*/SKILL.md` files changed, and `.flowtron/tasknote/README.md` §"AI-referenced docs" explicitly excludes `claude/skills/*/SKILL.md` from the sweep set (volume decision). No roster, flag, or module edited.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` → `completed`; `.6` PLAN.md line flipped to stub form, kept nested under `CORE-EPIC-577` in `## High`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

**Final Summary:**

`/ft-audit-repo` and `/ft-audit-context` now propose `[unattended]` for the rows they file, completing the last row in `SPEC/unattended-candidacy.md`'s §"Surfaces and mirrors" table. On `/ft-audit-repo` §6, the predicate runs over each drafted implementation-child line as it is drafted for the item-3 milestone-plan preview (parent `<AREA>-EPIC-<N>` and `.N` audit placeholder explicitly carved out, per the module's own exception), the preview shows a candidate with the token in place, and the "after the user confirms" write step keeps it only on rows the operator's review kept. On `/ft-audit-context` §5, a new item 2 drafts each finding's ticket line early and runs the predicate over it, so the candidate — token in place — sits alongside the existing item-3 `AskUserQuestion` offer; item 4's write keeps the token only on rows the answer (file-all or a kept subset) retained. Neither surface accepts `--fast`/`--unattended`, so both take the attended-only branch; the `unattended-candidates:` literal is present on both for Pair N and stated as never emitted. The CORE-494 rule that flowtron never seeds the marker holds verbatim; Pair N now binds six files across the epic.

- **Changed (2 files, +54/−6):** `claude/skills/ft-audit-repo/SKILL.md` (+1,233 B → 9,873 / 33,000) · `claude/skills/ft-audit-context/SKILL.md` (+1,229 B → 11,438 / 33,000).
- **Verification:** six grep/size criteria → 0; Pair N block → 0, printing "PAIR N: OK"; judgment criterion holds on diff read; editorconfig pass clean on both files + this tasknote.
- **`touches:` reconciliation:** declared 2, changed 2 (+ `.flowtron/PLAN.md` stub flip and this tasknote — closure paths). Undeclared: none.
- **Scope decisions:** matched the fixed mirror-paragraph shape used by the other four filers verbatim rather than a shorter ad-hoc form; `ft-audit-context` items renumbered 2→4 (no other file cites a numbered sub-item inside either skill's §5/§6, grepped before renumbering); `ft-audit-context`'s candidacy clause note reads "no `Blocked by` clause on these (plain tickets, no epic concept)" since the surface has no epic/`.N` shape to carve out.
- **Documentation:** doc-drift sweep found no change (skill bodies are outside the sweep set by the README's own volume-decision exclusion).
- **Maintainability effect:** all six filers named in the module's surfaces table now carry the identical mirror sentence and degrade per its table with nothing paraphrased; CORE-EPIC-577's implementation work is complete — only the `.N` synthesis audit remains.
