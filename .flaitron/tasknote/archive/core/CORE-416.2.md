---
title: tick-through-contract
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-416, CORE-416.1, CORE-393, CORE-381]
---

# CORE-416.2 | tick-through-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-416]]

## 🎯 Goal

Close the tick-through contract silence by declaring `## 🧩 Subtasks` explicitly exempt in `SPEC.md`, and adjudicate the two propagation questions `CORE-416.1` left open (`SPEC/procedures/ft-task.md`, `/ft-micro-task`) against what the repo actually carries at HEAD.

## ✅ Acceptance

- [x] `SPEC.md` §"Acceptance tick-through" declares `## 🧩 Subtasks` exempt from tick-through, with the rationale (working plan vs. contract) stated so a future reader cannot re-open it as a gap
- [x] The `SPEC/procedures/ft-task.md` propagation question is adjudicated with evidence and a recorded verdict — edit made, or "already propagated" documented with the commit that landed it
- [x] The `/ft-micro-task` omission is adjudicated with evidence and a recorded verdict
- [x] Propagation judgment for the *new* exemption sentence recorded — either propagated to the restating surfaces or justified as SPEC-canonical-only
- [x] Downstream-impact reconciliation run against the active PLAN cohort (`CORE-416.3`, `.4`, `.N`) and the confirmed edits applied
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Read `SPEC.md` §"Acceptance tick-through" + §"Tasknote body shape" 🧩 Subtasks bullet
- [x] Survey tick-through propagation across every restating surface at HEAD
- [x] Verify the `/ft-micro-task` omission against `templates/tasknote-micro-template.md`
- [x] Measure the drift against the rule's actual effective date (CORE-393 landing)
- [x] Draft + apply the `SPEC.md` Subtasks-exempt paragraph
- [x] Decide and record whether the exemption needs propagating beyond `SPEC.md`
- [x] Run the downstream-impact reconciliation scan for `.3` / `.4`; apply confirmed edits
- [x] Phase 4: doc-drift sweep, flip `.2` PLAN line to stub form (nested), archive

## 🔗 Related

- [[CORE-EPIC-416]] — parent epic (closure-artifact-fidelity)
- [[CORE-416.1]] — the Discovery that filed this child; two of its three premises are corrected here
- [[CORE-393]] — `phase4-closure-hygiene`: created the tick-through obligation on 2026-08-01, and propagated it to the SOP in the same commit
- [[CORE-381]] — `phase4-status-flip`: the 359-file backfill precedent, which reached a *lifecycle* field, not body checkboxes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `## Medium`, nested under the active `CORE-EPIC-416`, unchecked, `[heavy]🧠`.

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The task's first goal — declaring `## 🧩 Subtasks` exempt — is real, load-bearing, and already operator-decided in `CORE-416.1`; it survives untouched. Its second goal is **falsified at HEAD**: `SPEC/procedures/ft-task.md` has carried the tick-through obligation since `3a86452` (2026-08-01 23:32), the very CORE-393 commit that created the rule. There is no propagation gap to close. Its third goal resolves to a confirmation, not an edit. Re-scoping rather than de-scoping because the surviving SPEC edit is the epic's actual contract deliverable, and because the falsified premise propagates to two sibling children that have not run yet.

- [x] Read relevant source files — `SPEC.md` §"Acceptance tick-through" (`:637-645`), §"🚀 Phase 4: Closure" (`:610`), §"Tasknote body shape" (`:361`), §"Tasknote frontmatter" write-once (`:272-292`); `SPEC/procedures/ft-task.md` (`:260-285`); `claude/skills/ft-micro-task/SKILL.md`; `templates/tasknote-micro-template.md`; `templates/tasknote-template.md`; `SPEC/epic.md`; archived `CORE-416.1`, `CORE-381`, `CORE-389.3`, `CORE-405`, `TEST-003`, `CORE-255`.

- [x] **Best Practices Review** — the touched responsibility is contract text, single-owner by design: `SPEC.md` is canonical and every other surface restates or routes to it. The exemption is written into the canonical section only, so the restatements stay derivative rather than acquiring their own copy of the rule (the duplication that produced the CORE-042.4 → CORE-042.5 → CORE-393 misreading chain). No code path touched.

- [x] **Archive skim** — `grep -l` across `.flowtron/tasknote/archive/core/` for the cited paths. Load-bearing hits: `CORE-393` (created the obligation *and* propagated it to the SOP in one commit — the fact that falsifies this task's second premise), `CORE-381` (the backfill precedent, but of a *lifecycle* field), `CORE-042.4` / `CORE-042.5` (the nav-chip misreading chain that motivates keeping the rule single-sourced), `CORE-416.1` (this task's filing).

