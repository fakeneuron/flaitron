---
title: portable-handoff
status: completed
tags: []
created: 2026-08-06
due:
related-tasks: [CORE-EPIC-408, CORE-408.1, CORE-408.2, CORE-328.2, CORE-330.2]
---

# CORE-408.3 | portable-handoff

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-408]]

## 🎯 Goal

Document an optional `## 🔄 Handoff` tasknote section in `SPEC.md` §"Tasknote body shape" — a fixed-shape, mid-task state capture (Goal + Acceptance status, key decisions, open questions, relevant paths, next step) that any session may write so a later session, tool, or agent can resume cold — leaving `templates/tasknote-template.md` unchanged and cross-referencing `docs/EXTERNAL-AGENTS.md` rather than restating its same-named whole-tasknote-transfer contract.

## ✅ Acceptance

- [x] `SPEC.md` §"Tasknote body shape" documents `## 🔄 Handoff` as an **optional insert** placed in the top block after `## 🔗 Related` (above the `---` divider), with the fixed shape from the PLAN line — Goal + Acceptance status, key decisions, open questions, relevant paths, next step
- [x] The same section states **when to write one** (a session ending mid-task with no blocker) and **what it is not** — distinguished in one pass from `status: blocked` (`SPEC/blocked.md`), the sidequest stub's `## Resume anchor`, and `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract"
- [x] The layout block gains an **optional-inserts** framing naming both `## 🔄 Handoff` (documented here) and `## 🔁 Iterations` (loop tasks only; cross-referenced to `SPEC/loop.md`, not restated) — closing the pre-existing asymmetry (Drift #1)
- [x] `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract" carries a **reciprocal one-sentence** disambiguation pointing at the tasknote section, so neither doc's reader meets the word cold
- [x] `README.md` §"Agent memory" `tasknote/<ID>.md` bullet gains one clause naming the optional section
- [x] `templates/tasknote-template.md` is **unchanged** ([[CORE-408.1]] Q3) — verified by diff, not assertion (`git diff --name-only | grep -c templates/` → 0)
- [x] No machinery added: no frontmatter key, no checklist box, no gate, no banner, no skill, no symlink fan-out ([[CORE-408.1]] Q4; [[CORE-328.1]] won't-file; `docs/VISION.md` §"What we won't accept")
- [x] Phase 4 doc-drift sweep across all 12 AI-referenced-docs entries

## 🧩 Subtasks

- [x] Draft the `SPEC.md` §"Tasknote body shape" edit: layout-block line + optional-inserts framing + the `## 🔄 Handoff` shape / when-to-write / what-it-is-not prose, with the `docs/EXTERNAL-AGENTS.md` cross-reference
- [x] Apply the `SPEC.md` edit
- [x] Add the reciprocal one-sentence disambiguation to `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract"
- [x] Add the one clause to `README.md` §"Agent memory" `tasknote/<ID>.md` bullet
- [x] Verify `templates/tasknote-template.md` untouched (`git status` / `git diff --stat`)
- [x] Phase 3: markdown mental-pass + wikilink-integrity + trailing-whitespace checks on every edited file; `npm --prefix viz test` release-gate sanity
- [x] Phase 4: doc-drift sweep + flip `.3` PLAN line to stub form (nested under the active parent) + archive tasknote

## 🔗 Related

- [[CORE-EPIC-408]] — parent epic
- [[CORE-408.1]] — Discovery; Q3 resolved this section as **documented, not templated**, and flagged the `EXTERNAL-AGENTS.md` name collision (Drift #2)
- [[CORE-408.2]] — sibling; landed probe/delegate vocabulary and the `EXTERNAL-AGENTS.md` §"The Core Rule" carve-out this task must not re-open
- [[CORE-328.2]] — landed `README.md` §"Agent memory" (tasknote-as-resume-point framing this section extends)
- [[CORE-330.2]] — runtime-vs-contract precedent; also the origin of `SPEC/loop.md`, whose `## 🔁 Iterations` log is the only existing optional-body-section precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scoped hours ago by [[CORE-408.1]] Q3 and re-verified at HEAD in this session. The gap is real: `grep -rn "🔄"` still returns zero hits outside PLAN/archive prose, and `SPEC.md` §"Tasknote body shape" documents no optional inserts at all. Deliverable is documentation prose only — no template change, no frontmatter key, no skill, no gate — clearing [[CORE-328.1]]'s won't-file and `docs/VISION.md` §"What we won't accept".

- [x] Read relevant source files — `SPEC.md` (§"Tasknote body shape" :308-375, §"Tasknote frontmatter" :272-302, §"📝 Phase 1: Discovery", §"Loop tasks" :604-618, §"What flowtron does NOT provide"), `SPEC/loop.md` (§"`## 🔁 Iterations` log" :106-125, §"Frontmatter keys"), `SPEC/blocked.md` (full), `SPEC/epic.md`, `README.md` §"Agent memory" (:177-199) + §"Sessions, loops, and sub-agents" (:201-246) + doc index (:85-100), `docs/EXTERNAL-AGENTS.md` (full), `docs/GLOSSARY.md` (handoff/resume/sidequest entries), `templates/tasknote-template.md`, `templates/sidequest-template.md`, `templates/subagent-probe-template.md`, `.flowtron/tasknote/README.md`, `.flowtron/PLAN.md`. Archives: `CORE-408.1`, `CORE-408.2`. No probe spawned — read set was narrow and fully enumerated by [[CORE-408.1]]'s design-surface table.

- [x] **Best Practices Review** — `N/A`. Markdown contract prose only; no code module, dependency direction, or abstraction boundary in scope. The one structural judgment (where the section sits in the body, and whether the existing `## 🔁 Iterations` insert is named alongside it) is recorded as Q1/Q2 below.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/` for `Tasknote body shape`, `EXTERNAL-AGENTS`, and `🔄`. Load-bearing findings:
  - **[[CORE-408.1]] (decisive).** Q3 locked the shape: documented in `SPEC.md` §"Tasknote body shape" as an optional insert; `templates/tasknote-template.md` **unchanged**; zero cost to the single-session happy path; no migration for existing tasknotes. Drift #2 is this task's central constraint (name collision with `docs/EXTERNAL-AGENTS.md`). Drift #3 (that doc absent from the AI-referenced-docs ledger) stays `.4`'s.
  - **[[CORE-408.2]] (adjacent, must not re-open).** Landed the one-sentence probe carve-out in `docs/EXTERNAL-AGENTS.md` §"The Core Rule: One Agent Per Tasknote". Its own downstream scan explicitly recorded `.3` as **unaffected**, noting `.3`'s surfaces are §"Tasknote body shape" and the `EXTERNAL-AGENTS.md` §"The Handoff Contract" section — a *different* section from the one `.2` touched. Confirmed at HEAD: the carve-out sits in §"The Core Rule"; §"The Handoff Contract" is untouched.
  - **[[CORE-328.2]].** Authored `README.md` §"Agent memory", whose `tasknote/<ID>.md` bullet already says "A fresh session (or a sub-agent handed the task) reads one file and picks up where the last context window stopped" — the exact framing this section makes concrete. Extends it; does not replace it.
  - **[[CORE-330.2]] / `SPEC/loop.md`.** The only existing precedent for an optional tasknote body section (`## 🔁 Iterations`, between Phase 3 and Phase 4, template unchanged, documented in a lazy module rather than in §"Tasknote body shape"). Shape reference for the fenced-example + prose-paragraph pair; also the source of Q2's asymmetry.
  - No archive precedent for `## 🔄 Handoff` itself — genuinely new surface, consistent with [[CORE-408.1]]'s finding.

- [x] **Drift check** — every path/section cited by the `PLAN.md` line and by [[CORE-408.1]] re-verified at HEAD. `SPEC.md` §"Tasknote body shape" present at :308-375 with the canonical layout block at :317-332 and no optional-insert mention; `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract" present and unedited by `.2`; `templates/tasknote-template.md` carries no `🔄` section; `grep -rn "🔄"` still zero hits outside `.flowtron/PLAN.md` + the two `CORE-408.*` archives. **Two findings:**

  1. **§"Tasknote body shape" is silent about optional inserts, and `## 🔁 Iterations` already is one (structural, drives Q2).** The layout block at `SPEC.md:317-332` presents the body as a closed list of eight sections. `## 🔁 Iterations` — a real optional insert between Phase 3 and Phase 4 — is documented only in `SPEC/loop.md`, never named here. Adding `## 🔄 Handoff` as the *sole* named optional section would leave the canonical layout describing one optional insert and silently omitting the other. Not drift against the plan; an asymmetry the plan does not resolve. Surfaced as Q2.
  2. **Three "resume" surfaces already exist and must be distinguished, not duplicated (load-bearing).** `status: blocked` (`SPEC/blocked.md`) parks a task on a *hard dependency* and preserves Phase 1 + partial Phase 2 verbatim; the sidequest stub's `## Resume anchor` (`templates/sidequest-template.md`) records where the *main* session was when a tangential idea fired; `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract" transfers a *whole tasknote* to another agent after Phase 1. `## 🔄 Handoff` is none of these: no blocker, no new task, no transfer of ownership — it is the *current owner* capturing enough state that a cold reader (including a later self) resumes without re-deriving. The section must say what it is *not*, or it will be written in place of a park.

  No drift against a SPEC contract: an optional documented section adds no phase, no gate, no banner, no frontmatter key, and no checklist box, so §"Operator-gate cues" (two-banner cap), §"Tasknote frontmatter" (write-once + additive-keys policy), and the Phase 1/2 checklist counts are all untouched.

- [x] Asked clarifying questions — four surfaced via structured ask; all four resolved on the recommended option (see "Resolved scoping" below). Three of the four widen scope beyond the filed PLAN line (+1 framing paragraph, +2 files), which is the significant scope deviation firing the 🛠️ gate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Resolved scoping

| # | Question | Resolution | Consequence |
|---|---|---|---|
| Q1 | Where does `## 🔄 Handoff` sit in the body? | **Top block, after `## 🔗 Related`**, above the `---` divider. | A cold reader meets the resume brief before the phase log — the section's whole purpose. Diverges from `## 🔁 Iterations`' Phase-3/4 slot deliberately: an iteration log *is* execution record, a handoff brief is not. |
| Q2 | Name `## 🔁 Iterations` alongside, or document Handoff alone? | **Name both** under a short "optional inserts" framing; `## 🔁 Iterations` is cross-referenced to `SPEC/loop.md`, never restated. | Closes Drift #1 on lines already being edited ([[CORE-408.2]] Q4 precedent). §"Tasknote body shape" stops describing the body as a closed list while an optional insert exists elsewhere. +1 short paragraph, no new contract. |
| Q3 | Reciprocal pointer in `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract"? | **Yes — one sentence.** | +1 file beyond the filed scope. Directly the [[CORE-408.2]] Q2 move (same doc, adjacent section): buys coherence at landing time rather than leaving a one-way link a reader can hit from the wrong side. Does **not** re-open §"The Core Rule" or the ledger gap (`.4`'s). |
| Q4 | Touch `README.md` §"Agent memory"? | **Yes — one clause** on the `tasknote/<ID>.md` bullet. | +1 file. Routed here by [[CORE-408.1]]'s design-surface table though absent from the PLAN line. The bullet already frames the tasknote as the cold-start resume point; the clause makes it concrete where readers meet the idea. |

### What the section is (and is not)

| Surface | Trigger | Preserves | Ownership |
|---|---|---|---|
| `status: blocked` (`SPEC/blocked.md`) | Hard dependency mid-Phase-2 | Phase 1 + partial Phase 2, verbatim, in place | Unchanged; task parked |
| `## Resume anchor` (sidequest stub) | A *tangential* idea fires mid-session | Where the main session was | New stub task; main task untouched |
| §"The Handoff Contract" (`docs/EXTERNAL-AGENTS.md`) | Operator hands a task to another CLI agent | Nothing new — the three repo files already suffice | Transfers to the receiving agent |
| **`## 🔄 Handoff`** (this task) | A session ends mid-task with work unfinished and no blocker | Distilled resume state a cold reader needs | Unchanged; the *next* session of the same task picks up |

### Surfaces in scope

| File | Edit |
|---|---|
| `SPEC.md` §"Tasknote body shape" | Layout block gains the optional `## 🔄 Handoff` line (Q1: after `## 🔗 Related`); new "optional inserts" framing naming both inserts (Q2); the `## 🔄 Handoff` shape + when-to-write + what-it-is-not prose, cross-referencing `docs/EXTERNAL-AGENTS.md` |
| `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract" | Reciprocal one-sentence disambiguation (Q3) |
| `README.md` §"Agent memory" | One clause on the `tasknote/<ID>.md` bullet (Q4) |

### Deliberately out of scope

- **`templates/tasknote-template.md`** — unchanged by [[CORE-408.1]] Q3. Non-negotiable: templating the section would tax every scaffold for a rare case.
- **A frontmatter key** (`handoff:` / `handoff-at:`) — no consumer; §"Tasknote frontmatter" additive-key precedent does not justify one for a prose section.
- **A skill or flag** to generate the section — [[CORE-408.1]] Q4 resolved no new skill for this epic; roster stays 18.
- **`docs/GLOSSARY.md` "Handoff" entry** — `.4` owns it by its filed PLAN line.
- **The `docs/EXTERNAL-AGENTS.md` AI-referenced-docs ledger gap** ([[CORE-408.1]] Drift #3) — `.4`'s decision.
- **`SPEC/blocked.md` and the sidequest stub** — cited for contrast, not edited.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three patterns extended, none invented:
  - **Bolded lead-in under an H2** — §"Tasknote body shape" already sequences `**Top sections**` / `**Phase sections**` / `**Cross-linking**` / `**Backwards compatibility**`. `**Optional inserts.**` joins that sequence in the same shape rather than opening a new structure.
  - **Fenced-example + prose-rationale pair** — exactly `SPEC/loop.md` §"`## 🔁 Iterations` log" (fenced sample, then a paragraph explaining what the section is *for*). Reused for the Handoff shape.
  - **"What X is not" disambiguation list** — `SPEC/blocked.md`'s two-signal table and [[CORE-408.2]]'s probe-defined-by-negatives phrasing. Same move: pin the concept by naming the neighbours it is confusable with.

- [x] **Minimal refactor gate** — one structural correction beyond the prose additions, required by the edit itself: the `### 🔄 Handoff (optional)` H3 was initially inserted after `**Optional inserts**`, which orphaned the pre-existing `**Cross-linking**` and `**Backwards compatibility**` lead-ins *under* the new H3 — they would have read as part of the Handoff subsection. Moved the H3 to the end of §"Tasknote body shape" so both lead-ins stay under the H2 and the subsection is terminal. Zero content change to either paragraph (verified by diff: `+55/-1` on `SPEC.md`, the `-1` being the layout-block line that gained the Handoff entry). No unrelated cleanup.

- [x] Implemented the minimal solution — three files edited; see the table below.

- [x] Updated/added tests for non-trivial behavior — `N/A`. Markdown contract prose; no executable surface. `viz/`'s parser is untouched (no `PLAN.md` grammar change, no tasknote frontmatter key added).

**Implementation Notes:**

| File | Change |
|---|---|
| `SPEC.md` | §"Tasknote body shape": layout block gains `## 🔄 Handoff  ← optional (see below)` after `## 🔗 Related`; new `**Optional inserts.**` paragraph naming both inserts; new terminal `### 🔄 Handoff (optional)` subsection carrying the five-part fenced shape, the when-to-write paragraph, and the three-bullet `**What a Handoff is not.**` list. +55/-1 |
| `docs/EXTERNAL-AGENTS.md` | §"The Handoff Contract": one reciprocal sentence distinguishing the tasknote section from whole-tasknote transfer. +2 |
| `README.md` | §"Agent memory": one clause on the `tasknote/<ID>.md` bullet naming the optional section, linked to `SPEC.md` §"Tasknote body shape". +4/-1 |

**Design decisions:**

- **Five parts, not six.** The PLAN line reads "Goal + Acceptance status, key decisions, open questions, relevant paths, next step" — five comma-separated items, the first bundling two facts about the same thing (where the task stands). The first draft said "six parts" against a five-bullet example; corrected to five. Goal and Acceptance status stay one bullet: they answer one question.
- **Top-block placement diverges from `## 🔁 Iterations` deliberately.** An iteration log *is* execution record, so it belongs in the log half. A Handoff is read *before* the log, by someone deciding what to do next — so it belongs in the spec half, and the prose says why rather than leaving the asymmetry to look accidental.
- **`## 🔁 Iterations` named, never restated.** The optional-inserts bullet gives it one line and a link to `SPEC/loop.md`. Duplicating the log's format here would create the second copy that [[CORE-183]]-style lockstep problems come from.
- **No frontmatter key.** A `handoff:` / `handoff-at:` key was considered and rejected — §"Tasknote frontmatter"'s additive-key precedent exists for machine consumers (`loop:` drives skill dispatch), and nothing consumes a Handoff but a human or an agent reading the file it is already in.
- **Downstream-impact reconciliation scan** — **no downstream impact.** Active PLAN entries re-read and classified: `CORE-408.4` **unaffected** (still owns the GLOSSARY entries — this task supplies the "Handoff" vocabulary `.4` will gloss, the planned dependency, not drift — plus the CAPABILITIES row, PLATFORMS equivalents, and the `docs/EXTERNAL-AGENTS.md` ledger-gap decision, which this task edited the doc without re-opening); `CORE-408.N` and `CORE-EPIC-408` **unaffected**. No reconcile action proposed; no user-confirm required.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → **18 files / 245 tests passed** (4.17s). Not a targeted surface (no grammar or frontmatter change); run as the registered release-gate sanity check.

- [x] Ran lint/type-check on changed code — `N/A`. Markdown only; no linted or typed surface changed. Substituted the markdown checks below.

- [x] **Quality assertions** — no duplication introduced: `## 🔁 Iterations` is named and linked, never restated, and the three "what it is not" bullets cite `SPEC/blocked.md` / the sidequest template / `docs/EXTERNAL-AGENTS.md` rather than paraphrasing their contracts. No dead prose — every paragraph is reachable from either the layout block or the optional-inserts list. Public-surface growth is one optional documented section and zero new files, flags, keys, or skills. No stale code-facing docs: the section names no skill, flag, or API, so nothing can drift out from under it.

- [x] (frontend) Asked the user for visual confirmation — `N/A`. No frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Command / method | Result |
|---|---|---|
| Viz suite (release gate) | `npm --prefix viz test` | 18 files / 245 tests passed (4.17s) |
| Template untouched | `git diff --name-only \| grep -c "templates/"` | **0** — Acceptance criterion verified by diff, not assertion |
| Changed-file set | `git diff --stat` | exactly 3 files: `SPEC.md` +55/-1 · `README.md` +4/-1 · `docs/EXTERNAL-AGENTS.md` +2 |
| Trailing whitespace | `grep -rn " $"` over all 4 touched files | none |
| Heading structure | `grep -n "^#\{2,3\} " SPEC.md` | `### 🔄 Handoff (optional)` at :388 is terminal in §"Tasknote body shape"; next H2 `## The 4-phase workflow` at :432. The `## 🔄 Handoff` at :398 is inside a fenced block, not a live heading (same property as the pre-existing layout block at :329-332) |
| Orphaned lead-ins | `sed -n '360,425p' SPEC.md` read end-to-end | `**Cross-linking**` + `**Backwards compatibility**` sit under the H2, above the H3 — the defect the Phase 2 restructure fixed |
| New link targets resolve | `SPEC/loop.md` · `SPEC/blocked.md` · `docs/EXTERNAL-AGENTS.md` · `README.md` from `SPEC.md`; `SPEC.md` from `README.md` | all resolve (repo-root-relative, matching existing `SPEC.md` link style) |
| Wikilink integrity | every `[[ID]]` in this tasknote checked against `archive/core/` + `PLAN.md` | 5/5 archived notes exist; `[[CORE-EPIC-408]]` live in PLAN.md |
| Shape ↔ prose consistency | fenced example bullet count vs. the "N parts" claim | 5 bullets ↔ "five parts" (first draft said six; corrected) |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 AI-referenced-docs entries walked; **2 updated, 10 no change**:
  - `README.md` — **UPDATED.** §"Agent memory" `tasknote/<ID>.md` bullet gains the optional-Handoff clause.
  - `SPEC.md` — **UPDATED.** §"Tasknote body shape" layout-block line, `**Optional inserts.**` framing, and the `### 🔄 Handoff (optional)` subsection.
  - `docs/MIGRATION.md` — no change. No new file to copy and no skill to symlink; adopters inherit the section on their next submodule bump, since it rides inside `SPEC.md`, which every `/ft-task` run already loads.
  - `claude/AGENTS-snippet.md` — no change. It names templates an adopter must *copy*; the Handoff is documented-not-templated, so nothing is copied and no snippet line changes.
  - `codex/AGENTS-snippet.md` — no change (no template references at all; same reasoning).
  - `docs/CONVENTIONS.md` — no change. No commit, versioning, or formatting convention touched.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change, checked deliberately. A Handoff is prose written by the session that already owns the tasknote into the file it already owns; it introduces no new file, no new reader, and no new trust boundary. §"Prompt injection via user-authored markdown" already covers markdown any AI reads.
  - `docs/AGENT-NEUTRALITY.md` — no change. Every word added is agent-neutral: "session", "reader", "tool" — no Claude Task-tool, `/clear`, or platform primitive named. `.4` owns any ledger row for Claude-specific invocation mechanics.
  - `docs/PLATFORMS.md` — no change **now**; `.4` owns §"Non-Claude capability triggers".
  - `claude/CAPABILITIES.md` — no change **now**; `.4` owns the sub-agent trigger row.
  - `docs/AGENT-COMPAT.md` — no change. Per-agent consume-mode matrix unaffected — an optional section needs no agent capability to skip, and any agent that can read markdown can write one.
  - **Ledger gap (unchanged, still `.4`'s):** `docs/EXTERNAL-AGENTS.md` was edited by this task but remains absent from the 12-entry ledger ([[CORE-408.1]] Drift #3) — same disposition [[CORE-408.2]] recorded. Deliberately not opened here.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept 2-space nested beneath the active `CORE-EPIC-408` parent per SPEC/epic.md §"Child placement invariant", then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary; surfaced at the 📦 gate.

**Final Summary:**

Documented an optional `## 🔄 Handoff` tasknote section in `SPEC.md` §"Tasknote body shape": a five-part brief (Goal + Acceptance status · key decisions · open questions · relevant paths · next step) that a session ending mid-task can leave so the next reader resumes without reconstructing state from Discovery Notes and a half-ticked Phase 2. It sits in the top block after `## 🔗 Related`, ships in no template, and costs the single-session happy path nothing — the section exists only when someone writes one.

**The hard part was disambiguation, not the shape.** Flowtron already had three surfaces a mid-task handoff could be confused with, and reaching for the wrong one loses information: `status: blocked` parks on a hard dependency and stops the workflow ([[CORE-408.1]] and `SPEC/blocked.md`); a sidequest's `## Resume anchor` belongs to a *different*, newly filed task; and `docs/EXTERNAL-AGENTS.md` §"The Handoff Contract" already owned the *word*, meaning whole-tasknote transfer to another agent after Phase 1 ([[CORE-408.1]] Drift #2). The section is therefore defined as much by what it is not — a three-bullet list — as by its shape, and the same-named contract got a reciprocal one-sentence pointer so a reader arriving from either side is told the other meaning exists ([[CORE-408.2]]'s §"The Core Rule" carve-out precedent, adjacent section).

**Pre-existing gap closed on the lines being edited.** §"Tasknote body shape" described the body as a closed eight-section list while `## 🔁 Iterations` — a real optional insert — already existed, documented only in `SPEC/loop.md`. Adding Handoff as the sole named optional section would have deepened that asymmetry, so a short `**Optional inserts.**` framing now names both, cross-referencing the loop log rather than restating it.

**One structural defect caught in-flight.** The `### 🔄 Handoff (optional)` H3 was first inserted directly after the optional-inserts list, which orphaned the pre-existing `**Cross-linking**` and `**Backwards compatibility**` lead-ins *underneath* it — they would have rendered as part of the Handoff subsection. Moved the H3 to the end of §"Tasknote body shape"; both paragraphs are byte-identical, verified by diff. The first draft also claimed "six parts" against a five-bullet example; corrected to five.

**Constraint honoured.** [[CORE-328.1]] won't-filed "programmatic sub-agent delegation machinery" and [[CORE-408.1]] Q3/Q4 locked documented-not-templated with no new skill. Nothing here is machinery: no template change (`git diff --name-only | grep -c "templates/"` → **0**), no frontmatter key (considered and rejected — nothing machine-consumes a prose section), no checklist box, no gate, no banner, no skill, no symlink fan-out. Roster stays 18; Phase 1 stays at eight boxes.

**Verification.** `npm --prefix viz test` 18 files / 245 tests passed; exactly 3 files changed (`SPEC.md` +55/-1 · `README.md` +4/-1 · `docs/EXTERNAL-AGENTS.md` +2); zero trailing whitespace across 4 touched files; heading structure confirmed (`### 🔄 Handoff` terminal in its H2, next H2 at :432); all five new link targets resolve; 5/5 wikilinked archives exist. Doc-drift sweep: 2 updated, 10 no change (`SECURITY.md` and `docs/AGENT-NEUTRALITY.md` checked deliberately, both correctly unchanged). Downstream-impact reconciliation: no impact — `.4`'s scope intact, including the ledger-gap decision this task did not re-open.

**Maintainability effect.** +60/-2 lines across three docs, no new files. The convention now has a stated shape, so mid-task handoffs stop being ad-hoc prose whose quality depends on whoever wrote it; and §"Tasknote body shape" is no longer silently incomplete about its own optional sections. The vocabulary ("Handoff" as a tasknote section, distinct from the transfer contract) is the precondition for `.4`'s GLOSSARY entry.

**Archived:** 2026-08-06
