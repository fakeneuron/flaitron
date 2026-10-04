---
title: subagent-isolation audit
status: completed
tags: []
created: 2026-08-06
due:
related-tasks: [CORE-EPIC-408, CORE-408.1, CORE-408.2, CORE-408.3, CORE-408.4]
---

# CORE-408.N | subagent-isolation audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-408]]

## 🎯 Goal

Verify the completed `CORE-EPIC-408` (`subagent-isolation`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-408.N — audit CORE-EPIC-408` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-408.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-408.N.md`
- [x] Parent-flip prompt surfaced after audit closure — user confirms or declines flipping `CORE-EPIC-408` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-408.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: prompt user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-408]] — parent epic
- [[CORE-408.1]] — epic Discovery; scoped `.2`/`.3`/`.4` and surfaced the four drift findings this audit re-checks
- [[CORE-408.2]] — isolation-contract; probe/delegate redraw + Phase 1 clause + `templates/subagent-probe-template.md`
- [[CORE-408.3]] — portable-handoff; optional `## 🔄 Handoff` documented in `SPEC.md` §"Tasknote body shape"
- [[CORE-408.4]] — wiring-and-doc-sync; CAPABILITIES/PLATFORMS/AGENT-NEUTRALITY/GLOSSARY rows + ledger 12 → 14

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-408` active under `## High`; all four implementation children (`.1`–`.4`) `[x]`; `.N` the only open row. No open-sibling gate fired.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The cohort closed today (all four children `Completed 2026-08-06`) and its entire blast radius is documentation spread across 11 files and three layers (contract / wiring / project ledger). That is precisely the shape the fixed doc-drift sweep exists for. [[CORE-408.1]] also left four named drift findings whose dispositions were split across `.2`/`.3`/`.4` — verifying they all actually landed is work only this audit is positioned to do.

- [x] Read relevant source files — all four archived cohort tasknotes (`.1`–`.4` Final Summaries + Implementation Notes), then every deliverable **at HEAD** rather than as described: `README.md` §"Agent memory" + §"Sessions, loops, and sub-agents", `SPEC.md` §"Tasknote body shape" (incl. `### 🔄 Handoff`) + §"📝 Phase 1: Discovery" (incl. the probe-clause rationale paragraph) + §"Working in the flowtron repo itself", `templates/subagent-probe-template.md`, `templates/tasknote-template.md:43`, `docs/EXTERNAL-AGENTS.md` (full), `claude/CAPABILITIES.md` §"The triggers" + §"Agent-neutrality cross-check", `docs/PLATFORMS.md` Grok + Codex trigger tables, `docs/AGENT-NEUTRALITY.md` ledger, `docs/GLOSSARY.md` (three new entries + header + footer), `.flowtron/tasknote/README.md` §"AI-referenced docs". Then the *non*-cohort surfaces that restate what the cohort changed: `SPEC/procedures/ft-task.md`, `SPEC/procedures/README.md`, `codex/procedures/ft-task.md`, `grok/procedures/ft-task.md`, `claude/skills/ft-task|ft-goal-task|ft-micro-task/SKILL.md`. No probe spawned — the read set was fully enumerated by the cohort's own design-surface tables.

- [x] **Best Practices Review** — `N/A`. Documentation audit; no code module, dependency direction, or abstraction boundary in scope.

- [x] **Archive skim** — self-referential for the cohort itself (the four children *are* the archive entries read above). Beyond the cohort, the load-bearing precedent is [[CORE-395]] via `SPEC/procedures/README.md:49-55`, which records the one prior instance of this exact failure mode: [[CORE-390]]'s skill fold "sat un-mirrored in the `ft-task` SOP until [[CORE-395]] caught it by hand". That is the pattern Finding #1 below repeats. [[CORE-183]]'s lockstep rule (Phase 1 checklist mirrored across `SPEC.md` + template + skills) was re-checked and found **narrower than remembered** — see Drift check.

