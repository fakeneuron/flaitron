---
title: superseded-claim-pointer
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-416.N, CORE-416.2, CORE-416.1, CORE-418]
---

# CORE-417 | superseded-claim-pointer

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-416.N]]

## 🎯 Goal

Decide whether flowtron should carve out a contract-sanctioned way to mark a factually falsified claim in an archived tasknote as superseded, and land whatever contract edit that decision implies.

## ✅ Acceptance

- [x] The verdict is recorded with its evidence — warranted or not, and why — so a future reader cannot re-open it as an unexamined gap
- [x] `SPEC.md` §"Tasknote frontmatter" carries a **factual-corrections** carve-out to write-once: the append-only pointer shape, and the three neighbouring cases it explicitly does *not* cover (superseded decision / spec evolution / bulk backfill)
- [x] The PLAN-description reliance failure is closed — a durable correction may not be parked in a long description, stated once with a pointer from the drop site
- [x] The duty has a trigger point in the closure path: `SPEC.md` §"🚀 Phase 4: Closure", `SPEC/procedures/ft-task.md`, `claude/skills/ft-task/SKILL.md`
- [x] Phase 4 box count unchanged at 3 — the trigger is prose, not a fourth checkbox (per `CORE-042.4`'s deliberate reduction, and `CORE-381`'s fold-into-existing-box precedent)
- [x] Both known instances carry the pointer: `CORE-416.1` (falsified by `CORE-416.2`) and `CORE-416.N` (falsified by `CORE-418`), original text untouched in both
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Draft the `SPEC.md` §"Tasknote frontmatter" carve-out paragraph — pointer shape, append-only rule, three-case scope fence
- [x] Add the PLAN-description reliance ban + one-clause pointer at `SPEC/tasknote-selection.md:143` (the drop site)
- [x] Add the conditional trigger to `SPEC.md` §"🚀 Phase 4: Closure" as prose (no new box)
- [x] Propagate the trigger to `SPEC/procedures/ft-task.md` Phase 4 and `claude/skills/ft-task/SKILL.md` Step 5
- [x] Append the pointer to archived `CORE-416.1` → `[[CORE-416.2]]`
- [x] Append the pointer to archived `CORE-416.N` → `[[CORE-418]]`
- [x] Phase 3: markdown structural pass; verify `viz` still parses both edited archives (blockquote sits outside every extracted section)
- [x] Phase 4: doc-drift sweep, flip PLAN line to stub form, archive

## 🔗 Related

- [[CORE-416.N]] — the audit that filed this; its Finding 2 names the gap ("flowtron has no contract-sanctioned way to mark a claim in an archived note as superseded")
- [[CORE-416.2]] — falsified `CORE-416.1`'s headline and recorded that "this note and the parent line carry the correction"; the parent line was then deleted at epic close
- [[CORE-416.1]] — instance #1: carries the falsified 322-of-615 headline with no forward pointer
- [[CORE-418]] — instance #2: falsified `CORE-416.N`'s Finding 1 premise and scope; `CORE-416.N` carries no forward pointer to it

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `## Medium`, unchecked, `[heavy]🧠`, 52w (under the 70w cap).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and re-verified at HEAD, and the evidence base grew between filing and start: a **second** instance landed in the interim. `CORE-418` (committed `a367527`, hours before this tasknote) falsified `CORE-416.N`'s Finding 1 premise — and `CORE-416.N` is archived carrying that premise with no forward pointer, reproducing the exact defect it filed this task to fix. Two instances, both inside 24 hours, both produced by the drift-check discipline working as designed. This is a contract decision with a live failure mode at the precise place SPEC tells agents to look (§"📝 Phase 1: Discovery" → Archive skim), not a speculative tidiness ticket.

- [x] Read relevant source files — `SPEC.md` §"Tasknote frontmatter" write-once (`:272-291`), §"📝 Phase 1: Discovery" (`:482-526`), §"🚀 Phase 4: Closure" (`:608-672`), §"Tasknote body shape" (`:308-431`); `SPEC/tasknote-selection.md` §"`## Completed` archive convention" (`:135-165`); `SPEC/procedures/ft-task.md`; `claude/skills/ft-task/SKILL.md`; `claude/skills/ft-audit/passes/docs.md`; `templates/tasknote-template.md`; `viz/src/tasknote.ts`, `viz/src/tasknote-parse.ts`, `viz/src/ui/RelatedChip.tsx`; archived `CORE-416.1`, `CORE-416.2`, `CORE-416.N`, `CORE-418`, `CORE-381`, `CORE-039`.