- [x] **Drift check** — **drift found, and it is this task's central finding.** `CORE-416.1`'s Discovery Notes assert a propagation gap at `SPEC/procedures/ft-task.md` and state it is "present at HEAD". It is not, and was not on the day `.1` was written. See Discovery Notes below.

- [x] Asked clarifying questions — deferred to the 🛠️ gate below rather than AskUserQuestion, because the questions are not scoping ambiguities but a reconciliation proposal that needs the evidence in front of it.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Finding 1 — the propagation gap does not exist

`SPEC/procedures/ft-task.md:263-265` reads:

> Tick every `## ✅ Acceptance` criterion the work satisfied and annotate any it did not (`N/A` / not-met with a one-line reason) — never leave a box silently unticked.

`git blame` dates those exact lines to `3a86452` (2026-08-01) — **the CORE-393 commit that created the obligation in the first place**. The rule and its SOP propagation landed together; there was never a window in which the SOP lacked it.

Full propagation survey at HEAD — every surface that restates closure carries the obligation:

| Surface | Carries tick-through? |
|---|---|
| `SPEC.md` (canonical) | ✅ `:610`, `:637` |
| `SPEC/procedures/ft-task.md` (agent-neutral SOP) | ✅ `:263-265` |
| `templates/tasknote-template.md` | ✅ `:93` |
| `claude/skills/ft-task/SKILL.md` | ✅ `:153` |
| `claude/skills/ft-goal-task/SKILL.md` | ✅ `:160` |
| `claude/skills/ft-close-epic/SKILL.md` | ✅ `:153` |
| `claude/skills/ft-epic-discovery/SKILL.md` | ✅ `:227` |

Propagation is **complete**. `.1` called this "the most plausible mechanism behind the drift and the highest-value single fix" — that rationale is void.

### Finding 2 — the drift is overwhelmingly pre-rule, not live

`.1` measured 322 of 615 archived notes (52%) carrying unticked `## ✅ Acceptance` boxes, and characterized the drift as live using a **2026-07-01** cutoff (57 of 154, 37%). But the obligation did not exist until **2026-08-01**. Notes archived before that date were never governed by it.

Re-measured against the rule's actual effective date:

| Window | Notes archived | With unticked Acceptance |
|---|---|---|
| All time | 615 | 322 (52%) |
| On/after 2026-08-01 (rule in force) | 45 | **4** |

And the 4 do not survive inspection as violations:

- **`CORE-389.3`** — archived 2026-08-01 at **21:24**; CORE-393 landed at **23:32** the same day. Closed ~2 hours before the rule existed. Not a violation.
- **`CORE-255`** — `**Archived:** YYYY-MM-DD`, placeholder never filled; `created: 2026-06-01`. Predates the rule by two months. (Its unfilled Archived stamp is a separate, real defect — but not this one.)
- **`CORE-405`** — genuine post-rule instance. Its 3 unticked boxes are the release steps (*commit lands / tag created / tag pushed*), which describe the very commit being prepared and so cannot be ticked at tick-time. A real instance of the *annotation* obligation, not of a missed outcome.
- **`TEST-003`** — genuine post-rule instance, 5 unticked boxes.

**Post-rule compliance is 43/45 (96%)**, and both exceptions land in the annotation escape hatch rather than representing unnoticed work. The systemic-live-drift premise does not hold.

### Finding 3 — `/ft-micro-task`'s omission is legitimate

`templates/tasknote-micro-template.md` ships exactly three body sections — `## 🎯 Goal`, `## ⚡ Notes`, `## ✅ Recap`. There is **no `## ✅ Acceptance` block**, so there is nothing for a tick-through obligation to govern. `SPEC/tasknote-selection.md:86` states the micro carve-out's rationale directly: the shape is chosen precisely when "Acceptance/Subtasks checklists would just restate the goal". Confirmed legitimate; no edit.

### Finding 4 — the exemption does not need propagating

Every restating surface in the Finding 1 table already scopes its sentence to `## ✅ Acceptance` by name. None of them mentions Subtasks, so none of them currently *claims* a Subtasks obligation. Declaring the exemption in `SPEC.md` therefore makes explicit what the restatements already imply, and adding the exemption to seven surfaces would duplicate a rule whose single-sourcing is exactly what the CORE-042.4 → CORE-042.5 → CORE-393 misreading chain argues for. **SPEC-canonical only.**

### Finding 5 — downstream impact on `.4` (backfill)

`SPEC.md:272-276` (write-once):

> Archived tasknotes are historical records — **not retroactively edited when the spec evolves**. Frontmatter and body conventions apply to **new tasknotes only**; legacy archives stay as-is.

