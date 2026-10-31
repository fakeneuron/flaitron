---
title: unattended-readiness audit
status: completed
tags: []
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-850.1, CORE-850.2, CORE-850.3, CORE-850.4, CORE-850.5, CORE-850.6]
touches:
  - SPEC.md
  - SPEC/unattended-candidacy.md
  - SPEC/starter.md
  - templates/tasknote-starter-template.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-task/SKILL.md
  - SPEC/procedures/ft-task.md
  - docs/AGENT-NEUTRALITY.md
  - docs/GLOSSARY.md
  - .flaitron/PLAN.md
---

# CORE-850.N | unattended-readiness audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-850]]

## 🎯 Goal

Verify the completed `CORE-EPIC-850` (`unattended-readiness`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. — 18 entries walked; `SPEC.md` and `docs/AGENT-NEUTRALITY.md` updated, 16 no change (Phase 4)
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — Implementation Notes
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — none; `.5`'s pass-7 fixes re-read (one ambiguous pointer fixed); drift checks green
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-850` (Step 5), landing in the audit's closure commit — eight inline fixes; no miss large enough to file, so no child rows
- [x] Single `feat: CORE-850.N — audit CORE-EPIC-850` (or `chore: ...` if no code edits land) commit lands — `feat:` (contract edits landed); the closure commit
- [x] PLAN.md line for `CORE-850.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-850.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-850.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-850.1]] — discovery (scoped the cohort)
- [[CORE-850.2]] · [[CORE-850.3]] · [[CORE-850.4]] · [[CORE-850.5]] · [[CORE-850.6]] — implementation children audited here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-850` active under `## High`; `.1`–`.6` all `[x]` (closed 2026-10-31); `.N` is the reserved terminal audit child, `[heavy]` (session: Opus, heavy band — match)

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-850.N`; pre-flight passed (clean tree, no prior audit note, parent active). Full cohort: all six children closed the same day (`a039e627` → `f9f68558`), no early-audit decision. `.5` explicitly left one item for this audit (§"Refused carve-outs" title) and closed with pass-7 fixes unreviewed.

- [x] Read relevant source files — the six archived cohort notes in full; `SPEC/unattended-candidacy.md` in full; the cohort diff `e844093b..HEAD` (27 files, +759/−170) for every other touched surface; the seeder fragment header; `SPEC.md` §"Scope reconciliation" / §"Tasknote frontmatter" / §"🧪 Phase 3"; `docs/GLOSSARY.md` entries the epic's concepts touch; `docs/AGENT-NEUTRALITY.md` rows for the cohort-touched modules; Caobunga `.flaitron/PLAN.md` (CBN-448)

- [x] **Best Practices Review** — `N/A`: verification pass over markdown contract; no code or module-boundary change

- [x] **Archive skim** — self-referential (cohort notes are the archive entries; `archive/core/` per README table). Non-cohort context came through the cohort notes' own skims (CORE-822, CORE-843, CORE-738, CORE-812.N, CORE-736); no further read needed

- [x] **Drift check** — every path the cohort cites exists at HEAD; `bash tools/drift-checks.sh` → 0 at HEAD before any edit; CBN-448 present and committed in Caobunga (`f089051`). Drift found is the audit's findings, below

- [x] No clarifications needed. Assumptions: small staleness in cohort-touched surfaces or AI-referenced docs is fixed inline (skill Step 5); §"Refused carve-outs" title is this audit's call (`.5` deferred it here) and is recorded with reasons rather than asked; budget headroom and the release-time `docs/CONTEXT-BUDGET.md` re-measure are heads-ups, not misses

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (the inline-fix set)

**Discovery Notes:**

Cohort inventory (one line per child):

- **`.1` discovery** (`a039e627`) — deep pre-pass: 11-principle constitution, per-child specification, 11-row clarifications table; filed `.2`–`.6` + Fan-out.
- **`.2` readiness-basis** (`f492d4fd`) — `SPEC/unattended-candidacy.md` §"Readiness basis" (a)–(d); clause 1 `[heavy]` arm; starter template `### Acceptance that decides it`; `--starter` S3 basis mirror; promotion seeds Acceptance verbatim.
- **`.3` predicate-clauses** (`ba15d09d`) — clause 1 roster-tier read + **Never admitted**; clause 3 skips own bold ID and backticked spans, admits rendered surface on a basis; new §"Never autonomous" (13 items); pointer sentences in `model.md`, segments blurb, EXTERNAL-AGENTS step 2.
- **`.4` seeder-scope-question** (`6018b847`) — `scope` + `question` dispositions (caps 5+5 offered / 10+10 attempted); new lazy fragment `ft-seed-unattended/scope-and-question.md`; on-disk starter basis read; nine review passes.
- **`.5` runner-scope-guardrails** (`331ded8e`) — `out-of-scope` park (paths vs `touches:`, 400-line cap), `decided by` 👁️ exception, question-ending park prose, GATE-DISCIPLINE fourth form admitted; hooks in SKILL / micro / loop / step-3a / procedure; seven review passes, pass-7 fixes unreviewed.
- **`.6` caller-contract** (`f9f68558`) — EXTERNAL-AGENTS steps 10 (worktree per dispatch) and 11 (runner cap), three stable-surface rows; WORKTREES operator-less exception; `model.md` cap sentence; Caobunga CBN-448 filed.

