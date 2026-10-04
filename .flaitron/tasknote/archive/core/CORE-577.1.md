---
title: unattended-candidacy discovery
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-494, CORE-570, CORE-573]
touches:
  - .flowtron/PLAN.md
---

# CORE-577.1 | unattended-candidacy discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-577]]

## 🎯 Goal

Scope the `CORE-EPIC-577` epic (`unattended-candidacy`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-577.2..6` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (every filing surface, its confirm gate or lack of one, SPEC contract impact, the shared module home) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-577.2 .. CORE-577.6 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-577.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface: every skill that writes a `- [ ]` PLAN.md row, whether it has an attended confirm gate today, and how it behaves under `--fast` / `--unattended` — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for CORE-494 (marker minted), CORE-570 (starter merge), CORE-573 (spec demote), and any `--unattended` filing precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on the brief's cited paths and concepts (SPEC.md §"Task-line format", SPEC/gates.md §"`--fast` operator override", SPEC/plan-parser.md footguns, docs/EXTERNAL-AGENTS.md step 2, the `/ft-starter-task` surface) — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (the brief's two: persist the candidates line under `--unattended`?; which surfaces lack a confirm gate today? — plus per-child shortname + scope) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-577.2 .. CORE-577.6; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-577 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-494]] — minted the `[unattended]` marker, its deny-by-default semantics, and "flowtron never writes it" (related-decision)
- [[CORE-570]] — folded `/ft-starter-task` into `/ft-file-followup --starter`; collapses the brief's `.6` surface (related-decision)
- [[CORE-573]] — retired `/ft-spec`; confirms the current filing-surface roster (related-decision)

## 🌳 Fan-out

- **Parallel:** [[CORE-577.3]], [[CORE-577.4]], [[CORE-577.5]], [[CORE-577.6]] — disjoint skill directories; each carries a labeled mirror to the `.2` module and touches nothing another child edits
- **Sequential:** [[CORE-577.3]] after [[CORE-577.2]] · [[CORE-577.4]] after [[CORE-577.2]] · [[CORE-577.5]] after [[CORE-577.2]] · [[CORE-577.6]] after [[CORE-577.2]] — the module must exist before any filer Reads it
- **Synthesis:** [[CORE-577.N]] — walks every surface under attended / `--fast` / `--unattended` and confirms identical degrade (proposal only, zero writes)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery` with a fully formed brief after an in-session exchange on why `[unattended]` is scarce by accident (nothing in the filing flow asks). The brief preserves the CORE-494 rule verbatim and scopes the change to *proposing*, so the epic is contract-plus-skills work across ≥6 filing surfaces — genuinely epic-shaped, not a single task.

- [x] Read relevant source files — `SPEC.md` §"Task-line format" (:70-115) and §"Deferred hand-off filing" (:541-552); `SPEC/gates.md` §"`--fast` operator override" (:312-360) and §"`--unattended` operator posture" (:362+); `SPEC/plan-parser.md` §"`[unattended]` mis-authoring footguns" (:42+); `SPEC/tasknote-selection.md` §"Unattended filing authority" (:221); `docs/EXTERNAL-AGENTS.md` steps 2 and 8; every `claude/skills/*/SKILL.md` + fragment that writes a PLAN row (survey below). No probe needed — grep-scoped.

- [x] **Best Practices Review** — N/A for code; for the contract: the shared module is a new lazy `SPEC/` file (unbudgeted tier, one owner, skills Read it at their write step) rather than a paragraph repeated per skill — the "canonical source with labeled mirrors" convention (`docs/CONVENTIONS.md`) applies: each skill carries a one-line labeled mirror at its write step, the rule lives once.

- [x] **Archive skim** — 19 archived notes mention `[unattended]`; read the load-bearing four plus two Related. Findings in Discovery Notes.

- [x] **Drift check** — one drift item (the brief's `.6 /ft-starter-task` surface no longer exists) and one structural miss (`/ft-task` Phase 4 is not a writer). Every other cited path and concept matches HEAD. Details in Discovery Notes.

- [x] Asked clarifying questions — four via AskUserQuestion; answers in the "Resolved scoping" table.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (`.flowtron/PLAN.md` only — pure filing).

**Discovery Notes:**

**Filing-surface inventory** (every skill that writes a `- [ ]` PLAN.md row; `/ft-close-epic`, `/ft-task`, `/ft-micro-task` are *not* writers — see drift below).

| Surface | Where it writes | Attended confirm gate today | Under `--fast` / `--unattended` |
|---|---|---|---|
| `/ft-epic-discovery` | Step 4 (parent + `.1` + `.N`), Step 7 (`.2..M+1`) | AskUserQuestion ×2 (Step 2 inputs, Step 3 ID confirm) + reconcile review prompt in Step 7 | Accepts neither flag (`--unattended` → stop, write nothing) |
| `/ft-file-followup` default, `--starter` | Step 4 / S4 | Step 3 / S3 **prose** review gate ("show the line, edit per feedback, do not skip") | No `--fast`; `--unattended` suppresses the review, Step 5 report is the only record |
| `/ft-file-followup --park` | P4 (stub + line, one motion) | **None by design**; only a one-line priority ask when no flag | Refuses `--unattended` |
| `/ft-audit` §5 | Ticket lines + trivial-fix carve-out | AskUserQuestion write-step confirmation (§5 step 1) | No flags; adopter-forked (`.claude/skills/audit/`) — upstream edits don't propagate |
| `/ft-refactor` Step 5 | Parent + children + `.N` + starter notes per child | AskUserQuestion Step 4 review | Own `--fast` skips Step 4 → no operator act |
| `/ft-audit-repo` §6 | Milestone epics + children | AskUserQuestion after the report | No flags; run by reference from the submodule (no fork) |
| `/ft-audit-context` §5 | Optional ticket filing | AskUserQuestion offer ("File all as PLAN tickets") | No flags |

**Runners discharge, never write.** `SPEC.md` §"Deferred hand-off filing" binds `/ft-task` / `/ft-micro-task` / `/ft-close-epic` closures to file deferred steps *as rows*, but the write goes through `/ft-file-followup` (attended) or `/ft-file-followup --unattended` (`SPEC/tasknote-selection.md` §"Unattended filing authority"). A runner's only own-line write is the Re-scope rewrite, which copies the trailing token run verbatim (`SPEC.md` §"Task-line format") — not a candidacy moment. So the brief's `.3 /ft-task Phase 4` collapses into the `/ft-file-followup` child, and the runner-side deliverable is just the persistence hook (below).

**Archive skim — load-bearing:**
- [[CORE-494]] minted the marker: deny-by-default, "flowtron itself never writes it", position after `[model]`, both footguns test-pinned; deliberately no viz chip ("adopter reader is the consumer"). The epic's non-goals match.
- [[CORE-536]] made `[unattended]` imply `--fast` on an attended run with no flag — the adopter-without-orchestrator value the brief leans on. Confirmed at `SPEC/gates.md:322-329`.
- [[CORE-551]] unattended filing authority: `/ft-file-followup --unattended` commits on the SPEC-imposed duty, not on a review. That is exactly why the posture must stay recommend-only here — there is no act to attach a marker to.
- [[CORE-565.3]] ruled `[handoff]` out of contract (caobunga CBN-137 concurred); caobunga's reader consumes the marker at `selection.py:353-355`. Confirms the brief's `[handoff]` non-goal and that the consumer already exists.
- [[CORE-570]] / [[CORE-573]] set the current writer roster (`/ft-starter-task` → `--starter`; `/ft-spec` gone).

**Drift check:**
- ❌ Brief `.6 /ft-starter-task` — retired by CORE-570; surface is `/ft-file-followup --starter`. Folded into the `--starter` row above.
- ❌ Brief `.3 /ft-task Phase 4 follow-up filing` — not a writer (see above). Slot re-used for the two writers the brief missed: `/ft-audit-repo`, `/ft-audit-context`.
- ✅ `SPEC.md` §"Task-line format", `SPEC/gates.md` §"`--fast` operator override" (implied-`--fast` rule), `SPEC/plan-parser.md` footguns, `docs/EXTERNAL-AGENTS.md` step 2 — all present as cited.
- ✅ No SPEC contradiction: the epic writes the token only on an operator act, so "flowtron never writes it" and the no-autonomy-chain rule hold verbatim.

**Resolved scoping:**

| # | Question | Answer | Consequence |
|---|---|---|---|
| 1 | Shared module home | New lazy `SPEC/unattended-candidacy.md` | Unbudgeted tier; `SPEC.md` §"Task-line format" gets a one-paragraph pointer; each filer Reads it at its write step and carries a labeled mirror line. `gates.md` untouched (35,943/40,000). |
| 2 | `--park` | Skip candidacy entirely | Park stays one-motion; candidacy is decided when the stub is promoted or run. |
| 3 | Persist under `--unattended` | Yes — calling run's Final Summary | When `--unattended` filing discharges a runner closure, the `unattended-candidates:` line also lands in that run's archived Final Summary. Standalone `/ft-file-followup --unattended` has no tasknote — Step 5 report remains its only record. No new file, no Handoff insert. |
| 4 | Child structure | M=5: `.2` SPEC+module · `.3` ft-epic-discovery · `.4` ft-file-followup (all modes; covers runner discharge + persistence hook) · `.5` ft-audit + ft-refactor · `.6` ft-audit-repo + ft-audit-context | Audit family split by write pattern (starter-note writers / adopter-forked vs first-contact + context auditors). |

**Predicate (from the brief, carried into `.2` unchanged — Discovery tightens only):** `[light]`/`[medium]` only · no operator hand-off cue in the description (👁️, 🗄️, "operator", "hand-off", credentials, physical access, cross-repo write) · no `Blocked by` of any form · not a parent `AREA-EPIC-N` row · epic child only if cohort head or its stem predecessor is filed in the same pass with the same candidacy. Note for `.2`: an epic's `.1` Discovery row is `[heavy]` by convention and never a candidate; `.N` audit rows pass the predicate only when tagged `[light]`/`[medium]` — `/ft-close-epic` accepts `--unattended`, so that is coherent.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cohort-children filing pattern per CORE-EPIC-565 / CORE-EPIC-574 (2-space indent, `[model]` glyph on every line, em-dash separator, `.N` last)

- [x] **Minimal refactor gate** — N/A, pure PLAN.md filing

- [x] Implemented the minimal solution — five child lines written under `CORE-EPIC-577`, between `.1` and `.N`

- [x] Updated/added tests for non-trivial behavior — N/A; verified instead by parsing PLAN.md through the canonical `viz/src/parser.ts` (`docs/CONVENTIONS.md` §"Verify behavioral claims against flowtron's own source")

**Implementation Notes:**

- Lines written: 5 (`.2`–`.6`). Word counts (long description): parent 54 · `.2` 55 · `.3` 42 · `.4` 45 · `.5` 43 · `.6` 35 · `.N` 31 — all under the 70w cap; parent and `.2` over the 50w target by 4–5 words, accepted for the CI-step clause the operator asked for.
- M unchanged from filing-time estimate (5). Two slot *substitutions* inside that count: the brief's `.3 /ft-task Phase 4` (not a writer) and `.6 /ft-starter-task` (retired) became `/ft-audit-repo` + `/ft-audit-context` (`.6`) and the runner discharge path folded into `.4`.
- The brief's "test or fixture per surface" acceptance is honoured as a CI `drift` step in `.2` (prose skills have no runner) plus the `.N` per-surface degrade walk.
- Parse check: `parsePlanWithDiagnostics` → 0 unparsed; all eight `577` rows carry the expected `model`, `shortname`, `unattended=false`.
- Downstream-impact scan (rest of active PLAN): `CORE-574.5` ↔ `577.2` share `SPEC.md` (ordering-sensitive, not contradictory — `.2` adds one pointer paragraph, `574.5` trims elsewhere); `CORE-574.2/.3` ↔ `577.2` share `ci.yml` `drift` job (additive). `CORE-EPIC-575`, `CORE-576`: unaffected. No reconcile edits applied.
- Fan-out filled: `.2` sequential head; `.3`–`.6` parallel after it; `.N` synthesis.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown filing); parser check stands in, see Testing Notes

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass: 2-space indent on every child, bold IDs intact, `[model]` glyph on every line, `| shortname` ≤ 30 chars (longest `epic-discovery-candidacy` 24), em-dash separator consistent, no trailing whitespace, Fan-out wikilinks match the filed children

- [x] **Verification receipt** — `node scratchpad/parse-check.mts` (imports `viz/src/parser.ts`, parses `.flowtron/PLAN.md`) → exit 0, `unparsed: 0`; `wc -w` per description → max 55. No code changed.

- [x] (frontend) N/A

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `parsePlanWithDiagnostics(PLAN.md).unparsed.length === 0`; all `577` rows: `CORE-EPIC-577 heavy` · `.1 heavy` · `.2 heavy` · `.3 medium` · `.4 heavy` · `.5 medium` · `.6 light` · `.N heavy`, every `unattended=false` — consistent with the epic's own rule that filing never seeds the marker.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs": no change across the board. Pure Discovery filing; the SPEC pointer, the new lazy module, `docs/EXTERNAL-AGENTS.md`, and every skill body land inside `.2`–`.6`.

- [x] Closed — every Acceptance criterion ticked; YAML `status:` → `completed`; `.1` PLAN.md line flipped to stub form, kept nested under `CORE-EPIC-577` in `## High`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

**Final Summary:**

Filed `CORE-EPIC-577` (`unattended-candidacy`) and closed its Discovery: every filing surface will *propose* `[unattended]` inside its existing confirm gate, and emit `unattended-candidates:` with zero writes under `--fast` / `--unattended` — the CORE-494 rule that flowtron never seeds the marker on its own discretion is preserved verbatim.

- **Changed:** `.flowtron/PLAN.md` (parent + `.1` + `.N` at filing; five children `.2`–`.6` at Phase 2; `.1` flipped at closure) · this tasknote scaffolded and archived. `touches:` reconciliation: declared `.flowtron/PLAN.md`; `git diff --name-only` adds only the tasknote path itself — no undeclared paths.
- **Verification:** canonical parser → 0 unparsed; per-line word counts ≤ 55.
- **Scope decisions:** module home = new lazy `SPEC/unattended-candidacy.md` (unbudgeted; `gates.md` untouched) · `--park` skips candidacy · `--unattended` persists the candidates line into the discharging runner's Final Summary · M=5 with two slot substitutions (runners are not writers; `/ft-starter-task` retired) and two missed writers added (`/ft-audit-repo`, `/ft-audit-context`).
- **Documentation:** no AI-referenced doc changed; all contract edits are inside the children.
- **Maintainability effect:** one rule, one module, five labeled mirrors — the deny-everything queue gets a per-row decision at the point of fullest context, without any surface gaining a new gate or any posture gaining a write.

**Archived:** 2026-09-11