`CORE-416.4` proposes editing 322 archived notes' **body checkboxes** to satisfy a rule that post-dates them. That is the precise action write-once forbids. The `CORE-381` precedent `.1` cited does not transfer: CORE-381 backfilled YAML `status:`, a **lifecycle** field the very next paragraph (`:285-292`) explicitly carves *out* of write-once. Body checkboxes have no such carve-out.

Combined with Finding 2 — only 2 genuine post-rule instances exist — `.4`'s 322-note target is both contra-contract and unmotivated. This reaches beyond the current task, so it goes to the reconciliation scan rather than being decided here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing shape of §"🚀 Phase 4: Closure": a bold-lead paragraph stating the rule, then its rationale, appended directly after the `**Acceptance tick-through.**` paragraph it scopes. Matches the section's established `**Lead.** Rule + why` cadence (`**Paper-complete guard (Phase 4).**`, `**Write-once does not cover lifecycle writes.**`). No new shape introduced.

- [x] **Minimal refactor gate** — no refactor. Two additive paragraphs plus one bullet clause; nothing restructured, nothing deleted.

- [x] Implemented the minimal solution — `SPEC.md` +13/-1; `.flowtron/PLAN.md` +3/-3.

- [x] Updated/added tests for non-trivial behavior — N/A (contract prose; flowtron ships no validators by `docs/CONVENTIONS.md` §Declines).

**Implementation Notes:**

**`SPEC.md` — two edits, both additive.**

1. §"🚀 Phase 4: Closure" (`:647`) — new `**`## 🧩 Subtasks` is exempt.**` paragraph after `**Acceptance tick-through.**`. States the exemption, gives the working-plan-vs-contract rationale, and closes with the reason it is written down at all: so the silence cannot be re-read later as an implied obligation. The last clause also records Finding 4's propagation verdict inline, so a future reader does not re-derive it.
2. §"Tasknote body shape" (`:363`) — one clause on the 🧩 Subtasks bullet pointing to the Phase 4 section. This is the *definitional* home of the section, so it is where a reader asking "must I tick these?" lands first. Given this file's own history — CORE-042.4 → CORE-042.5 → CORE-393, three misreadings that all began at a bullet rather than the rule — the pointer is worth its two lines.

**Verdicts recorded rather than edits made:**

- **`SPEC/procedures/ft-task.md` — no edit. Already propagated.** `git blame` puts `:263-265` at `3a86452` (2026-08-01 23:32), the CORE-393 commit that created the obligation. The premise was falsified, not unaddressed.
- **`/ft-micro-task` — no edit. Omission legitimate.** `templates/tasknote-micro-template.md` ships `## 🎯 Goal` / `## ⚡ Notes` / `## ✅ Recap` and no `## ✅ Acceptance` block, so there is nothing to govern. `SPEC/tasknote-selection.md:86` states the rationale independently.
- **Exemption not propagated beyond `SPEC.md`.** All seven restating surfaces already scope their sentence to `## ✅ Acceptance` by name, so none currently claims a Subtasks obligation. Copying the exemption to seven files would duplicate a rule whose single-sourcing is the lesson of the misreading chain above.

**Downstream-impact reconciliation scan.** Findings 2 and 5 changed the epic's premise beyond this task, so the scan ran against the active PLAN cohort. Classified: `CORE-416.3` **stale** (its rationale assumed 322 unnoticed notes), `CORE-416.4` **contradictory** (contra `SPEC.md:272` write-once), `CORE-EPIC-416` **stale** (falsified drift framing), `CORE-416.N` **unaffected**. All three edits confirmed by the operator via AskUserQuestion and applied:

- **Parent** — description rewritten to the measured reality (43/45 post-rule compliance; the 322 predate the obligation). The archived `CORE-416.1` was deliberately **not** amended — write-once — so this note and the parent line carry the correction.
- **`.3`** — indicator scoped to notes archived on/after 2026-08-01, so ~320 pre-rule notes are not false-flagged. Model tag unchanged (`[medium]🧩`).
- **`.4`** — **deleted.** Initially retargeted from 322 notes to the 2 genuine post-rule instances, then dropped outright on the operator's call mid-execution: with 43-of-45 compliance there is no defect worth a child task, and annotating two notes is ceremony rather than work. The epic keeps `.3`; `.N` is unaffected.

**Why deleting `.4` is the right call, not just the cheap one.** The two survivors do not describe missed work. `CORE-405`'s three boxes are *commit lands / tag created / tag pushed* — unfinishable at tick-time by construction, since they describe the very commit being prepared. `TEST-003`'s are the same shape. Both are artifacts of writing Acceptance criteria that outrun the tasknote's own lifetime, which the annotation escape hatch exists to absorb — not evidence of a closure that skipped its contract. Filing a child to hand-edit two archived notes would trade real reader value for a tidier grep result.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown contract prose; no executable surface touched).

