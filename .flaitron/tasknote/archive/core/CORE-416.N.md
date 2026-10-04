---
title: closure-artifact-fidelity audit
status: completed
tags: []
created: 2026-08-08
related-tasks: [CORE-EPIC-416, CORE-416.1, CORE-416.2, CORE-416.3]
---

# CORE-416.N | closure-artifact-fidelity audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-416]]

> **⚠️ Superseded by [[CORE-418]]** — Finding 1's premise is false: `/ft-close-epic:154` has specified `| <shortname> audit` since 2026-05-17, two months before the earliest bare row, so the instruction was never missing (it was ambiguous). The defect also spans ~28 rows across both `.1` and `.N`, not the six `.N` rows reported.

## 🎯 Goal

Verify the completed `CORE-EPIC-416` (`closure-artifact-fidelity`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-416.N — audit CORE-EPIC-416` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-416.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-416.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-416` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-416.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-416]] — parent epic (closure-artifact-fidelity)
- [[CORE-416.1]] — epic Discovery; filed `.2`/`.3`/`.4`. **Its headline finding — 322 of 615 archived notes carrying unticked Acceptance, characterized as live drift — was falsified by [[CORE-416.2]]**; `.1` carries no forward pointer to that correction (see Finding 2)
- [[CORE-416.2]] — tick-through-contract; declared `## 🧩 Subtasks` exempt in `SPEC.md`, falsified two of `.1`'s three premises, deleted `.4`
- [[CORE-416.3]] — viz-closure-drift-surface; ⚠️ chip on post-2026-08-01 notes with unticked, unannotated Acceptance

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `## Medium`, nested under the active `CORE-EPIC-416`, unchecked, `[heavy]🧠`. Cohort is `.1` / `.2` / `.3` all `[x]`; `.4` was deleted mid-epic by `.2` rather than closed, so no gap-filling child is missing.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic` and pre-flight passed — all three implementation children closed, no open siblings, no early-audit bypass. The audit has real surface to check: this cohort is unusual in that its own second child falsified the Discovery that filed it, so the coherence question ("do these deliverables agree with each other?") is live rather than pro forma.

- [x] Read relevant source files — archived `CORE-416.1`, `CORE-416.2`, `CORE-416.3`; `SPEC.md` §"🚀 Phase 4: Closure" (`:634-658`), §"Tasknote body shape" (`:361-364`); `SPEC/tasknote-selection.md` §"`## Completed` archive convention" (`:135-165`); `SPEC/epic.md`; `viz/src/tasknote.ts` (`:180-220`), `viz/src/tasknote-parse.ts`, `viz/src/ui/ClosureDriftChip.tsx`, `viz/src/ui/{TaskRowInner,SubtaskRow}.tsx`, `viz/src/archiveCache.ts`; `.flowtron/tasknote/README.md` §"AI-referenced docs"; `claude/skills/ft-release/SKILL.md` §7.1; `claude/skills/ft-epic-discovery/SKILL.md` (`:84`).

- [x] **Best Practices Review** — N/A for module boundaries; the audit is a verification pass, and the single inline fix (Finding 1) is a PLAN.md text substitution on a line this closure rewrites anyway. No code path touched.

- [x] **Archive skim** — self-referential for the cohort itself. Beyond it, checked the archived `.N` rows of the four preceding epics (`CORE-415.N`, `CORE-410.N`, `CORE-408.N`, `CORE-362.N`) for the `.N` PLAN-line shortname convention — the comparison that produced Finding 1.

- [x] **Drift check** — every path cited in the cohort's notes still resolves at HEAD: `SPEC.md`'s exemption paragraph is present at `:648`, the body-shape pointer at `:363`, and all four viz surfaces (`TICK_THROUGH_EFFECTIVE`, `extractArchivedDate`, `closureDrift`, `ClosureDriftChip`) exist and are wired into both row shapes. No cohort claim has gone stale since closure.

