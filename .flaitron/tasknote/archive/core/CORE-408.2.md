---
title: isolation-contract
status: completed
tags: []
created: 2026-08-06
related-tasks: [CORE-EPIC-408, CORE-408.1, CORE-328.1, CORE-328.4, CORE-330.2, CORE-183, CORE-387]
---

# CORE-408.2 | isolation-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-408]]

## 🎯 Goal

Redraw `README.md` §"Sessions, loops, and sub-agents" bullet 4 into two named categories — **probe** (owns no tasknote, returns a distilled summary) vs **delegate** (owns exactly one tasknote) — add one `SPEC.md` Phase 1 Discovery prompt for isolating broad search, and ship `templates/subagent-probe-template.md` carrying the pasteable brief + fixed return shape.

## ✅ Acceptance

- [x] `README.md` §"Sessions, loops, and sub-agents" bullet 4 replaced by two named categories — **probe** (owns no tasknote, never enters the 4-phase lifecycle, returns a distilled summary) and **delegate** (owns exactly one tasknote, inherits its Phase 1 record) — with the section's intro "free-roaming sub-agent" framing reconciled so a bounded probe is no longer described as the failure mode
- [x] `SPEC.md` §"📝 Phase 1: Discovery" carries the isolate-broad-search prompt as a **widening of the existing "Read relevant source files" bullet** plus one rationale paragraph below the checklist — no ninth box ([[CORE-387]] precedent)
- [x] `templates/tasknote-template.md` Phase 1 checklist re-synced with the widened SPEC bullet (the two must not drift)
- [x] `templates/subagent-probe-template.md` exists, carrying a pasteable brief block and a fixed return shape; lean shape in the `sidequest-template.md` mould (no worked example, no guardrail essay)
- [x] `docs/EXTERNAL-AGENTS.md` §"The Core Rule: One Agent Per Tasknote" carries a one-sentence probe carve-out so it no longer contradicts the redrawn README bullet
- [x] Both template enumerations updated for the new file — `SPEC.md` §"Working in the flowtron repo itself" and `.flowtron/tasknote/README.md` §Layout — with the latter's pre-existing omissions (`sidequest-template.md`, `spec-template.md`) completed in the same edit
- [x] No machinery added: no runner, scheduler, orchestration graph, mandatory tasknote field, or new skill ([[CORE-328.1]] won't-file; `docs/VISION.md` §"What we won't accept")
- [x] Phase 4 doc-drift sweep across all 12 AI-referenced-docs entries

## 🧩 Subtasks

- [x] Redraw `README.md` §"Sessions, loops, and sub-agents" — split bullet 4 into probe/delegate; adjust the intro paragraph's "free-roaming sub-agent" sentence to name the unbounded case rather than any sub-agent
- [x] Widen `SPEC.md` §"📝 Phase 1: Discovery" — the "Read relevant source files" bullet + one rationale paragraph under the checklist
- [x] Re-sync `templates/tasknote-template.md:43` with the widened SPEC bullet
- [x] Write `templates/subagent-probe-template.md` (brief block + fixed return shape)
- [x] Add the one-sentence probe carve-out to `docs/EXTERNAL-AGENTS.md` §"The Core Rule"
- [x] Update the two template enumerations (`SPEC.md:55`, `.flowtron/tasknote/README.md:11`), completing the latter's pre-existing gap
- [x] Phase 3: markdown mental-pass + wikilink-integrity + trailing-whitespace checks on every edited file; `npm --prefix viz test` unaffected-surface sanity
- [x] Phase 4: doc-drift sweep + flip `.2` PLAN line to stub form (nested under the active parent) + archive tasknote

## 🔗 Related

- [[CORE-EPIC-408]] — parent epic
- [[CORE-408.1]] — Discovery; resolved Q1 (two named categories) and Q2 (README redraw + one SPEC prompt, no lazy module)
- [[CORE-328.1]] — won't-filed "programmatic sub-agent delegation machinery"; the constraint every deliverable here is checked against
- [[CORE-328.4]] — landed the README §"Sessions, loops, and sub-agents" section and bullet 4 this task redraws
- [[CORE-330.2]] — shape precedent: reconciling a same-surface stance a prior child had just landed
- [[CORE-183]] — established that the Phase 1 checklist is mirrored in SPEC.md + the template + three skills; edits must stay in lockstep
- [[CORE-387]] — precedent: widened an existing Phase 1 bullet rather than adding a ninth checklist box

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope was set hours ago by [[CORE-408.1]] and every cited surface verified at HEAD. The contradiction `.1` identified is real and still live: `README.md:222` requires a delegated context to *own* one tasknote, which makes a read-only exploration probe the "free-roaming sub-agent" the same section warns against. Deliverables are prose + one lean template — no runner, no orchestration, no mandatory field, clearing [[CORE-328.1]]'s won't-file and `docs/VISION.md` §"What we won't accept".

- [x] Read relevant source files — `README.md` §"Agent memory" (177-199) + §"Sessions, loops, and sub-agents" (201-234), `SPEC.md` (§"Working in the flowtron repo itself" :47-60, §"📝 Phase 1: Discovery" :426-468, §"Tasknote body shape", §"What flowtron does NOT provide"), `SPEC/epic.md`, `templates/tasknote-template.md`, `templates/sidequest-template.md`, `templates/loop-heartbeat-template.md`, `templates/audit-overlay-template.md`, `docs/EXTERNAL-AGENTS.md` (full), `docs/VISION.md` §"What we won't accept", `.flowtron/tasknote/README.md`, `.flowtron/PLAN.md`.

- [x] **Best Practices Review** — `N/A`. Markdown contract + template work; no code module, dependency direction, or abstraction boundary in scope. (The one structural judgment — new box vs widened bullet — is recorded as Q1 below, resolved on the [[CORE-387]] precedent.)

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/` for `Sessions, loops, and sub-agents`, `templates/`, and `Phase 1 checklist`. Load-bearing findings:
  - **[[CORE-387]] (decisive, shaped Q1).** Widened the Phase 1 drift-check bullet to its cross-artifact half and recorded the rule explicitly: *"**No new box.** Phase 1 already carries eight checklist items and Phase 2 four. The widening adds zero to either — the reason this landed on an existing bullet rather than a new Phase 2 step."* It also paired the widened bullet with a rationale paragraph below the checklist (`SPEC.md:431-443`) — the exact two-part shape this task reuses.
  - **[[CORE-328.4]].** Authored the section being redrawn: the four safe-pattern bullets, the descriptive-only closing guard, and the operator-`/clear` framing. Its Final Summary confirms bullet 4's original intent was "sub-agents get exactly one tasknote" as a *bound on delegation*, not a ban on bounded read-only help — which is why a split reconciles rather than reverses it.
  - **[[CORE-330.2]] (shape precedent).** "Runtime in the runner, contract in flowtron" — the same move at a different surface. Confirms that redrawing a README boundary + adding a contract prompt, with no runtime, is the sanctioned resolution shape here.
  - **[[CORE-183]].** Established that the Phase 1 checklist's shape is load-bearing across `SPEC.md`, `templates/tasknote-template.md`, and three skills; any edit must keep SPEC and template in lockstep. Drives the third Acceptance criterion.
  - No archive precedent for an exploration-probe template — `templates/subagent-probe-template.md` is a genuinely new artifact, so `sidequest-template.md` (19 lines, leanest in `templates/`) is the shape reference rather than an existing sibling to extend.

- [x] **Drift check** — every path and line cited by the `PLAN.md` line and by [[CORE-408.1]] re-verified at HEAD. `README.md:222` bullet 4 present and unchanged; `SPEC.md:432` "Read relevant source files" present; `templates/tasknote-template.md:43` is its twin; `templates/subagent-probe-template.md` absent as expected. **One new drift finding, not in `.1`'s four:**

  1. **`docs/EXTERNAL-AGENTS.md` §"The Core Rule: One Agent Per Tasknote" is a second, stronger copy of the bullet this task redraws (load-bearing).** `.1` routed that doc to `.3` (Handoff-name collision) and `.4` (ledger gap) but did not flag its *Core Rule* section. Line 9 states "**A tasknote is the unit of handoff, and exactly one agent owns it at a time**" and line 13 adds "do **not** split one tasknote across two agents." A probe owns no tasknote, so it does not violate the rule as literally worded — but the section's framing ("if work is genuinely parallelizable, it is *already* two tasknotes") reads as excluding any second context helping the tasknote's owner. Redrawing `README.md` without touching it lands a live contradiction between two AI-referenced docs. Surfaced to the operator (Q2) and pulled into this task's scope as a one-sentence carve-out.

  No drift against a SPEC contract: the widened-bullet approach adds no phase, no gate, no banner, and no frontmatter key, so §"Operator-gate cues" (two-banner cap) and §"Tasknote frontmatter" are both untouched.

- [x] Asked clarifying questions — four surfaced via structured ask; all four resolved on the recommended option (see "Resolved scoping" below).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Resolved scoping

| # | Question | Resolution | Consequence |
|---|---|---|---|
| Q1 | What shape does "one SPEC.md Phase 1 checklist prompt" take — new box, widened bullet, or prose only? | **Widen the existing "Read relevant source files" bullet** with a conditional clause, plus one rationale paragraph under the checklist. | Directly follows [[CORE-387]]. Phase 1 stays at eight boxes; no mandatory box for a conditional action; `templates/tasknote-template.md:43` re-syncs with the same clause. Avoids the ceremony creep [[CORE-328.1]]'s won't-file guards against. |
| Q2 | Does the `docs/EXTERNAL-AGENTS.md` Core Rule contradiction (Drift #1) belong to `.2`, `.4`, or nowhere? | **One-sentence carve-out in `.2`.** A probe is not a second owner: owns no tasknote, never enters the lifecycle, returns to the session that holds the tasknote. | +1 file, +1 sentence of scope beyond the filed three deliverables. Bought coherence at landing time rather than leaving two AI-referenced docs contradicting until `.4` runs. **This is the significant scope deviation that fires the 🛠️ gate.** |
| Q3 | How deep is `templates/subagent-probe-template.md`? | **Brief + fixed return shape only** — no worked example, no do/don't essay. | Lands in the `sidequest-template.md` (19-line) mould rather than the `loop-heartbeat-template.md` (120-line) one. Less surface to keep current; consistent with the epic's "guidance and templates only" framing. |
| Q4 | `.flowtron/tasknote/README.md:11`'s enumeration already omits `sidequest-template.md` and `spec-template.md` — fix while editing that exact line? | **Add the new entry and complete the gap.** | Two extra list items on a line already being edited. Leaving a knowingly-incomplete enumeration after touching it would be worse than the minimal-diff cost. |

### The reconciliation in one line

Bullet 4 asserts a single category ("sub-agents get exactly one tasknote"). Discovery confirms the category is actually two — **delegate** (owns one tasknote, inherits its Phase 1 record, runs the lifecycle) and **probe** (owns none, reads and searches, returns a distilled summary, never gates and never archives). The current wording has no slot for the second, so a probe reads as the failure mode. Naming both is what makes the isolation contract expressible.

### Surfaces in scope

| File | Edit |
|---|---|
| `README.md` | §"Sessions, loops, and sub-agents" — bullet 4 → two bullets; intro's "free-roaming sub-agent" sentence narrowed to the unbounded case |
| `SPEC.md` | §"📝 Phase 1: Discovery" bullet widening + rationale paragraph; §"Working in the flowtron repo itself" template enumeration |
| `templates/tasknote-template.md` | Line 43 re-synced with the widened SPEC bullet |
| `templates/subagent-probe-template.md` | **New** — brief block + fixed return shape |
| `docs/EXTERNAL-AGENTS.md` | §"The Core Rule" — one-sentence probe carve-out |
| `.flowtron/tasknote/README.md` | §Layout template enumeration (+ pre-existing gap) |

### Deliberately out of scope

- **`docs/GLOSSARY.md` entries for probe / delegate** — `.4` owns them by its filed PLAN line.
- **`claude/CAPABILITIES.md` sub-agent trigger row** and **`docs/PLATFORMS.md` non-Claude equivalents** — `.4`.
- **The `docs/EXTERNAL-AGENTS.md` AI-referenced-docs ledger gap** (`.1` Drift #3) — `.4` owns the add/decline decision. This task edits the doc but does not re-open its ledger status.
- **`## 🔄 Handoff`** — `.3`.
- **`docs/WORKTREES.md`** — isolation of *execution*; cited, not restated ([[CORE-328.4]] precedent).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three patterns extended, none invented:
  - **Widened bullet + rationale paragraph below the checklist** — the exact two-part shape [[CORE-387]] used on the drift-check bullet. Reused rather than adding a ninth box.
  - **README safe-pattern bullet** — bullet 4 became bullets 4 and 5 in the same bolded-lead-in / prose-body shape [[CORE-328.4]] established for the other three. No new subsection, no nested list.
  - **Standalone pasteable template** — `sidequest-template.md` (19 lines) is the lean end of `templates/`; the probe template sits nearest it rather than the `loop-heartbeat-template.md` (120-line) end, per Q3.

- [x] **Minimal refactor gate** — one edit beyond the strict minimum, both operator-approved in Phase 1: the `docs/EXTERNAL-AGENTS.md` carve-out (Q2 — prevents two AI-referenced docs contradicting from the moment this lands) and completing `.flowtron/tasknote/README.md:11`'s pre-existing enumeration gap (Q4 — same line already being edited). No unrelated cleanup; the README §Sessions intro reword is required by the redraw, not adjacent tidying.

- [x] Implemented the minimal solution — six files (five edited, one added); see the table below.

- [x] Updated/added tests for non-trivial behavior — `N/A`. Markdown contract + template; no executable surface. `viz/`'s parser is untouched (no `PLAN.md` grammar change).

**Implementation Notes:**

| File | Change |
|---|---|
| `README.md` | §"Sessions, loops, and sub-agents": bullet 4 → **A delegate gets exactly one tasknote** + **A probe owns no tasknote** (5 bullets total). Intro's "free-roaming sub-agent" narrowed to "an *unbounded* sub-agent — one turned loose without a stated scope or a defined thing to return", so a bounded probe is no longer described as the failure mode. +15/-4 |
| `SPEC.md` | §"📝 Phase 1: Discovery": "Read relevant source files" bullet widened with the conditional probe clause; new 15-line rationale paragraph after the Relevance Assessment note. §"Working in the flowtron repo itself": template enumeration +`subagent-probe`. +18/-2 |
| `templates/tasknote-template.md` | Line 43 re-synced with the widened SPEC bullet (submodule-relative path in place of SPEC's "see below"). +1/-1 |
| `templates/subagent-probe-template.md` | **New**, 68 lines: what a probe is, the pasteable brief block (question · where to look · read-only · do-not · return-exactly), the fixed four-section return shape (Answer · Files that matter · Evidence · What I did NOT check), and four notes (one question per probe · skipping is correct · parent owns judgment · no machinery). |
| `docs/EXTERNAL-AGENTS.md` | §"The Core Rule: One Agent Per Tasknote": one-sentence probe carve-out — the rule bounds *ownership*, not every context an owner may consult. +2 |
| `.flowtron/tasknote/README.md` | §Layout template enumeration: +`subagent-probe-template.md`, and the pre-existing omissions `sidequest-template.md` + `spec-template.md` completed. +1/-1 |

**Design decisions:**

- **"See below" vs. a path in the SPEC bullet.** `SPEC.md`'s bullet says "(see below)" because its rationale paragraph is fourteen lines down on the same page; the template's copy carries the literal `templates/subagent-probe-template.md` path because a scaffolded tasknote has no such paragraph to point at. The two are deliberately not byte-identical — same clause, resolved for each context.
- **Probe defined by what it does not do.** Every occurrence pins the same four negatives (owns no tasknote · never runs Phase 1 · never trips a gate · never closes or archives). That phrasing is what keeps the split from reading as a licence for the free-roaming sub-agent the section still warns against.
- **`--fast` bullet left untouched.** It sits between the worktree bullet and the new pair and concerns operator gates, not delegation. Reordering to group the two delegation bullets was considered and rejected as adjacent churn.
- **Downstream-impact reconciliation scan** — **no downstream impact.** Active PLAN entries re-read and classified: `CORE-408.3` **unaffected** (its surfaces — `SPEC.md` §"Tasknote body shape" and the `EXTERNAL-AGENTS.md` §"Handoff Contract" section — are untouched here; the carve-out landed in §"The Core Rule", a different section); `CORE-408.4` **unaffected** (still owns GLOSSARY probe/delegate entries, the CAPABILITIES trigger row, PLATFORMS equivalents, and the ledger-gap decision — this task supplies the vocabulary `.4` glosses, which is the planned dependency, not drift); `CORE-408.N` and `CORE-EPIC-408` **unaffected**. No reconcile action proposed; no user-confirm required.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → **18 files / 245 tests passed** (4.11s). Not strictly a targeted surface (no `PLAN.md` grammar change), run as the registered release-gate sanity check.

- [x] Ran lint/type-check on changed code — `N/A`. Markdown only; no linted or typed surface changed. Substituted the markdown checks below.

- [x] **Quality assertions** — no duplication introduced beyond the deliberate SPEC↔template bullet mirror ([[CORE-183]] requires that pair to stay in lockstep; both verified identical in clause and divergent only in path resolution). No dead prose: every new paragraph is reachable from a checklist bullet or a README bullet. Public-surface growth is one file, the filed deliverable. No stale code-facing docs — the probe clause names no skill, flag, or API.

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
| Viz suite (release gate) | `npm --prefix viz test` | 18 files / 245 tests passed |
| Trailing whitespace | `grep -rn " $"` over all 7 touched files | none |
| SPEC ↔ template bullet sync | `grep -n "Read relevant source files" SPEC.md templates/tasknote-template.md` | clause identical; path resolution differs by design |
| New link targets resolve | `templates/subagent-probe-template.md` exists; referenced from `README.md:235`, `SPEC.md:452`, `templates/tasknote-template.md:43`, `.flowtron/tasknote/README.md:11` | all resolve |
| Wikilink integrity | every `[[ID]]` in this tasknote checked against `archive/core/` + `PLAN.md` | 6/6 archived notes exist; `[[CORE-EPIC-408]]` live in PLAN.md |
| Markdown mental-pass | edited README §Sessions read end-to-end (`sed -n '201,246p'`) | 5 bullets parallel in shape; intro reword flows; closing guard paragraph unchanged |

Rendered-prose check on the redraw: the section now names three delegation
shapes in ascending scope — worktree+session (owns a checkout), delegate (owns
a tasknote), probe (owns nothing) — with the `--fast` bullet on the orthogonal
gates axis between them. The closing "This is guidance, not machinery"
paragraph still covers all five bullets without edit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 AI-referenced-docs entries walked; **2 updated, 10 no change**:
  - `README.md` — **UPDATED.** §"Sessions, loops, and sub-agents" bullet 4 split into delegate + probe; intro's "free-roaming sub-agent" narrowed to "unbounded".
  - `SPEC.md` — **UPDATED.** §"📝 Phase 1: Discovery" read-bullet widening + probe-clause rationale paragraph; §"Working in the flowtron repo itself" template enumeration.
  - `docs/MIGRATION.md` — no change. Its only `templates/` references are `cp` operations (`audit-overlay`, `PLAN.md`, `tasknote-README`); the probe template is read by reference from the read-only submodule and is never copied into an adopter, so no adoption or bump step changes.
  - `claude/AGENTS-snippet.md` — no change. It names `loop-heartbeat-template.md` because `/ft-goal-task` needs an adopter to *copy* one; the probe clause instead rides inside `SPEC.md` §Phase 1, which every `/ft-task` run already loads. Adopters inherit it on their next bump with no snippet edit.
  - `codex/AGENTS-snippet.md` — no change (no template references at all; same reasoning).
  - `docs/CONVENTIONS.md` — no change. No commit/versioning/formatting convention touched.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change, checked deliberately rather than by default. §"Prompt injection via user-authored markdown" already scopes its threat model to "any AI assistant reading the same files", which covers a probe exactly; a probe reads the files the parent would have read anyway, is read-only by brief, and adds no tool-allowlist surface. The existing adopter mitigations apply unchanged — no new attack surface to document.
  - `docs/AGENT-NEUTRALITY.md` — no change. The contract-layer prose added here is agent-neutral throughout: "sub-agent", "probe", "delegate", no Claude Task-tool or platform primitive named. `.4` owns any ledger row for the Claude-specific *invocation mechanics*.
  - `docs/PLATFORMS.md` — no change **now**; `.4` owns §"Non-Claude capability triggers" entries.
  - `claude/CAPABILITIES.md` — no change **now**; `.4` owns the sub-agent trigger row.
  - `docs/AGENT-COMPAT.md` — no change. Per-agent consume-mode matrix unaffected; a probe is optional and needs no agent capability to skip.
  - **Ledger gap (unchanged, still `.4`'s):** `docs/EXTERNAL-AGENTS.md` was edited by this task but remains absent from the 12-entry ledger ([[CORE-408.1]] Drift #3). Deliberately not opened here — `.4` owns the add/decline decision.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept 2-space nested beneath the active `CORE-EPIC-408` parent per SPEC/epic.md §"Child placement invariant", then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary; surfaced at the 📦 gate.

**Final Summary:**

Split flowtron's single "sub-agents get exactly one tasknote" rule into two named categories, because it had no slot for the thing this epic exists to sanction. `README.md` §"Sessions, loops, and sub-agents" now carries **delegate** (owns exactly one tasknote, inherits its Phase 1 record, runs the workflow to closure) and **probe** (owns none, reads and searches, returns a distilled summary, ends) as separate bullets; `SPEC.md` §"📝 Phase 1: Discovery" gained a conditional probe clause on its "Read relevant source files" bullet plus a rationale paragraph; and `templates/subagent-probe-template.md` ships the pasteable brief and the fixed four-section return shape.

**The reconciliation, not a wording tweak.** As [[CORE-408.1]] found, the old bullet *contradicted* the probe rather than merely omitting it: it required a delegated context to own a tasknote, which made a read-only exploration probe the "free-roaming sub-agent" the same section warned against. The redraw resolves that by narrowing the warning to the *unbounded* case — a sub-agent turned loose without a stated scope or a defined thing to return — and naming both bounded shapes. Structurally the [[CORE-330.2]] move.

**Discovery finding beyond the filed scope.** `docs/EXTERNAL-AGENTS.md` §"The Core Rule: One Agent Per Tasknote" turned out to be a second, stronger copy of the same rule ("exactly one agent owns it at a time"). `.1` had routed that doc to `.3` and `.4` for unrelated reasons and never flagged its Core Rule, so redrawing `README.md` alone would have left two AI-referenced docs contradicting each other. Surfaced at the 🛠️ gate and closed with a one-sentence carve-out: the rule bounds *ownership*, not every context an owner may consult.

**Shape discipline.** Q1 resolved on [[CORE-387]]'s explicit precedent — *"No new box. Phase 1 already carries eight checklist items"* — so the prompt widened an existing bullet instead of adding a ninth. Phase 1 still has eight boxes; `templates/tasknote-template.md:43` was re-synced in the same motion per [[CORE-183]]'s lockstep requirement. The probe template landed in the `sidequest-template.md` (19-line) mould rather than the `loop-heartbeat-template.md` (120-line) one.

**Constraint honoured.** [[CORE-328.1]] won't-filed "programmatic sub-agent delegation machinery". Nothing here is machinery: no runner, dispatcher, fan-out, scheduler, mandatory field, new skill, or symlink fan-out. The template's closing note says so explicitly, and the probe clause is a judgment prompt — skipping it is always correct for a narrow read set.

**Verification.** `npm --prefix viz test` 18 files / 245 tests passed; zero trailing whitespace across 7 touched files; SPEC↔template bullet clause verified identical; all four references to the new template resolve; 6/6 wikilinked archives exist. Doc-drift sweep: 2 updated, 10 no change (`SECURITY.md` and `docs/AGENT-NEUTRALITY.md` checked deliberately, both correctly unchanged). Downstream-impact reconciliation: no impact — `.3` and `.4` scopes intact.

**Maintainability effect.** Six files, +37/-8 lines plus one 68-line template. The contract now has vocabulary for the isolation pattern (`probe` / `delegate`), which is the precondition for `.4`'s GLOSSARY and CAPABILITIES work; and the noisiest part of Discovery has a documented release valve that costs nothing when unused.

**Archived:** 2026-08-06