- [x] **Best Practices Review** — the touched responsibility is contract text, single-owner by design: `SPEC.md` §"Tasknote frontmatter" is the canonical write-once home (consolidated there deliberately by `CORE-039`, which collapsed three competing copies into one). Any carve-out belongs in that paragraph block, not in a fourth location. No code path touched; no module boundary crossed. The one genuine design tension — a *duty* needs a trigger surface, unlike an *exemption* — is recorded under "Propagation question" below rather than resolved silently.

- [x] **Archive skim** — `grep -l` across `.flowtron/tasknote/archive/core/` for write-once and §"Tasknote frontmatter". Load-bearing hits: **`CORE-381`** (the governing precedent — see below), **`CORE-039`** (consolidated the write-once policy into one canonical paragraph; argues against a fourth copy), `CORE-416.2` (cited write-once to kill the `.4` backfill), `CORE-042.4`/`.5` (the misreading chain that motivates single-sourcing).

- [x] **Drift check** — clean, with one correction to the filed line. `SPEC.md:272-282` carries the write-once text as cited; `SPEC/tasknote-selection.md:143` carries the description-drop rule; `15127e1` is the commit that executed the parent-description deletion. **Drift in the PLAN line's scope:** it names one instance (`CORE-416.2` → `CORE-416.1`). A second landed after filing — `CORE-418` falsified `CORE-416.N`'s Finding 1 — so the evidence base is 2, not 1. Widens the warrant; does not change the deliverable, so this is a premise correction rather than a re-scope.

- [x] Asked clarifying questions — three resolved via AskUserQuestion; see "Resolved scoping" below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### The failure, precisely

An archived tasknote can assert something **factually false about the repo at the time it was written**. Write-once (`SPEC.md:272-282`) forbids retroactively editing archived notes, so the false claim stays in place. The correcting note points **backward** (its `🔗 Related` names the corrected note); the corrected note has no **forward** pointer. Discovery is therefore asymmetric — you find the correction only if you already know it exists.

Every mitigation actually relied on has failed or is structurally guaranteed to:

| Mitigation | Fate |
|---|---|
| Parent PLAN long description (`CORE-416.2`'s stated carrier) | **Deleted by design.** `SPEC/tasknote-selection.md:143` — "The long description drops" at the stub-form flip. `/ft-close-epic` executed exactly that in `15127e1`. |
| The correcting note itself | Permanent and correct, but findable only by a reader who already knows to look there. |
| Corrected note's `related-tasks:` | Written at scaffold, before the correcting task existed. Never updated. |
| Audit note's `🔗 Related` | `CORE-416.N` did this for `.1` — then became instance #2 itself. Pushes the problem one layer out; does not close it. |

### Two confirmed instances, not one

| # | Archived note | Falsified claim | Corrected by | Forward pointer? |
|---|---|---|---|---|
| 1 | `CORE-416.1` | "322 of 615 notes (52%) carry unticked Acceptance… live drift"; "propagation gap at `SPEC/procedures/ft-task.md`… the highest-value single fix" | `CORE-416.2` — measured against a cutoff a month before the rule existed; true post-rule compliance 43/45. The SOP gap never existed (`git blame` → `3a86452`, the commit that *created* the rule). | ❌ none |
| 2 | `CORE-416.N` | Finding 1: "nothing in `/ft-close-epic`'s Phase 4 tells the closer to replace that placeholder"; defect scoped to six `.N` rows | `CORE-418` — `/ft-close-epic:154` has specified `| <shortname> audit` since `adb47d1` (2026-05-17), two months before the earliest bare row; real scope ~28 rows across `.1` **and** `.N`. | ❌ none (`related-tasks: [CORE-416.N, CORE-393]` on `.418`; nothing on `.N`) |

**The rate is rising, not stable.** A repo-wide scan (`falsif|overturn|premise`) returns 13 archived notes, but most falsify a *live* surface — which simply gets edited. The two above are the only cases where the falsified claim sits in an **archived** artifact. Both landed on 2026-08-08. They are a product of the strengthened Phase 1 drift check (`SPEC.md:515-526`) doing its job: the better Discovery gets at re-verifying prior claims, the more archived claims get falsified. Zero instances before the drift check hardened; two on the day it worked twice.

### Who actually gets hurt

`SPEC.md:490` makes the **Archive skim** a mandatory Phase 1 box, and `claude/skills/ft-task/SKILL.md:131` operationalizes it as `grep -l <path> archive/<area>/*.md` → read the hits. That is an agent, mid-Discovery, reading archived prose as authoritative prior-decision evidence. `CORE-416.N` had to re-derive `.1`'s numbers from scratch; a less careful reader re-files on them. `/ft-audit`'s docs pass explicitly **skips** the archive (`claude/skills/ft-audit/passes/docs.md:45`), so no audit surface will ever catch this.

### The distinction the design turns on

Not every "superseded" archived claim is a defect:

- **Superseded decision** — `CORE-159` overturned `CORE-157`'s exclusion of `docs/PLATFORMS.md`. `CORE-157` is still an *accurate record of what was decided then*. Write-once is correct to leave it. **Out of scope.**
- **Spec evolution** — the case write-once names explicitly (`SPEC.md:274`, "not retroactively edited when the spec evolves"). **Out of scope.**
- **Falsified fact** — the note asserted something untrue about the repo *at the time of writing*. `CORE-416.1` and `CORE-416.N`. **This is the only target.**

Write-once's stated scope is convention/spec evolution. A factual correction is orthogonal to it — which is why an append-only carve-out reads as *filling a silence* rather than reversing a rule, the same shape `CORE-416.2` used for the Subtasks exemption.

### Design space

| Option | Shape | Cost | Trade |
|---|---|---|---|
| **A. Append-only callout** | `> **⚠️ Superseded by [[ID]]** — <one line>` under the nav header of the corrected note, written by the falsifying task at its Phase 4 | ~12 lines SPEC + trigger clause | Visible in raw markdown, GitHub, and grep. Preserves the original text verbatim — the false claim stays readable, so the record of *what was believed* is intact. Requires a write-once carve-out. |
| **B. `superseded-by:` frontmatter** | New YAML field on the corrected note | Schema field + viz work to be useful | Machine-parseable; but dead weight until viz renders it, and a raw reader meets it above the H1 rather than at the claim. |
| **C. Decline; forward-duty only** | No archive edit. Correcting task must name the corrected ID in its own `related-tasks:`, plus a clause banning reliance on a PLAN description as a durable carrier | ~4 lines SPEC | Cheapest; write-once stays absolute. Leaves discovery asymmetric — the exact property that produced both instances. |
| **D. A + C** | Callout **and** the PLAN-reliance ban | ~16 lines SPEC | Fixes both the general gap and the specific mechanism that evaporated `CORE-416.2`'s mitigation. |

**Orthogonal sub-finding worth landing regardless of the verdict.** `SPEC/tasknote-selection.md:143` states the long description drops at stub-form flip, but nothing warns an agent against *parking durable information there*. `CORE-416.2` did exactly that in good faith. One clause at the drop site closes it, independent of the callout question.

**Constraint check.** `docs/CONVENTIONS.md` §Declines rules out validators/scripts; every option above is markdown contract prose only. `SPEC.md:857` §"PR archetypes flowtron does not accept" — no new abstraction, no schema validator, no query layer, no runtime. Option B is the only one that grows the frontmatter schema.

### The governing precedent: `CORE-381` already did this

`CORE-381` (`phase4-status-flip`) is the closest prior art, and it settles more than `CORE-416.2` credited it with. Two distinct things happened there:

1. **The lifecycle carve-out** — the closure `status:` flip is a *pre-archive* write, so write-once never reached it. Now `SPEC.md:284-291`.
2. **A 359-file retroactive backfill of already-archived notes.** `CORE-381`'s own Discovery Notes are explicit: *"The 359-file backfill **is** a retroactive edit, and is a deliberate operator decision rather than something the policy permits by default."*

So flowtron has **already** overridden write-once for a factual/data correction, at 359-file scale, on an explicit operator call. What it has never done is *write that permission down* — which is precisely why `CORE-416.2` read write-once as absolute when killing `.4`, and why `CORE-416.N` then found "no contract-sanctioned way" to point at a superseded claim. The gap is not that corrections are forbidden; it is that the escape hatch is undocumented and therefore re-litigated from scratch each time.

(`CORE-416.2`'s framing — that `CORE-381` only touched a field write-once "explicitly carves out" — is imprecise on this point. Its conclusion still holds on independent grounds: at 43/45 compliance there was no defect left to backfill.)

### Propagation question

An *exemption* (`CORE-416.2`) needs stating once, because no surface claims the opposite. A *duty* needs a trigger point, or it is dead prose: the falsifying task must know, at its own Phase 4, to write the pointer. Candidate trigger surfaces: `SPEC.md` §"🚀 Phase 4: Closure", `SPEC/procedures/ft-task.md` (agent-neutral SOP — the surface `CORE-416.1` wrongly accused of a gap), `claude/skills/ft-task/SKILL.md` Step 5. Single-sourcing argues for the fewest; deadness argues for at least the SOP + skill.

### Resolved scoping (AskUserQuestion, 2026-08-08)

| # | Question | Resolution |
|---|---|---|
| 1 | Mechanism | **Option D — append-only callout + PLAN-reliance ban.** A one-line `> **⚠️ Superseded by [[ID]]**` blockquote under the corrected note's nav header, original text untouched, plus the clause closing the mechanism that evaporated `CORE-416.2`'s mitigation. (Rejected: `superseded-by:` frontmatter — grows the schema and stays invisible until viz work lands; decline-and-forward-duty — leaves the asymmetry that produced both instances.) |
| 2 | Dogfood | **Both instances now.** `CORE-416.1` and `CORE-416.N` get pointers in this task's commit. Proves the mechanism on real cases rather than shipping a rule with zero instances, and follows `CORE-381`'s operator-override precedent at 2 files instead of 359. |
| 3 | Trigger surfaces | **`SPEC.md` + `SPEC/procedures/ft-task.md` + `claude/skills/ft-task/SKILL.md`.** A duty needs a firing point, unlike `CORE-416.2`'s exemption. (Rejected: SPEC-only — likely dead prose; all seven closure surfaces — duplicates a rule across files against this repo's own misreading history.) |

**Verdict: warranted.** Two instances in 619 notes is a thin base in isolation, but three facts carry it. The rate is *rising* — both landed the day the hardened drift check started falsifying prior claims, and there were none before. The harm lands at a **mandatory** Phase 1 box (`SPEC.md:490` Archive skim) that instructs agents to read archived prose as authoritative prior-decision evidence, and no `/ft-audit` surface will ever catch it (`claude/skills/ft-audit/passes/docs.md:45` skips the archive by design). And the permission already exists in practice — `CORE-381` overrode write-once at 359-file scale — it is simply undocumented, which is why it gets re-litigated from scratch every time.

**Explicit assumptions.** (a) The callout is written by the *falsifying* task at its own Phase 4, never by a third party tidying the archive later. (b) `related-tasks:` on the corrected note is deliberately **not** updated — the wikilink in the callout already carries the edge, and a second retroactive write buys nothing. (c) No viz work: the blockquote sits above `## 🎯 Goal` and outside every section `extractSection` reads, so no parser change is needed for the archives to keep rendering. A viz chip is a possible future filing, not this task.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed §"Tasknote frontmatter"'s established `**Bold lead.** Rule + rationale` cadence, appending the new carve-out as a *third* paragraph directly after `**Write-once does not cover lifecycle writes.**`. That paragraph is the exact precedent: same section, same shape, same job (naming what the policy does not reach). The Phase 4 trigger follows §"🚀 Phase 4: Closure"'s conditional-prose pattern rather than adding a box — matching `CORE-381`, which folded its closure write into the existing `Closed —` box for the same reason.

- [x] **Minimal refactor gate** — no refactor. Four additive contract insertions, one clause extension at the drop site, two append-only archive lines. Nothing restructured, nothing deleted; `git diff --stat` shows 65 insertions against 4 deletions, and all 4 are the re-flowed sentence at `SPEC/tasknote-selection.md:143`.

- [x] Implemented the minimal solution — 6 files, +65/-4.

- [x] Updated/added tests for non-trivial behavior — N/A as shipped tests (contract prose; `docs/CONVENTIONS.md` §Declines rules out validators). A throwaway probe verified the two edited archives against the real parser; see Testing Notes.

**Implementation Notes:**

**The verdict, and why it is not just "yes".** The permission this task was asked to invent already exists in practice — `CORE-381` overrode write-once to backfill 359 archived notes and recorded it as *"a deliberate operator decision rather than something the policy permits by default."* What was missing is that nobody wrote it down. So `CORE-416.2` read write-once as absolute when killing `.4`, and `CORE-416.N` then reported "no contract-sanctioned way" to mark a superseded claim. The fix is therefore **documenting an existing escape hatch with a narrow shape and a hard fence**, not opening a new one.

**Contract layer — `SPEC.md` +49/-0.**

1. §"Tasknote frontmatter" (`:293`) — new `**Write-once does not cover factual corrections.**` block. Carries the pointer shape in a fenced example, the append-only rule ("a historical record that quietly agrees with the present is not a record"), the authorship rule (the *falsifying* task writes it, at its own Phase 4, in the same atomic commit), and an explicit three-case fence: **superseded decision** (CORE-159/CORE-157 — decisions changing is the system working), **spec evolution** (the case the policy opens with), **bulk backfill** (still an operator call; CORE-381 named as precedent-and-limit). Closes with the PLAN-description ban and the CORE-416.2 → CORE-416.1 story as its motivating instance.
2. §"🚀 Phase 4: Closure" (`:697`) — `**Superseded-claim pointer (conditional).**` trigger paragraph, placed after the Subtasks-exempt paragraph and before the nav-chip blockquote. States explicitly that it is *the trigger, not a second copy of the contract*, and that it rides the existing `Closed —` box.

**Drop-site clause — `SPEC/tasknote-selection.md` +4/-2.** One sentence at `:144`, where the description-drop rule lives: *"So never park anything durable there… deleted on a schedule."* This is the definitional home a reader asking "can I leave a note here?" actually lands on, and it points back to the canonical rule rather than restating it — the same pointer-not-copy shape `CORE-416.2` used on the body-shape bullet.

**Trigger propagation — 2 files.** `SPEC/procedures/ft-task.md` (`:269`, +7/-1) so a contract-only agent working from the SOP alone encounters the duty, and `claude/skills/ft-task/SKILL.md` (`:153`, +1/-1). Both are trigger-shaped and route to `SPEC.md` for the contract, so the rule is stated once and fired from three places. `last-verified:` on the SOP already reads `v5.15.0 · 2026-08-08` — this commit *is* the sync event it stamps, at the same version and date, so no bump applies.

**Dogfood — 2 archives, +2/-0 each.** Append-only is verifiable from the diffstat itself: zero deletions in either file.

- `CORE-416.1` → `[[CORE-416.2]]`: the 322-of-615 headline was measured against a cutoff a month before the rule existed; post-rule compliance 43/45; the SOP propagation gap never existed.
- `CORE-416.N` → `[[CORE-418]]`: Finding 1's premise is false (`/ft-close-epic:154` specified the shortname form two months before the earliest bare row); real scope ~28 rows across `.1` and `.N`, not six.

**Deliberately not done.** No `superseded-by:` frontmatter field (operator-rejected: grows the schema, invisible until viz work lands). No update to either corrected note's `related-tasks:` — the wikilink carries the edge and a second retroactive write buys nothing. No viz chip; the blockquote is invisible to every `extractSection` call, so nothing needed changing, and surfacing it is a possible future filing rather than this task's scope. No sweep of the other 11 notes using falsification language — all of them falsify *live* surfaces, which simply get edited.

**Downstream-impact reconciliation scan: no impact.** `## High`, `## Low`, and `## Future Opportunities` are empty; `## Medium` held only `CORE-417` itself. No active entry shares a surface with this decision, so no entry was read against, edited, or nested.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test -- --run` → **18 files, 258 tests, all passing**, unchanged from `CORE-416.N`'s closing figure. Plus a throwaway probe against the two edited archives; see below.

- [x] Ran lint/type-check on changed code — N/A (markdown only; no TypeScript touched). Markdown structural pass recorded below.

- [x] **Quality assertions** — no avoidable duplication: the contract is stated once in `SPEC.md` §"Tasknote frontmatter" and the three other surfaces are triggers that route to it rather than copies (the failure mode `CORE-042.4` → `.5` → `CORE-393` demonstrates on this exact file). No dead text — every paragraph added has a named firing point. No public-surface growth: no new frontmatter field, no new checkbox, no new phase, no new gate, Phase 4 still 3 boxes. No stale code-facing docs — the sweep found the two write-once references outside SPEC both still accurate.

- [x] (frontend) Asked the user for visual confirmation — N/A. No frontend surface changed; `viz/` is untouched (`git diff --stat` shows zero files under `viz/`), and the probe below verifies the archive-render path headlessly.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**The one thing worth actually running.** The risk this change carries is not in the prose — it is that inserting a blockquote between the nav header and `## 🎯 Goal` could corrupt how `viz` reads 619 archived notes. Reading `extractSection` (`viz/src/tasknote.ts:114-132`) says it cannot: the function only collects lines *after* a matching `##` heading, and the blockquote precedes every heading. But reasoning about a parser is not running it, so a throwaway probe (`viz/src/__probe__/`, deleted after use — asserting against live archives would break on every future closure, per `CORE-416.N`'s precedent) ran the real `parseTasknote` over both edited files. Both pass:

- `frontmatter.status` → `completed`; `phases[3].total` > 0 — frontmatter and phase parsing unaffected.
- `goal` non-empty and **does not** contain `Superseded by` — the pointer leaks into no extracted section.
- `acceptance` likewise clean; `closureDrift` → `null` (both notes have fully ticked Acceptance, so neither newly trips `CORE-416.3`'s ⚠️ chip).
- `body` contains the expected wikilink — the pointer survives round-trip and stays greppable.

**Markdown structural pass.**

- `SPEC.md` — the new §"Tasknote frontmatter" block sits between the lifecycle carve-out and the `Every tasknote opens with…` paragraph, blank-line isolated on both sides; the fenced ```` ```markdown ```` example is balanced and its `>` blockquote is inside the fence, so it renders as a sample rather than as a live callout. The Phase 4 trigger sits after the Subtasks-exempt paragraph and before the `> **No nav-header chip flip here.**` blockquote, correctly separated so the blockquote is not absorbed. Inline code spans balanced throughout.
- `SPEC/tasknote-selection.md` — added sentence keeps the paragraph's line flow; the parenthetical cross-reference matches the section title exactly.
- `SPEC/procedures/ft-task.md` — insertion preserves the 2-space continuation indent of the surrounding bullet.
- Both archives — blockquote on one line, blank-line separated from the nav header above and `## 🎯 Goal` below; original text byte-identical (diffstat: `+2/-0` each, zero deletions).
- `grep -c ' $'` → **0** across all six changed files.

`git diff --stat` final: 6 files, **+65/-4** — and all 4 deletions are the re-flowed sentence at `SPEC/tasknote-selection.md:143`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". `SPEC.md` — **updated** (this task's deliverable, §"Tasknote frontmatter" + §"🚀 Phase 4: Closure"). `docs/MIGRATION.md` — **no change**, verified rather than assumed: `:430` instructs migrators to leave archived path/ID references untouched under write-once, which is *spec evolution* — the case the new carve-out explicitly excludes — so the line stays correct as written. `README.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — **no change**; a `grep` for `write-once|retroactiv` across all 14 returns only the `docs/MIGRATION.md` hit above. `docs/AGENT-NEUTRALITY.md` needs no row — `claude/skills/ft-task/SKILL.md` is an already-ledgered Claude-specific surface. Outside the sweep list, `docs/GLOSSARY.md:125` ("most fields are write-once after scaffold") is also unaffected: the carve-out touches a *body* blockquote and deliberately leaves `related-tasks:` alone, so no frontmatter field changed write-once status.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed` (standalone task) per SPEC/tasknote-selection.md §"`## Completed` archive convention", tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip: 6 markdown files; no frontend, code, or privileged surface)

**Final Summary:**

Answered `CORE-416.N`'s open contract question — **yes, warranted** — and landed the mechanism: a narrow, append-only write-once carve-out that lets a task which falsifies a factual claim in an archived tasknote leave a one-line pointer on that note, so the correction is discoverable from the place the false claim is read.

**The permission already existed; nobody had written it down.** `CORE-381` overrode write-once to backfill 359 archived notes and recorded it in its own Discovery as *"a deliberate operator decision rather than something the policy permits by default."* Because that stayed unwritten, `CORE-416.2` read write-once as absolute when it killed `.4`, and `CORE-416.N` then reported that flowtron has "no contract-sanctioned way" to mark a claim superseded. So this is documenting an existing escape hatch with a hard fence around it, not opening a new one.

**The filed premise understated the evidence.** The PLAN line named one instance. A second landed hours before this task started: `CORE-418` falsified `CORE-416.N`'s Finding 1 — the audit that filed this ticket became an instance of the defect it filed. Both landed 2026-08-08, and there are no earlier ones: they are a product of the hardened Phase 1 drift check working, so the rate is rising rather than stable. The harm lands at a **mandatory** Phase 1 box (`SPEC.md:490` Archive skim) that tells agents to read archived prose as authoritative, and no audit surface will ever catch it — `claude/skills/ft-audit/passes/docs.md:45` skips the archive by design.

**The fence is the design.** Three neighbouring cases are named as *not* covered, because the risk of this carve-out is scope creep into archive-rewriting: a **superseded decision** (`CORE-159` overturned `CORE-157`; that record is still accurate — decisions changing is the system working), **spec evolution** (the case write-once opens with), and **bulk backfill** (still an operator call, with `CORE-381` cited as both precedent and limit). Append-only is the other half: the falsified claim stays readable, because a historical record that quietly agrees with the present is not a record.

**Also closed the mechanism that made this necessary.** `CORE-416.2` recorded its correction as carried by "this note and the parent line" — and the epic close deleted the parent line two commits later, exactly as `SPEC/tasknote-selection.md:143` says it will. A clause now sits at that drop site: never park anything durable in a long description, it is deleted on a schedule.

**Stated once, fired from three places.** The contract lives only in `SPEC.md` §"Tasknote frontmatter"; §"🚀 Phase 4: Closure", the agent-neutral SOP, and `/ft-task` Step 5 carry triggers that route to it. A *duty* needs a firing point, unlike `CORE-416.2`'s exemption — but seven copies is the pattern this file's own `CORE-042.4` → `.5` → `CORE-393` misreading chain argues against. Phase 4 stays at 3 boxes; the pointer rides the existing `Closed —` box, per `CORE-381`'s fold-in precedent.

**Dogfooded on both instances.** `CORE-416.1` now points to `[[CORE-416.2]]`, `CORE-416.N` to `[[CORE-418]]` — `+2/-0` each, so append-only is verifiable from the diffstat alone.

**Verification.** 258 tests pass across 18 files (unchanged). The real risk was that a blockquote inserted above `## 🎯 Goal` might corrupt how `viz` reads 619 archives; a throwaway probe ran the actual `parseTasknote` over both edited files and confirmed frontmatter, `goal`, `acceptance`, phase counts, and `closureDrift` are all unaffected and the pointer leaks into no extracted section. Documentation verdict: 14 of 14 swept, 1 updated (the deliverable), 13 unchanged.

**Maintainability effect.** An archived tasknote can no longer silently mislead the Phase 1 Archive skim, and the "may I correct the record?" question — re-litigated from scratch in `CORE-381`, `CORE-416.2`, and `CORE-416.N` — has a written answer with a bounded shape. Net: 6 markdown files, +65/-4, no new field, box, phase, gate, or code.

**Archived:** 2026-08-08