- [x] Asked clarifying questions — **No clarifications needed.** Assumption recorded: the audit does not re-open `.2`'s operator-confirmed decisions (Subtasks-exempt, `.4` deleted, landing-day excluded). Its job is to check the cohort's coherence as shipped, not to re-litigate settled calls.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Shortname | Deliverable at HEAD |
|---|---|---|
| `.1` | `closure-artifact-fidelity discovery` | PLAN.md filing only — three child lines (`.2`/`.3`/`.4`), `.N` confirmed as-filed. No code or contract edit. |
| `.2` | `tick-through-contract` | `SPEC.md` +13/-1 — the `**`## 🧩 Subtasks` is exempt.**` paragraph (`:648-657`) and a one-clause pointer on the body-shape bullet (`:363`). Plus three PLAN reconciliation edits: parent description rewritten, `.3` re-scoped, `.4` deleted. |
| `.3` | `viz-closure-drift-surface` | `viz/src` +171/-2 across 6 files + `ClosureDriftChip.tsx` (11 lines, new); 12 new unit tests. |

**Shape of the cohort.** `.1` scoped from a measurement that `.2` then re-measured and overturned; `.3` shipped the one deliverable that survived the reconciliation. The epic ends smaller than it was filed — 3 children instead of 4 — which is the correct outcome, but it means the audit's coherence question is mostly about whether the *record* of that correction is durable.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A. No new code surface; the audit is a verification pass over existing cohort deliverables. The single inline fix follows the established `.N` PLAN-line shape used by `CORE-415.N` / `CORE-410.N` / `CORE-408.N`.

- [x] **Minimal refactor gate** — no refactor. One PLAN.md text substitution (Finding 1), on the line this closure rewrites regardless.

- [x] Implemented the minimal solution — audit verification complete; findings below. One inline fix applied, three follow-up candidates logged.

- [x] Updated/added tests for non-trivial behavior — N/A (no code changed). The existing suite was run as a regression check; see Testing Notes.

**Implementation Notes:**

### Coherence: the cohort agrees with itself

Naming and style parity hold. All three shortnames are kebab-case and match their tasknote titles and H1s; each child's `🔗 Related` block links the parent plus the siblings it actually depends on; the forward chain `.1 → .2 → .3` is correctly ordered, with `.3` citing `.2`'s re-measurement as its own scoping basis. No contradictory cross-refs: `.3`'s PLAN line, its tasknote, and its constant comment all state the same cutoff rule, and none of the three notes restates the tick-through obligation in a way that competes with `SPEC.md`.

The contract edit is genuinely single-sourced. `SPEC.md:648` is the only place the Subtasks exemption is stated; `:363` points to it rather than copying it — which is what `.2` argued for on the strength of this file's own CORE-042.4 → CORE-042.5 → CORE-393 misreading chain. Grepping the 13 other cold-start docs found no competing restatement.

### Finding 1 — `.N` PLAN shortname is a placeholder (inline fix applied)

`/ft-epic-discovery` files the audit child as `| audit` (`claude/skills/ft-epic-discovery/SKILL.md:84`), and nothing in `/ft-close-epic`'s Phase 4 tells the closer to replace that placeholder with the epic's shortname. The result is split across the archive:

| Form | Rows |
|---|---|
| `\| <shortname> audit` | `CORE-415.N`, `CORE-410.N`, `CORE-408.N`, `CORE-362.N`, `CORE-359.N`, `TEST-002.N` |
| bare `\| audit` | `CORE-389.N`, `CORE-353.N`, `CORE-352.N`, `CORE-351.N`, `CORE-349.N`, `TEST-001.N` |

`SPEC/tasknote-selection.md:145-147` makes `| shortname` **required** precisely "so visualizers have a row title" — and six `## Completed` rows currently render as an untitled "audit". The recent six got the full form only because the closing agent happened to match the tasknote title.