- [x] Ran lint/type-check on changed code — N/A (markdown); structural verification recorded in Testing Notes.

- [x] **Quality assertions** — no duplication introduced (the exemption is stated once, in `SPEC.md`, with one cross-reference rather than a second copy); no dead or unexplained text; no public-surface growth (no new field, box, phase, or gate); no stale code-facing docs (the doc-drift sweep found the restating surfaces already correctly Acceptance-scoped).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; `viz/` untouched, and the viz work is `CORE-416.3`).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown structural pass on both changed files:

- `SPEC.md` — new paragraph sits inside §"🚀 Phase 4: Closure", after `**Acceptance tick-through.**` and before the `> **No nav-header chip flip here.**` blockquote; blank-line separation correct on both sides, so the blockquote is not absorbed. Inline code spans balanced (`` `## 🧩 Subtasks` ``, `` `## ✅ Acceptance` ``). Body-shape bullet's added clause preserves the 2-space continuation indent. `grep -c ' $'` → 0 trailing whitespace.
- `.flowtron/PLAN.md` — 2-space child indent verified on all remaining nested rows; bold `**CORE-416.x**` IDs intact; `[model]` tag present on every line; children still ordered `.1` → `.2` → `.3` → terminal `.N` after `.4`'s removal, with no blank line left behind. Word counts: parent 41w, `.3` 39w — both under the 50w target.
- Re-measurement is reproducible: the 615-note scan and the 45-note post-rule window were computed by script over `.flowtron/tasknote/archive/**/*.md`, parsing each note's `## ✅ Acceptance` block and `**Archived:**` stamp; the four hits were then read individually rather than trusted from the count.

`git diff --stat` final: `SPEC.md` +13/-1, `.flowtron/PLAN.md` +2/-4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs": `SPEC.md` — **updated** (this task's deliverable). `README.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — **no change**; none restates the tick-through rule, and the surfaces that do (SOP, template, four skills) are outside the cold-start sweep and already correctly Acceptance-scoped per Finding 4.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-416` in `## Medium` per SPEC/epic.md §"Child placement invariant", tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip: 2 markdown files; no frontend, code, or privileged surface)

**Final Summary:**

Declared `## 🧩 Subtasks` exempt from the Phase 4 Acceptance tick-through, closing a real contract silence — and, in the process, falsified two of the three premises this child was filed on, which reshaped the rest of the epic.

**The contract fix.** `SPEC.md` §"🚀 Phase 4: Closure" now states the exemption with its rationale (Subtasks are a working plan that legitimately churns; Acceptance is the contract), and the §"Tasknote body shape" 🧩 bullet carries a one-clause pointer to it. Single-sourced deliberately: this file's own history — CORE-042.4 → CORE-042.5 → CORE-393 — is three successive misreadings that each began at a restating bullet, so the rule is stated once and referenced, not copied.

**Premise two was false.** `CORE-416.1` identified a propagation gap at `SPEC/procedures/ft-task.md` — the agent-neutral SOP — and called it "the most plausible mechanism behind the drift and the highest-value single fix." `git blame` puts that text at `3a86452`, **the CORE-393 commit that created the obligation**. The rule and its SOP propagation shipped together; the gap never existed. A HEAD survey confirmed all seven restating surfaces carry it.

**Premise three was a confirmation.** `/ft-micro-task`'s omission is legitimate — the micro template ships no `## ✅ Acceptance` block, so there is nothing to govern.

**The headline number was measured against the wrong date.** `.1` reported 322 of 615 archived notes (52%) with unticked Acceptance and called the drift live using a 2026-07-01 cutoff. The obligation did not exist until 2026-08-01. Re-measured against the rule's actual effective date: **43 of 45 post-rule notes comply**. Of the four apparent misses, `CORE-389.3` closed two hours *before* the rule commit and `CORE-255` predates it by two months; the two real ones (`CORE-405`, `TEST-003`) are release-step criteria that cannot be ticked before the commit they describe exists — exactly what the annotation escape hatch absorbs.

**Epic reconciled** (operator-confirmed): parent description rewritten to the measured reality; `.3` scoped to notes archived on/after 2026-08-01 so ~320 pre-rule notes are not false-flagged; `.4` (the 322-note backfill) **deleted** — it was contra `SPEC.md:272` write-once, and at 43/45 compliance there was no defect left to backfill. The archived `.1` was deliberately not amended, per the same write-once policy; this note and the parent line carry the correction for the `.N` audit to read.

**Maintainability effect.** A silence that could be re-litigated indefinitely is now an explicit, reasoned exemption, and the epic lost a child that would have hand-edited 322 historical records against its own contract. Net: `SPEC.md` +13/-1, `PLAN.md` +2/-4, one fewer task to run.

**Archived:** 2026-08-08