Coherence leads carried into Phase 2: `.5` pass-7 unreviewed fixes; `.5`'s §"Refused carve-outs" title deferral; `SPEC.md` §"Scope reconciliation" vs the new `out-of-scope` check; glossary entries `touches` / `worktree`; AGENT-NEUTRALITY `gate-postures.md` path-fact site count; `.2` surfaces written before `.3` added heavy-tier names.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` for new shape: audit verification pass. Inline fixes extend existing shapes: a pointer sentence citing the owner section (`SPEC.md`), a site-count row update registered by its auditing task (CORE-848's precedent for the same row), one-phrase currency edits

- [x] **Minimal refactor gate** — no refactor; every edit is a phrase or sentence whose claim the cohort made stale

- [x] Implemented the minimal solution — eight inline fixes (below); no misses large enough to file as child rows

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract edits; Pair Q resolves the two new citations

**Implementation Notes:**

**Cohort coherence — no contradictions across the six children.** Terms are consistent across the 27 touched files: `readiness basis` (a)–(d), `heavy-tier name`, `out-of-scope`, `decided by <command> — basis confirmed <starter created: date>`, `Never autonomous`, caps 5+5 / 10+10. Each surface cites the owner section rather than restating it. `.2`'s deferred notes landed: the seeder reads an on-disk basis (`.4`), the runner reads the basis at promotion (`.5`), and `.3`'s pointer surfaces were re-resolved. `.1`'s two drifts are recorded deviations, not regressions: `sol` reads moderate per the roster (`.3`), and the attended `decided by` line was dropped (`.5`). Stale-wording greps came back clean: pin/split-only seeder phrasing, "concrete token fails clause 1", `[heavy]`-never-candidate, `sol` heavy, light/moderate-only claims.

**`.5` pass-7 unreviewed fixes, reviewed here:** 👁️ settled after the External review in any mode (`unattended-mode.md` conversion text; matches loop Step 6 and the SKILL/micro hooks) — OK. Promoted-stub deletion in the gate-postures path exemption — OK, matches the fragment. Basename lockfile matching — OK. Verbatim (d) logging in step-3a — OK. `blocked.md` row names the logged scope — OK. Procedure "Still inline prose, **not** a banner." restored (34,199 / 34,200) — OK. The candidacy pointer "in the same module's §"Scope guardrails"" was ambiguous inside the candidacy module, which has no such section → fix 2.

**Inline fixes (8; wording as first drafted — revisions after each review pass below):**