**Fixed inline:** this closure flips `CORE-416.N` to `| closure-artifact-fidelity audit`, matching the tasknote title and the four preceding epics. The *skill* gap that regenerates the placeholder is a follow-up candidate, not an audit-time edit — and the six legacy rows stay as they are (`SPEC.md:272` write-once).

### Finding 2 — the correction of `.1` loses its last forward pointer at parent-flip

`.2` overturned `.1`'s central measurement: the 322-of-615 headline was computed against a 2026-07-01 cutoff when the obligation did not exist until 2026-08-01, and post-rule compliance is 43/45. `.2` deliberately did **not** amend the archived `.1` (write-once), recording instead: *"this note and the parent line carry the correction."*

Both halves of that mitigation are weaker than they read:

- **The parent line is about to lose it.** `SPEC/tasknote-selection.md:143` — *"The long description drops"* at stub-form flip. The parent-flip in this very closure deletes the rewritten description that carries the corrected framing.
- **`.1` has no forward pointer.** Its `related-tasks:` is `[CORE-EPIC-416, CORE-415.N, CORE-381, CORE-393]` — filed before `.2` existed, and never updated. A reader who opens `CORE-416.1` cold gets the 322-note framing with no in-file signal that it was falsified.

What survives is `.2`'s own note (permanent, and correct) — but only for a reader who already knows to look there. This audit note narrows the gap by naming the correction in its `🔗 Related` block, so the cohort's terminal artifact carries it. The general problem stands: **flowtron has no contract-sanctioned way to mark a claim in an archived note as superseded.** Write-once forbids retroactive edits when the spec evolves, but is silent on factual corrections, so agents route around it ad hoc. Follow-up candidate.

### Finding 3 — `.3`'s detection surface has a silent blind spot

`.3`'s coverage claim is that the surface flags exactly `CORE-405` and `TEST-003` "and nothing else." Re-verified at HEAD across 617 notes — it holds. But the claim is silently scoped to notes viz can **parse**.

`viz/src/archiveCache.ts:19-30` catches every `parseTasknote` failure and returns `null`, deliberately and with a documented rationale (legacy notes with malformed YAML are historical records under write-once; per-file warnings would be noise). A probe running the real parser over the live archive found two such notes:

- **`CORE-030`** — `title: "blocked" workflow phase`; a quoted scalar followed by more text is invalid YAML.
- **`CORE-075`** — `related-tasks: [[CORE-035]], [[CORE-073]]`; wikilinks inside a YAML flow sequence.

Both are legacy (2026-05-04, 2026-05-10) and pre-rule, so **no actual drift is hidden today**. The structural point is that a note viz cannot parse is invisible to the drift surface *and* to the operator, which is the same silent-miss failure mode this epic exists to eliminate — reintroduced one layer down. A future note with both malformed frontmatter and unticked Acceptance would be doubly invisible. Low probability (the template emits valid YAML), silent by construction. Follow-up candidate; not fixed inline, because the options are editing archived notes against write-once or adding a surfaced-warning path, and both are design decisions rather than audit-time patches.

### Follow-up candidates (file after closure, one at a time)

1. **`.N` shortname placeholder** — teach `/ft-close-epic` Phase 4 to replace `| audit` with `| <shortname> audit` at the flip (or have `/ft-epic-discovery` file the full form). One-line skill fix; keeps `## Completed` rows titled. `[light]🔧`
2. **Superseded-claim mechanism** — decide whether write-once should carve out a corrective pointer (e.g. a `superseded-by:` line or a `> **Corrected by [[ID]]**` callout) so a falsified finding in an archived note is discoverable from that note. Contract question with a real instance behind it. `[heavy]🧠`
3. **Unparseable-archive visibility** — surface the count of notes viz skipped rather than swallowing it silently (a header-rail counter or a one-line dev-console summary), so the drift surface's coverage is honest about what it could not read. `[medium]🧩`