- [x] **Drift check** — every claim the cohort's four Final Summaries make was re-verified at HEAD rather than accepted. **All counted claims hold:** `docs/GLOSSARY.md` = **63** entries (header says ~63) · `claude/CAPABILITIES.md` §"The triggers" = **9** rows (matches the corrected cross-check text) · `.flowtron/tasknote/README.md` §"AI-referenced docs" = **14** entries. Both template enumerations (`SPEC.md` §"Working in the flowtron repo itself", `.flowtron/tasknote/README.md:11`) list `subagent-probe-template.md`. The SPEC↔template Phase 1 read-bullet pair is clause-identical, diverging only in path resolution as `.2` designed. All four [[CORE-408.1]] drift findings landed: #1 (probe/delegate redraw) in `.2`, #2 (Handoff name collision → reciprocal pointers) in `.3`, #3 (ledger gap, widened to two docs) in `.4`, #4 (CAPABILITIES sub-agent row) in `.4`. **One correction to a cohort assumption:** [[CORE-183]]'s "mirrored in three skills" does **not** apply to this bullet — `ft-task`, `ft-goal-task`, and `ft-micro-task` all route to SPEC §"📝 Phase 1: Discovery" rather than restating the checklist (`grep` for the bullet text returns zero hits in all three), so they inherited the probe clause for free. The mirror that *does* exist, and that the cohort never checked, is the agent-neutral SOP — Finding #1.