1. `SPEC.md` §"Scope reconciliation" — the paragraph said `touches:` is "a recorded fact, not a check… nothing refuses". Since `.5`, an operator-less run parks `out-of-scope` on that same scope. Added one sentence naming the exception and citing `SPEC/gate-postures.md` §"Scope guardrails". The phrasing avoids the literal flag, so the AGENT-NEUTRALITY `--fast` site count for `SPEC.md` is unchanged. Size 43,748 → 44,037 / 49,000.
2. `SPEC/unattended-candidacy.md` clause 3 — "in the same module's §"Scope guardrails"" → explicit `SPEC/gate-postures.md` §"Scope guardrails" link (Pair Q now checks it).
3. `SPEC/unattended-candidacy.md` §"Readiness basis" — "sections the starter template already ships plus one new one" (time-relative) → "sections the starter template ships, `### Acceptance that decides it` among them".
4. `SPEC/unattended-candidacy.md` §"Surfaces and mirrors" table — the `/ft-file-task --starter` owner cell gains `[[CORE-850.2]]` (basis mirror). This matches the seeder row, which already lists `[[CORE-850.4]]`.
5. `SPEC/starter.md` + `templates/tasknote-starter-template.md` comment — `.2` wrote "a `[heavy]` or rendered-surface row" before `.3` added heavy-tier names to clause 1. Both now read "a `[heavy]`, heavy-tier-name, or rendered-surface row", matching the module.
6. `claude/skills/ft-task/unattended-mode.md:15` — "see the last row of the map below" pointed at the 👁️ row, which is 6th of 8. It was already stale before the cohort, since the `dependency` row followed it, and `.5`'s appended `out-of-scope` row made it worse. Now "see the 👁️ `CONFIRM` row".
7. `docs/AGENT-NEUTRALITY.md` `SPEC/gate-postures.md` path-fact row — `.5`'s compressed §"Pre-scaffold stops" added a third `claude/skills/ft-task/unattended-mode.md` site ("Markers and steps:"). The row now reads 2 → 3 sites, registered here (as CORE-848 registered CORE-843's site).
8. `docs/GLOSSARY.md` (outside the sweep set; "maintained via epic children and audits"): the `touches` entry said "never a gate", which `--unattended` no longer honours (now names the `out-of-scope` exception). The `worktree` entry was parallelism-only and now names worktree-per-dispatch (EXTERNAL-AGENTS step 10).

**Decided, no change (with reasons):**

- **GATE-DISCIPLINE §"Refused carve-outs" keeps its title** (`.5` deferred this to the audit). The section is the ledger of one argument raised four times. Three forms were refused, and the fourth was admitted only in a narrowed shape recorded beside them. The intro already says "four forms… the fourth was admitted in a narrowed form". A rename would churn four external citers (`gate-postures.md`, `gates.md`, `unattended-mode.md`, and the AGENT-NEUTRALITY `--fast` site ledger) plus four in-file pointers. It would gain only a heading that names a minority case.
- **Budgets at the edge** (`SPEC/procedures/ft-task.md` 34,199 / 34,200; `SPEC/gate-postures.md` 21,991 / 22,000). This is a heads-up, not a defect. The standing extract-don't-raise remedy applies at the next edit, as `.5`'s Learnings say. No row.
- **`docs/CONTEXT-BUDGET.md` seeder figure** — re-measured at the next `/ft-release`, by ledger convention (`.4` deferral).
- **Archived cohort nav chips** — `.2`/`.3`/`.6` say `✅ Completed` and `.1`/`.4`/`.5` say `🟢 In progress`. The chip is render-derived since CORE-042.4, and archived notes are historical records, so no edit.
- **Model names in the contract layer** (candidacy clause 1; EXTERNAL-AGENTS step 11) are multi-vendor roster examples read from `docs/PLATFORMS.md`, not Claude Code surfaces. The `SPEC/model.md` example-names row is the precedent, so the AGENT-NEUTRALITY ledger needs no new row.
- **EXTERNAL-AGENTS step 4** says "left the note's `touches:` scope". The full rule (a logged starter scope wins) lives in the cited owner section, and callers branch on the code only.
- **CAPABILITIES `--starter` row** does not name the basis display. It is a summary row, and nothing in it is false.
- **New glossary entries** (readiness basis, Never autonomous) are not added: the glossary is a survivor slice, not exhaustive, and every citing surface links the module section.

**Misses filed as child rows:** none.

**Revised after review pass 1:** the `SPEC.md` sentence was narrowed to the run that takes the check, and now names the logged starter scope, the size cap, and every Phase 3 entry. The glossary `touches` entry keeps "never a gate" (`.5` calls `out-of-scope` a check rather than a gate) and adds the check beside it. The `worktree` entry states the single-checkout alternative step 10 allows. The owner cell annotates `[[CORE-850.2]]` as the `--starter` basis. The overflowed lines in `SPEC.md`, `SPEC/starter.md`, and the template are rewrapped.