### Inline fix applied

- `.flowtron/PLAN.md` — `CORE-416.N` shortname `| audit` → `| closure-artifact-fidelity audit` (Finding 1), applied as part of the Phase 4 stub-form flip.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the audit changed no code, but the cohort's shipped surface was re-verified as a regression check: `npm --prefix viz run test -- --run` → **18 files, 258 tests, all passing**, matching `.3`'s closing figure exactly.

- [x] Ran lint/type-check on changed code — N/A (the only edit is markdown: PLAN.md + this tasknote).

- [x] **Quality assertions** — N/A (no code changed). The cohort's code was assessed for coherence rather than re-reviewed; see Implementation Notes.

- [x] (frontend) Asked the user for visual confirmation — N/A. No frontend surface changed by this audit; `.3`'s chips were operator-confirmed at `localhost:5120` during that child's Phase 3, and the corpus probe below re-verifies the same two hits headlessly.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Regression check.** 258 tests pass across 18 files — unchanged from `.3`'s closing run, so nothing in the cohort has decayed.

**Corpus re-verification.** A throwaway probe (`viz/src/__probe__/`, deleted after use — verification, not a shipped test, since asserting against the live archive would break on every closure) ran the real `parseTasknote` over all **617** archived notes. Result: closure drift on exactly **`CORE-405` → 3/14** and **`TEST-003` → 5/5**, reproducing `.3`'s 616-note finding with the one note archived since. The probe additionally caught the two unparseable notes behind Finding 3 — `CORE-030` and `CORE-075` — which the app's `archiveCache` swallows silently and which a probe calling `parseTasknote` directly surfaces as thrown exceptions.

**Self-check.** This note is archived 2026-08-08, inside the post-rule window, so it is itself in scope for `.3`'s surface. Its Acceptance block is fully ticked, so it will not flag — the audit passes the rule it audits.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs":

  - `README.md` — **no change**, with two verified sub-checks. (a) The §"Visualizer" paragraph names two row indicators (the *In progress* flag, the version-currency dot) out of roughly six; it is a selective description, not a chip inventory, so omitting `.3`'s ⚠️ chip is consistent rather than stale — adding one of six would be the inconsistency. (b) The closed-task counter reads **606 as of 2026-08-08** while the archive now holds **617**; this lags by design between releases and is owned by `/ft-release` §7.1's "Standing README task-counter check" (`claude/skills/ft-release/SKILL.md:359-366`), which recomputes it from the same `find | wc -l`. Not a closure-time obligation; flagged here so the next cut does not mistake it for settled.
  - `SPEC.md` — **no change by this audit**; updated by `.2` within the cohort (exemption paragraph `:648`, body-shape pointer `:363`), both verified present at HEAD.
  - `docs/MIGRATION.md` — **no change**. Its viz section describes the single-global-instance install model, untouched by a row chip.
  - `claude/AGENTS-snippet.md` — **no change**. Mentions Acceptance only via the `/ft-goal-task` machine-checkable-target sentence; no tick-through restatement to keep in sync.
  - `codex/AGENTS-snippet.md` — **no change**. Wiring commands only.
  - `docs/CONVENTIONS.md` — **no change**. `:66` describes the tasknote's spec-on-top shape (Goal / Acceptance / Subtasks / Related) as an ADR analogue; descriptive, asserts no tick obligation, so the exemption does not reach it. §Declines still holds — the cohort shipped a read-only indicator, not a validator.
  - `CONTRIBUTING.md` — **no change**.
  - `SECURITY.md` — **no change**.
  - `docs/AGENT-NEUTRALITY.md` — **no change**. Its `SPEC/epic.md` row already maps the audit's fixed doc-drift line to the two epic skills; `.2`'s edit landed in `SPEC.md`, whose Claude-specific surfaces are unchanged.
  - `docs/PLATFORMS.md` — **no change**.
  - `claude/CAPABILITIES.md` — **no change**. Last-verified stamp reads `v5.15.0 · 2026-08-02`, current against the repo's `v5.15.0`.
  - `docs/AGENT-COMPAT.md` — **no change**. No cohort deliverable altered any agent's consume-mode, entry-point, or primitive.
  - `docs/EXTERNAL-AGENTS.md` — **no change**. `:11`/`:21` describe Acceptance + Subtasks as handoff payload; the exemption governs closure, not handoff, so the wording stays correct.
  - `docs/WORKTREES.md` — **no change**. `:16` cites Acceptance as copied context; unaffected.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form (with the Finding 1 shortname fix) and kept nested beneath `CORE-EPIC-416` pending the parent-flip decision, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces at the 📦 ready-to-commit gate (parent-flip prompt bundles there per skill Step 8)