- [x] Asked clarifying questions — one surfaced (Finding #1's disposition: inline fix vs. follow-up). Fires the 🛠️ gate per this skill's `default-fire-on-clarifications` flavor.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Deliverable | Files |
|---|---|---|
| `.1` subagent-isolation discovery | Scoped `.2`/`.3`/`.4`; four drift findings; four scoping questions all resolved on the lightest option (no lazy module, no template change, no new skill) | `.flowtron/PLAN.md` (3 child lines) |
| `.2` isolation-contract | Split "sub-agents get exactly one tasknote" into **delegate** / **probe**; widened the Phase 1 read bullet + rationale paragraph; new probe template; `EXTERNAL-AGENTS.md` §"The Core Rule" carve-out | 6 files (5 edited, 1 added) |
| `.3` portable-handoff | Optional `## 🔄 Handoff` documented in §"Tasknote body shape" + `**Optional inserts.**` framing naming `## 🔁 Iterations` too; reciprocal `EXTERNAL-AGENTS.md` pointer; README clause | 3 files |
| `.4` wiring-and-doc-sync | CAPABILITIES trigger row (9th) + per-trigger coverage list; PLATFORMS rows for Grok + Codex; AGENT-NEUTRALITY README row; 3 GLOSSARY entries; ledger 12 → 14 | 5 files |

**Cumulative surface:** 11 distinct files, 1 added, across contract / wiring / project-ledger layers.

### Vocabulary consistency (the cohort's central risk)

The probe is pinned by four negatives — *owns no tasknote · never runs Phase 1 · never trips a gate · never closes or archives anything*. Checked at all six surfaces that define it:

| Surface | Negatives carried | Verdict |
|---|---|---|
| `README.md` §"Sessions, loops, and sub-agents" | 4/4 | canonical |
| `SPEC.md` §Phase 1 rationale paragraph | 4/4 | consistent |
| `templates/subagent-probe-template.md` | 4/4 | consistent |
| `docs/GLOSSARY.md` **probe** | 4/4 | consistent |
| `claude/CAPABILITIES.md` row | 3/4 (drops "closes or archives") | acceptable — table cell, cites README as authority |
| `docs/EXTERNAL-AGENTS.md` §"The Core Rule" | 2/4, phrased as "never enters the 4-phase lifecycle" | acceptable — a *superset* restatement, not a contradiction |

No contradictions. Both condensed copies point at the README as the authority rather than competing with it. **No finding.**

### Cross-reference reciprocity

The Handoff name collision ([[CORE-408.1]] Drift #2) is closed in both directions and verified at HEAD: `SPEC.md:~408` "Not the handoff contract" → `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract"; `docs/EXTERNAL-AGENTS.md:27` → `SPEC.md` §"Tasknote body shape". `docs/GLOSSARY.md` **Handoff (🔄)** names all three neighbours. A reader arriving from any side is told the other meaning exists. **No finding.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the inline fix extends the SOP's own established bullet shape: every other §4 bullet carries its SPEC-level detail in the same bolded-lead-in + em-dash + prose form. The added clause reuses [[CORE-408.2]]'s probe phrasing (three of the four canonical negatives, condensed for a procedure step) so the vocabulary reads identically to the other six surfaces. No new structure, no new box.

- [x] **Minimal refactor gate** — one bullet widened; nothing else touched. The misfiled `sidequest` GLOSSARY entry stays unfixed, preserving [[CORE-408.4]]'s deliberate noted-not-fixed stance (pre-existing, off the edited lines). The SOP's `last-verified:` stamp is deliberately **not** bumped — see Design decisions.

- [x] Implemented the minimal solution — one file, `SPEC/procedures/ft-task.md` §4, +9/-1.

- [x] Updated/added tests for non-trivial behavior — `N/A`. Markdown procedure prose; no executable surface.

**Implementation Notes:**

### Coherence verdict

The cohort is **coherent**. Three separate consistency axes were checked against HEAD and all pass: probe vocabulary across six defining surfaces (see Discovery Notes), Handoff cross-reference reciprocity in both directions, and every numeric claim the four Final Summaries make (GLOSSARY 63, CAPABILITIES 9 trigger rows, AI-referenced-docs ledger 14 — each re-counted, not accepted). All four of [[CORE-408.1]]'s drift findings landed in the children they were routed to. No regressions in earlier-shipped children's surfaces: `.2`'s probe template and README redraw read correctly against `.3`'s Handoff prose and `.4`'s glossary/wiring rows, with no contradictory cross-refs.

### Finding #1 — probe clause absent from the agent-neutral SOP (fixed inline)

`SPEC/procedures/ft-task.md` §"4 — Phase 1: Discovery" restates the Phase 1 checklist bullet-by-bullet with full SPEC-level detail on every item *except* the read step, which read `- **Read** the relevant source files.` — the only bullet in that list reduced to a strict subset of its SPEC source.

Three facts make this more than a wording gap:

1. **The cohort contradicted itself.** [[CORE-408.4]] added isolated-exploration rows to *both* the Grok Build and Codex CLI tables in `docs/PLATFORMS.md`, each describing a second-session probe approximation for Phase 1 Discovery. But `codex/procedures/ft-task.md` and `grok/procedures/ft-task.md` both route to this SOP — verified at HEAD, both say "This file routes; it does not restate the procedure." So the cohort documented the workaround for a clause the target agents' actual procedure never mentioned.
2. **The blast radius is exactly the non-Claude agents.** Claude Code is unaffected: `ft-task`, `ft-goal-task`, and `ft-micro-task` all *route* to `SPEC.md` §"📝 Phase 1: Discovery" rather than restating the checklist (grep for the bullet text returns zero hits in all three SKILL.md files), so they inherited the clause for free. This corrects a cohort-adjacent assumption — [[CORE-183]]'s "mirrored in three skills" lockstep concern does not reach this bullet.
3. **The existing detector structurally cannot catch it** — see Finding #2.

**Fix applied:** the read bullet now carries the probe clause, the template link, three of the four canonical negatives, the "skipping is always correct" judgment framing, and a pointer to `docs/PLATFORMS.md` §"Non-Claude capability triggers" for platforms with no sub-agent primitive. That last clause is the one piece not present in the SPEC source: it exists because this SOP's readers are precisely the agents `.4` wrote those approximation rows for, and nothing previously connected the two.

### Finding #2 — the SOP currency check cannot see SPEC-sourced drift (follow-up candidate)

Per `SPEC/procedures/README.md` §"Frontmatter schema", `/ft-release` Step 5 runs a flag-don't-bump check that "lists `source:` commits since the stamp's **date** that did not also touch the SOP". For `ft-task.md`, `source:` is `claude/skills/ft-task/SKILL.md`.

The probe clause landed in `SPEC.md` and `templates/tasknote-template.md` — **not** in the Claude skill. No `source:` commit occurred, so the check had nothing to flag, and Finding #1 would have survived indefinitely. This is the same failure the doc's own prose says the check exists to prevent ("[[CORE-390]]'s fold sat un-mirrored in the `ft-task` SOP until [[CORE-395]] caught it by hand") — recurring through a hole the [[CORE-395]] fix does not cover, because that fix anchored detection to the Claude skill while the SOP also restates SPEC contracts directly.

Compounding it: `SPEC/procedures/*.md` sits outside the AI-referenced-docs ledger by design (the ledger's closing paragraph excludes `SPEC/*.md` lazy modules from the default cold-start sweep), so no Phase 4 doc-drift sweep guards it either. Two independent safety nets, neither covering this path.

**Not fixed here** — the fix is release-tooling design (widen the check's watch set to the SPEC sections a SOP restates, or add a second anchor field), which is a scoped task of its own, not an audit inline edit.

→ **`/ft-file-followup` candidate:** SOP currency check misses SPEC-sourced drift — `/ft-release` Step 5 watches only `source:` commits, so a `SPEC.md` change that a procedure SOP restates is invisible to it (surfaced by [[CORE-408.N]] Finding #2).

### Design decisions

- **`last-verified:` stamp deliberately not bumped.** It still reads `v5.14.1 · 2026-08-02`. Per `SPEC/procedures/README.md`, the stamp "records a SOP↔source sync event" and is "bumped when the SOP is re-checked against `source:`". This audit re-checked the SOP against the **SPEC contract**, not against `claude/skills/ft-task/SKILL.md`. Bumping it would assert a verification that did not happen — and would paper over exactly the semantic gap Finding #2 is about.
- **Three negatives in the SOP clause, not four.** "Never closes or archives anything" is dropped as redundant inside a procedure whose closure steps the same agent is reading. Matches the condensation `claude/CAPABILITIES.md` already makes; the authority link is present either way.
- **`sidequest` glossary misfiling left alone.** [[CORE-408.4]] surfaced and deliberately declined it as pre-existing and off its edited lines. This audit touches no glossary line, so the same reasoning holds with more force. Noted, not filed — it is a one-line alphabetization nit, below the filing threshold.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → **18 files / 245 tests passed** (4.37s). Not a targeted surface (no `PLAN.md` grammar or frontmatter change); run as the registered release-gate sanity check.

- [x] Ran lint/type-check on changed code — `N/A`. Markdown only; no linted or typed surface changed. Structural checks substituted below.

- [x] **Quality assertions** — no duplication introduced: the added clause is the SOP's *first* copy of the probe prompt, and it links to the template rather than restating the return shape. No dead prose — the bullet sits in a checklist the SOP's §4 opening tells the agent to work. Public-surface growth is zero files, flags, keys, or gates. No stale code-facing docs: the clause names no skill, API, or line number, and both link targets were verified to exist.

- [x] (frontend) Asked the user for visual confirmation — `N/A`. No frontend surface.

**Testing Notes:**

| Check | Command / method | Result |
|---|---|---|
| Viz suite (release gate) | `npm --prefix viz test` | 18 files / 245 tests passed (4.37s) |
| Changed-file set | `git diff --stat` | exactly 1 file: `SPEC/procedures/ft-task.md` +9/-1; zero files added |
| Trailing whitespace | `grep -n " $"` on the changed file | none |
| New link targets resolve | `templates/subagent-probe-template.md`, `docs/PLATFORMS.md` via the `../../` forms from `SPEC/procedures/` | both resolve |
| Bullet renders in list | `sed -n '145,154p'` — continuation lines 2-space indented, next `- **Best Practices Review**` bullet intact | clean |
| GLOSSARY entry count | `grep -c "^\*\*" docs/GLOSSARY.md` | **63** — matches the header's "~63 entries" |
| CAPABILITIES trigger rows | row count over §"The triggers" | **9** — matches the corrected cross-check text |
| AI-referenced-docs entries | count over §"AI-referenced docs" | **14** — matches [[CORE-408.4]]'s claim |
| SPEC ↔ template read-bullet sync | `grep -n "Read relevant source files" SPEC.md templates/tasknote-template.md` | clause identical; path resolution differs by design ([[CORE-408.2]]) |
| Claude skills inherit vs. restate | `grep "Read relevant\|probe"` over `ft-task` / `ft-goal-task` / `ft-micro-task` SKILL.md | zero hits in all three — they route to SPEC, confirming Finding #1's blast radius is non-Claude only |
| Platform pointer routing | `codex/procedures/ft-task.md`, `grok/procedures/ft-task.md` | both route to `SPEC/procedures/ft-task.md`; neither restates |
| Wikilink integrity | every `[[ID]]` in this tasknote checked against `archive/core/` + `PLAN.md` | 7/7 archived notes exist (`.1`–`.4`, `CORE-395`, `CORE-390`, `CORE-183`); `[[CORE-EPIC-408]]` live in PLAN.md |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line)** — all **14** AI-referenced-docs entries walked; **0 updated, 14 no change**. Every cohort deliverable was read at HEAD during Discovery rather than trusted from its child's Final Summary:
  - `README.md` — no change. §"Sessions, loops, and sub-agents" carries the five safe-pattern bullets with the delegate/probe pair intact and the intro narrowed to "*unbounded* sub-agent"; §"Agent memory" carries the optional-Handoff clause. Both verified current; this audit edited no README text.
  - `SPEC.md` — no change. §"📝 Phase 1: Discovery" read bullet + probe rationale paragraph and §"Tasknote body shape" `**Optional inserts.**` + `### 🔄 Handoff (optional)` all verified current. `SPEC.md` is the *source* of the clause the SOP now mirrors, so the audit's fix required no edit here.
  - `docs/MIGRATION.md` — no change. Nothing copied and no skill symlinked; the edited SOP is read by reference from the read-only submodule, so no adoption or bump step changes.
  - `claude/AGENTS-snippet.md` — no change. Names templates adopters must *copy* plus one-time symlink wiring; this audit added neither.
  - `codex/AGENTS-snippet.md` — no change, checked deliberately. The audit's fix benefits Codex agents directly, but it landed *inside* the SOP that `codex/procedures/ft-task.md` already routes to (verified at HEAD). No new wiring step, so the install commands are untouched.
  - `docs/CONVENTIONS.md` — no change. No commit, versioning, or formatting convention touched.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change, checked deliberately. The added clause tells a contract-only agent it *may* spawn a read-only probe — the same read-only-by-brief posture [[CORE-408.2]] and [[CORE-408.4]] already assessed against §"Prompt injection via user-authored markdown". A probe reads files the parent would have read anyway; no new tool-allowlist surface, no new trust boundary, and the clause names no spawn primitive.
  - `docs/AGENT-NEUTRALITY.md` — no change, checked deliberately. The added SOP text is agent-neutral throughout ("a **probe**", "if your platform exposes no sub-agent primitive") and names no Claude primitive, so it earns no ledger row. It in fact *reduces* Claude-specificity: the clause Claude Code already inherited from `SPEC.md` is now reachable by contract-only agents too. [[CORE-408.4]]'s `README.md` delegation-guidance row verified present and its "not claimed" caveat still accurate.
  - `docs/PLATFORMS.md` — no change. The Grok Build and Codex CLI isolated-exploration rows verified present, correctly shaped (4 columns), and honest about the absent primitive. They are now *reachable from the procedure those agents actually load*, which is what Finding #1's fix restored — the rows themselves needed no edit.
  - `claude/CAPABILITIES.md` — no change. Sub-agent row present and 9-row count re-verified against the corrected cross-check text. `Last verified: v5.15.0 · 2026-08-02` still current; nothing newly dogfooded here.
  - `docs/AGENT-COMPAT.md` — no change, checked deliberately. Its §"Scope of this matrix" excludes per-agent capability triggers by design; the audit added trigger-adjacent prose to a procedure SOP, not a matrix row.
  - `docs/EXTERNAL-AGENTS.md` — no change. Both cohort edits verified current and mutually consistent: the §"The Core Rule" probe carve-out (`.2`, line 15) and the §"The Handoff Contract" reciprocal pointer (`.3`, line 27) sit in different sections and do not interfere.
  - `docs/WORKTREES.md` — no change. Cited by the cohort as the execution-isolation layer, edited by neither the cohort nor this audit; newly ledgered by [[CORE-408.4]] and current.
  - **Surface edited but outside this ledger by design:** `SPEC/procedures/ft-task.md`. The ledger's closing paragraph excludes `SPEC/*.md` lazy modules from the default cold-start sweep — which is the second half of why Finding #1 went unnoticed, and is recorded in Finding #2 rather than fixed by widening the ledger here.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept 2-space nested beneath the parent per SPEC/epic.md §"Child placement invariant" until the parent-flip decision, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary; surfaced at the 📦 gate.

**Final Summary:**

Audited the closed `CORE-EPIC-408` (`subagent-isolation`) cohort — 11 files across contract, wiring, and project-ledger layers — and found it **coherent with one real gap**, fixed inline. The epic's vocabulary holds up: "probe" is pinned by the same four negatives at all six surfaces that define it, the two condensed copies (`claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md`) defer to the README as authority rather than competing with it, and the `## 🔄 Handoff` name collision is closed reciprocally in both directions. Every numeric claim the four children made was re-counted rather than accepted, and all three hold: GLOSSARY 63 entries, CAPABILITIES 9 trigger rows, AI-referenced-docs ledger 14.

**The finding: the cohort taught two agents a workaround for a clause their own procedure never mentioned.** `SPEC/procedures/ft-task.md` §4 restates the Phase 1 checklist bullet-by-bullet with full detail on every item — except the read step, which stood at four words. So while [[CORE-408.4]] was adding isolated-exploration rows to *both* the Grok Build and Codex CLI tables in `docs/PLATFORMS.md`, the SOP those two platforms' pointers actually route to said nothing about a probe. Claude Code was unaffected, because `ft-task` / `ft-goal-task` / `ft-micro-task` all route to `SPEC.md` §Phase 1 rather than restating it (zero grep hits in all three) — which also corrects a cohort-adjacent assumption: [[CORE-183]]'s "mirrored in three skills" lockstep rule never reached this bullet. The blast radius was exactly the contract-only agents. Fixed inline: the SOP read bullet now carries the clause, the template link, the judgment framing, and — the one piece not in the SPEC source — a pointer to `docs/PLATFORMS.md` §"Non-Claude capability triggers", because this SOP's readers *are* the agents those approximation rows were written for.

**Why no safety net caught it, and why that half is a follow-up.** `/ft-release`'s flag-don't-bump check watches commits touching the SOP's `source:` (`claude/skills/ft-task/SKILL.md`). The probe clause landed in `SPEC.md` and `templates/tasknote-template.md` — no `source:` commit, nothing to flag. And `SPEC/procedures/*.md` sits outside the AI-referenced-docs ledger by design, so no Phase 4 sweep guards it either. Two independent detectors, neither covering the path. This is the [[CORE-395]] failure mode recurring through a hole the [[CORE-395]] fix does not cover, because that fix anchored detection to the Claude skill while the SOP also restates SPEC contracts directly. Filed as a `/ft-file-followup` candidate rather than fixed here — widening the check's watch set is release-tooling design, not an audit edit.

**Restraint exercised.** The SOP's `last-verified:` stamp was deliberately **not** bumped: it records a SOP↔`source:` sync event, and this audit verified the SOP against the *SPEC contract* instead. Bumping it would have asserted a check that never ran, and papered over the exact semantic gap Finding #2 names. The misfiled `sidequest` GLOSSARY entry stays unfixed, preserving [[CORE-408.4]]'s deliberate stance.

**Verification.** `npm --prefix viz test` 18 files / 245 tests passed; exactly 1 file changed (+9/-1), zero added; zero trailing whitespace; both new link targets resolve via the `../../` forms; bullet renders cleanly in-list with the following bullet intact; 7/7 wikilinked archives exist. Doc-drift sweep: **0 updated, 14 no change**, with `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md`, and `codex/AGENTS-snippet.md` all checked deliberately rather than by default.

**Maintainability effect.** One bullet, +9/-1 — but it closes the epic's only cross-layer inconsistency and makes flowtron's newest contract addition actually reachable by the agents its own platform docs address. The cohort ships complete: probe/delegate vocabulary reachable from contract, lookup, syntax, *and* procedure surfaces.

**Archived:** 2026-08-06