**Revised after review pass 2:** the pass-1 wording "(not an epic audit)" was wrong. `/ft-task <ID>.N --unattended` takes the checks, and only `/ft-close-epic` is exempt, so the sentence now names `/ft-task` and `/ft-close-epic`. It also names the loop cycle's verify and the post-sweep re-check. `SPEC.md` §"Tasknote frontmatter"'s `touches:` paragraph now says §"Scope reconciliation" names the one run that checks it, so the procedure/SKILL pointers ("why it is never a gate") land on the exception. The glossary `touches` entry says "a check, not a gate" outright. The `worktree` entry opens "for one task run" with both uses named. The two candidacy-module lines these fixes overflowed are rewrapped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0 (pass 21, fail 0)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown only; no viz code)

- [x] **Verification receipt** — below; no duplication: each fix points at its owner section rather than restating it

- [x] **External review** — three `/code-review medium` passes over this audit's working-tree diff; blockers 2 → 1 → 0, each fixed with Phase 3 re-run; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after the pass-3 note fixes):

```text
bash tools/drift-checks.sh                → 0  (19 checks ok; pair_q resolves the two new §"Scope guardrails" citations)
node --test tools/drift-checks.test.mjs   → 0  (pass 21, fail 0)
wc -c SPEC.md                             → 44,221 / 49,000
wc -c SPEC/procedures/ft-task.md          → 34,197 / 34,200 (pointer reworded 2 bytes shorter)
wc -c claude/skills/ft-task/SKILL.md      → 27,158 / 33,000
```

External review (`/code-review medium`, working-tree diff only):

- **Pass 1 — 2 blockers, 7 notes.**
  - Blocker, fixed: the `SPEC.md` exception said every operator-less run takes the check, but `/ft-close-epic` does not.
  - Blocker, fixed: the `SPEC.md` exception said "before Phase 3", which is imprecise on timing and scope (the logged starter scope, the cap).
  - Notes, fixed: the glossary `touches` entry omitted the cap; the `worktree` entry overstated step 10 (single checkout allowed); the owner cell was ambiguous across default and `--starter`; and the fixes left lines overflowed.
  - Notes, no change: `SPEC/gates.md:129` ("never fires 🛠️ or holds Phase 2") is still true, since the check runs at Phase 3 entry, never at 🛠️ or in Phase 2, and the line cites §"Scope reconciliation". The "last row" grep found no other mirror.
- **Pass 2 — 1 blocker, 6 notes.**
  - Blocker, fixed: "(not an epic audit)" was wrong. `/ft-task <ID>.N --unattended` takes the checks; only `/ft-close-epic` is exempt.
  - Notes, fixed: loop-cycle and post-sweep timing; the §"Tasknote frontmatter" pointer now lands on the exception; the glossary says "a check, not a gate"; the `worktree` entry opens "one task run"; two overflowed candidacy lines rewrapped; fix list renumbered to eight.
  - Note, no change: `touches:` lists `.flaitron/PLAN.md` ahead of the closure flip that edits it.