**Final Summary:**

Audited the `CORE-EPIC-416` (`closure-artifact-fidelity`) cohort. The three shipped deliverables are coherent and intact at HEAD, the suite is green at 258 tests, and the detection surface `.3` built still flags exactly the two notes it was scoped to. Three findings surfaced — one fixed inline, two worth filing.

**The cohort agrees with itself.** Shortnames, tasknote titles, and H1s match across `.1`/`.2`/`.3`; the `🔗 Related` chain is correctly ordered with `.3` citing `.2`'s re-measurement as its scoping basis; and the Subtasks exemption is stated once in `SPEC.md:648` with a pointer at `:363` rather than a second copy — single-sourcing verified by grepping the 13 other cold-start docs for competing restatements. The epic ended one child smaller than filed, which was the right call.

**Finding 1 — `.N` rows are losing their titles (fixed inline).** `/ft-epic-discovery` files the audit child as `| audit`, and nothing tells the closer to replace that placeholder. Six archived `.N` rows carry the bare form and six carry `| <shortname> audit`, so half the epic audits in `## Completed` render as an untitled "audit" — against `SPEC/tasknote-selection.md:145`, which makes `| shortname` required *so visualizers have a row title*. This closure fixes its own line; the skill gap that regenerates it is filed as a follow-up.

**Finding 2 — the correction of `.1` is about to lose its last forward pointer.** `.2` falsified `.1`'s headline (322 of 615 notes measured against a cutoff a month before the rule existed; true post-rule compliance is 43/45) and, honouring write-once, left `.1` unedited — recording that "this note and the parent line carry the correction." But the stub-form flip in this very closure *deletes the parent's description*, and `.1`'s `related-tasks:` predates `.2` entirely. A reader opening `CORE-416.1` cold gets the falsified framing with no in-file signal. This note names the correction in its Related block as a partial mitigation; the general gap — no contract-sanctioned way to mark an archived claim superseded — is filed as a follow-up.

**Finding 3 — the new detection surface has a silent blind spot.** `.3`'s "exactly two hits, nothing else" holds across 617 notes, but is scoped to notes viz can parse. `archiveCache.ts` swallows parse failures deliberately and silently; two legacy notes (`CORE-030`, `CORE-075`) have malformed YAML frontmatter and are invisible to the drift surface. Both are pre-rule, so nothing is hidden today — but a silent miss inside the surface built to end silent misses is worth a filing.

**Verification.** 258 tests pass (unchanged from `.3`'s close); a throwaway probe ran the real parser over all 617 archived notes and reproduced the two-hit result; documentation verdict: 14 of 14 "no change", with the README task counter noted as release-owned lag (606 → 617 at the next cut) rather than closure-time drift. This note's own Acceptance block is fully ticked, so the audit passes the rule it audits.

**Maintainability effect.** The epic delivered a standing answer to "how would we notice if this drifted again?" and the audit confirms it works — while recording, in the cohort's terminal artifact, the two places the answer stops short: notes the parser can't read, and corrections the archive can't point at.

**Archived:** 2026-08-08