- **Pass 3 — 0 blockers, 6 notes.** Fixes to notes do not reopen a phase.
  - Fixed, third raise: the SKILL.md:105 / procedure:331 pointers said "why it is never a gate". That is still true in the vocabulary, since `out-of-scope` is a check, but it misleads a Phase 1 author about a binding list. They now read "why only an `--unattended` run holds the diff to it" (SKILL) and "the one run it binds" (procedure, byte-neutral).
  - Fixed: the glossary `touches` entry names workflow paths and lockfiles as exempt; the `worktree` entry says "copy of the tasknote when one exists"; `SPEC.md` names re-entry.
  - No change: `SPEC.md`'s bold lead "recorded fact, not a check" is followed directly by "One exception:", a rule with its stated exception, not a contradiction.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — cumulative over the cohort (`e844093b..HEAD` plus this audit). **Updated:** `SPEC.md` (§"Scope reconciliation" names the operator-less `/ft-task` check; the §"Tasknote frontmatter" `touches:` paragraph points at it) and `docs/AGENT-NEUTRALITY.md` (the `SPEC/gate-postures.md` path-fact row goes 2 → 3 sites, `.5`'s pre-scaffold pointer). **No change:**
  - `README.md` — the `--unattended` bullet stays high-level and true.
  - `AGENTS.md` — roster, flags, and layout unchanged; no new skill.
  - `docs/MIGRATION.md` — names the template path and the seeder slug only.
  - `claude/AGENTS-snippet.md` — `.4`'s seeder line is current.
  - `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — wiring only.
  - `docs/CONVENTIONS.md`, `CONTRIBUTING.md`.
  - `SECURITY.md` — the `--unattended` pause line holds; §"Never autonomous" narrows, not widens, the threat surface.
  - `docs/PLATFORMS.md` — `.4`'s fragment inventory is current; bands cited, not changed.
  - `claude/CAPABILITIES.md` — `.5`'s row is current; "six gates" still true, since `out-of-scope` is a check; the last-verified stamp moves at release.
  - `docs/AGENT-COMPAT.md`.
  - `docs/EXTERNAL-AGENTS.md` — steps 2, 4, 10, and 11 plus the three rows are current. No stable-surface row moved in this audit, so no caller-side row.
  - `docs/WORKTREES.md` — `.6`'s exception is current.
  - `docs/VISION.md` — no runtime, validator, or cue added.

  Outside the set, also fixed: `docs/GLOSSARY.md` (`touches`, `worktree`).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.N` line → `Completed 2026-10-31.` stub nested under CORE-EPIC-850 (then the parent flip moves the cohort, post-closure pre-step), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A` for the always-loaded layer. A note for this repo: per-child doc-drift sweeps read each AI-referenced doc for what *that* child said about it. The miss this audit caught was a doc paragraph whose claim (`touches:` "nothing refuses") was falsified by a mechanism in another file. Reading the sweep docs for claims about the cohort's *concepts* (here `touches:`), not only its file names, is what found it.

**Final Summary:**

**What the audit found.** The `CORE-EPIC-850` cohort sits coherently: across the six children's 27 touched files the terms, citations, and deferrals line up, and nothing contradicts across children. The audit made eight small inline fixes and filed no child rows. The one substantive miss was in the always-loaded layer. `SPEC.md` §"Scope reconciliation" still said `touches:` was "a recorded fact, not a check… nothing refuses", which `.5`'s `out-of-scope` park made untrue for an operator-less `/ft-task` run. The glossary repeated the same claim, and its `worktree` entry predated `.6`'s worktree-per-dispatch.

**Fixes.**
- `SPEC.md`: the scope-reconciliation exception, plus the frontmatter pointer.
- `SPEC/unattended-candidacy.md`: an explicit §"Scope guardrails" link, de-time-relative wording, and the owner cell.
- `SPEC/starter.md` + the starter template: heavy-tier names.
- `unattended-mode.md:15`: the 👁️ row pointer.
- `docs/AGENT-NEUTRALITY.md`: the site count.
- `docs/GLOSSARY.md`: the two entries.
- `ft-task/SKILL.md` + `SPEC/procedures/ft-task.md`: the `touches:` pointer wording.

**Decided, no change:**
- §"Refused carve-outs" keeps its title (deferred here by `.5`).
- Budgets at the edge are a heads-up.
- The `docs/CONTEXT-BUDGET.md` seeder figure is re-measured at release.

**Review.** `.5`'s seven unreviewed pass-7 fixes were re-read here. Six hold, and one (the candidacy pointer) was fixed.

**Verification.**
- `bash tools/drift-checks.sh` → 0.
- `node --test tools/drift-checks.test.mjs` → 0 (21/21).
- Budgets: `SPEC.md` 44,221 / 49,000; procedure 34,197 / 34,200; SKILL 27,158 / 33,000.
- Three `/code-review medium` passes (blockers 2 → 1 → 0). Each blocker was the audit's own new `SPEC.md` sentence over- or mis-stating the check, and each was fixed with Phase 3 re-run.

**`touches:` reconciliation.** The diff names 9 contract files, all declared, plus `.flaitron/PLAN.md` (`.N` stub + parent flip) and this note. `SKILL.md` and the procedure were added mid-run (pass-3 note).

**Maintainability.** Every fix points at its owner section, so nothing new is restated.

**Epic.** This closure leaves every child `[x]`, so the parent flip moves `CORE-EPIC-850` and its cohort to `## Completed` in this commit.

**Archived:** 2026-10-31
