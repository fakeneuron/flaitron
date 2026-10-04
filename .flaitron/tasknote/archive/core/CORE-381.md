---
title: phase4-status-flip
status: completed
tags: []
created: 2026-07-31
due:
related-tasks: [CORE-042.4, CORE-042.5, FE-016]
---

# CORE-381 | phase4-status-flip

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-042.4]] [[CORE-042.5]] [[FE-016]]

## 🎯 Goal

Decide whether Phase 4 closure should flip a tasknote's YAML `status:` to `completed` — and if so, assert the flip in SPEC §"🚀 Phase 4: Closure" plus the closure-driving skills — weighed against the §"Tasknote frontmatter" write-once policy.

## ✅ Acceptance

- [ ] `SPEC.md` §"🚀 Phase 4: Closure" — the existing `Closed —` box asserts flipping YAML `status:` → `completed` before the archive move; the prose paragraph below it matches
- [ ] `SPEC.md` §"Tasknote frontmatter" — write-once policy carries an explicit carve-out: the closure flip is a pre-archive write, not a retroactive edit
- [ ] `templates/tasknote-template.md` Phase 4 `Closed —` box carries the same assertion
- [ ] `SPEC/procedures/ft-task.md` §5 Phase 4 asserts the flip (agent-neutral projection stays in sync)
- [ ] `claude/skills/ft-task/SKILL.md` Step 5 Phase 4 asserts the flip
- [ ] `claude/skills/ft-micro-task/SKILL.md` — the counter-assertion ("YAML `status:` stays `in-progress` per SPEC §Tasknote body shape") is replaced with the flip; the mis-citation is gone
- [ ] `claude/skills/ft-close-epic/SKILL.md` closure asserts the flip for the audit tasknote
- [ ] `ft-debug` / `ft-goal-task` / `ft-epic-discovery` audited for counter-assertions; none remain anywhere in the contract layer
- [ ] Backfill: every archived tasknote carrying a `status:` value other than `completed` reads `completed` (359 files: 354 `in-progress` + 3 `done` + 1 `complete` + 1 `de-scoped`)
- [ ] The 9 pre-frontmatter archives (`CORE-004..008`, `010..012`, `FE-001`) are left untouched — no frontmatter is fabricated
- [ ] `viz` `parseFrontmatter` rejects zero archived tasknotes that carry frontmatter (was 5)
- [ ] `viz` test suite passes; typecheck/lint clean on any changed file

## 🧩 Subtasks

- [ ] `SPEC.md` §"🚀 Phase 4: Closure" — fold the flip into the `Closed —` box + update the prose paragraph
- [ ] `SPEC.md` §"Tasknote frontmatter" — add the closure-write carve-out to the write-once policy
- [ ] `templates/tasknote-template.md` — mirror the `Closed —` box edit
- [ ] `SPEC/procedures/ft-task.md` — mirror in the §5 Phase 4 prose
- [ ] `claude/skills/ft-task/SKILL.md` — mirror in Step 5 Phase 4
- [ ] `claude/skills/ft-micro-task/SKILL.md` — replace the contradicting line
- [ ] `claude/skills/ft-close-epic/SKILL.md` — assert the flip in its closure step
- [ ] Grep the contract layer (`SPEC/`, `claude/skills/`, `codex/`, `grok/`, `docs/`) for surviving counter-assertions
- [ ] Backfill sweep: 359 archived tasknotes → `status: completed`
- [ ] `viz/src/ui/utils.ts` — refresh the `effectiveStatus` comment (fallback stays for adopters pinned pre-fix; the drift is no longer open-ended)
- [ ] Verify: 0 non-`completed` statuses in archive, 9 no-frontmatter files still untouched, `viz` tests + typecheck clean

## 🔗 Related

- [[CORE-042.4]] — locked in "Phase 4 closure now writes 2 places (PLAN checkbox + YAML `status:`)"; the flip this task asserts was that task's stated design
- [[CORE-042.5]] — sibling that wrote the opposite into `/ft-micro-task`; the contradiction this task resolves
- [[FE-016]] — added `viz` `effectiveStatus`, whose comment names the symptom "closure-protocol drift"

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line frames this as an open design question ("decide whether … should assert the flip"). Discovery shows the question was already decided in [[CORE-042.4]] and then silently contradicted a week later — so the real work is resolving a documented contradiction, not choosing a policy from scratch. Same deliverable surfaces either way.

- [x] Read relevant source files

- [x] **Best Practices Review** — contract-layer edit, not module-boundary work. Touched responsibility is a single lifecycle assertion that must land identically in one contract (`SPEC.md`), one template, one agent-neutral projection (`SPEC/procedures/ft-task.md`), and five skills. That fan-out is the established flowtron shape (contract in SPEC, mirrored in skills), not duplication to consolidate. No in-scope refactor; the only code touched is a stale comment in `viz/src/ui/utils.ts`.

- [x] **Archive skim** — see findings below

- [x] **Drift check** — see findings below

- [x] Asked clarifying questions (three; answers recorded below)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Root cause: an assumed step that was never asserted

`git log -S"status: completed" -- SPEC.md templates/tasknote-template.md`
returns **nothing**. The YAML `status:` → `completed` flip has never existed
as a checklist box in the contract. It was only ever *assumed*.

Where the assumption came from — [[CORE-042.4]] (SPEC v0.8.0, 2026-05-06,
"status source-of-truth"), whose Final Summary states:

> Phase 4 closure now writes 2 places (PLAN.md checkbox + YAML `status:`)
> instead of 3.

That task retired the **nav-header chip** flip and made the chip
render-derived. It explicitly kept the YAML flip as one of the two remaining
closure writes. But because the flip had never been an explicit box, retiring
the chip box left Phase 4 with *no* status write encoded at all.

### The contradiction

Nine days later, [[CORE-042.5]] (`/ft-micro-task` ship, same epic) wrote the
opposite into the skill layer:

> `claude/skills/ft-micro-task/SKILL.md:110` — "Closure flips PLAN.md line +
> tasknote location; YAML `status:` stays `in-progress` per SPEC §"Tasknote
> body shape"."

The citation is wrong. `SPEC.md` §"Tasknote body shape" (lines 313–322)
governs the **nav-header chip**, not the YAML field — and says the opposite
of what it's cited for: *"YAML stays canonical for tasknote-bearing rows … the
chip is render-derived."* The original CORE-042.5 wording made the
misattribution explicit ("matches `/task`'s closure shape") — but `/ft-task`
has no such shape; it simply never asserted the flip.

So the contract layer currently holds: SPEC saying YAML is canonical, one
skill saying YAML is deliberately left stale, and no skill asserting a write.

### Downstream symptom

`viz/src/ui/utils.ts:20–26` already carries a workaround for this:

```ts
// PLAN.md wins on completion: if the row is `[x]` in PLAN.md, the row is
// authoritatively done regardless of frontmatter status (some archives still
// say `in-progress` because of closure-protocol drift).
export function effectiveStatus(task: Task, tn: Tasknote | undefined) { … }
```

Added in [[FE-016]]. The comment names the bug by name. This is the consumer
compensating for a producer that never wrote the field.

### Flowtron's own archive (564 files)

| `status:` value | count | disposition |
|---|---|---|
| `in-progress` | 354 | backfill → `completed` |
| `completed` | 196 | already correct |
| `done` | 3 | invalid (not in enum) → `completed` |
| `complete` | 1 | invalid → `completed` |
| `de-scoped` | 1 | invalid → `completed` (no enum value for de-scoped; PLAN row is `[x]`) |
| *(no frontmatter)* | 9 | **out of scope** — pre-date frontmatter entirely |

The 5 invalid values fail `parseFrontmatter`'s `STATUS_VALUES` check
(`viz/src/tasknote.ts:88`), which returns `null` for the whole frontmatter
block — those archives lose `title` / `tags` / `created` in viz, not just
status. Files: `CORE-021`, `CORE-094`, `CORE-102`, `CORE-224.1`, `CORE-372`.

The 9 no-frontmatter archives (`CORE-004`–`008`, `010`–`012`, `FE-001`)
pre-date `CORE-017`, which introduced frontmatter. Adding frontmatter to them
would be fabrication, not correction — left untouched.

**Backfill rule.** "Archived" is itself the completion signal, so the sweep
targets *all* archived tasknotes, not only those with an `[x]` PLAN row: 38
archived epic children (`CORE-097.*`, `CORE-098.*`, `CORE-099.*`, `FE-033.*`,
`CORE-196`) have no PLAN row at all — their rows were consumed by the parent's
closure per the epic-close convention (e.g. PLAN.md:491). They are legitimately
complete.

### Write-once: no genuine conflict

`SPEC.md` §"Tasknote frontmatter" write-once reads: *"Archived tasknotes are
historical records — not retroactively edited when the spec evolves."* The
closure flip is a **pre-archive write** — it happens at Phase 4, before the
`mv` into `archive/`. It is not a retro-edit and the policy does not reach it.
This will be made explicit in SPEC so the next reader doesn't repeat
CORE-042.5's misreading.

The 359-file backfill *is* a retroactive edit, and is a deliberate operator
decision (below) rather than something the policy permits by default.

### Clarifying questions — answers

1. **Direction** → *Assert the flip.* Restores CORE-042.4's stated design
   across SPEC, template, procedure SOP, and the closure-driving skills.
   (Rejected: codifying the status quo; retiring `effectiveStatus` — the
   latter would break the 354 un-flipped archives and has a larger blast
   radius than the fix warrants.)
2. **Backfill** → *Full backfill (354 + 5 = 359).* Operator override of
   write-once for a data correction. The 9 no-frontmatter archives stay out.
3. **Encoding** → *Fold into the existing `Closed —` box.* Phase 4 stays at
   3 boxes; CORE-042.4 deliberately reduced the count and re-adding one
   would partly undo it.

### Drift check

- PLAN line cites `SPEC §"🚀 Phase 4: Closure"` — exists, `SPEC.md:480–511`. ✅
- PLAN line cites `§"Tasknote frontmatter"` write-once — exists, `SPEC.md:258–268`. ✅
- PLAN line names `ft-task` / `ft-micro-task` / `ft-close-epic` as the skills to change — all three exist and all three drive closure. ✅
- PLAN line's adopter figure (369 of 697) is another repo's count; flowtron's own is 354 of 564. Both consistent with the same root cause. No drift, just a different sample.
- **Scope addition not in the PLAN line:** `SPEC/procedures/ft-task.md` (the agent-neutral projection, added after this ticket was filed) and `templates/tasknote-template.md` also encode Phase 4 and must move together.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, see below

**Implementation Notes:**

**Pattern survey.** The existing closure-write pattern is: assert once in
`SPEC.md`, mirror in `templates/tasknote-template.md`, mirror in the
agent-neutral `SPEC/procedures/ft-task.md`, then restate per closure-driving
skill. The PLAN.md-flip step already follows exactly this shape, so the
`status:` flip was written as a sibling clause on the *same* sentence in each
place rather than as a new bullet — extending the established pattern, and
honoring the "fold into the `Closed —` box" decision (Phase 4 stays at 3
boxes).

**Contract layer (7 files):**

| File | Change |
|---|---|
| `SPEC.md` §"🚀 Phase 4: Closure" | `Closed —` box now leads with the YAML flip; prose paragraph names it as the first of three closure writes and marks it a pre-archive write |
| `SPEC.md` §"Tasknote frontmatter" | New **"Write-once does not cover lifecycle writes"** paragraph enumerating all four `status:` transitions and naming the misreading that produced the drift |
| `templates/tasknote-template.md` | `Closed —` box mirrored |
| `SPEC/procedures/ft-task.md` | §5 Phase 4 prose mirrored |
| `claude/skills/ft-task/SKILL.md` | Step 5 Phase 4 mirrored |
| `claude/skills/ft-micro-task/SKILL.md` | Closure step 2 now flips `status:`; the contradicting line + its mis-citation of §"Tasknote body shape" replaced |
| `claude/skills/ft-close-epic/SKILL.md` | Step 7 gains a flip bullet before the archive move |

Two skills beyond the PLAN line's list also enumerate closure ops explicitly
rather than deferring to `/ft-task`, so they'd have silently kept the old
behavior — both fixed: `claude/skills/ft-epic-discovery/SKILL.md` (Step 9) and
`claude/skills/ft-goal-task/SKILL.md` (Step 6). `/ft-debug` says only
"identical to `/ft-task`" without re-enumerating, so it inherits — left
untouched.

**Counter-assertion sweep.** `grep -rn "stays \`in-progress\`|remains
\`in-progress\`|YAML may lag|not flipped"` across `SPEC.md`, `SPEC/`,
`claude/`, `codex/`, `grok/`, `docs/`, `templates/`, `README.md` → zero
remaining hits.

**Backfill (359 files).** Applied with a one-off `awk` rewrite restricted to
the first `status:` line inside the leading frontmatter block (no body-line
false positives). Rule applied: *archived is itself the completion signal*, so
the sweep targets every archived tasknote, not only those with an `[x]` PLAN
row — 38 archived epic children have no PLAN row at all (rows consumed by the
parent's closure per the epic-close convention) and are legitimately complete.

Final diff: **359 files, 359 insertions, 359 deletions** — exactly one changed
line per file, matching the Discovery prediction (354 `in-progress` + 3 `done`
+ 1 `complete` + 1 `de-scoped`). The 9 pre-frontmatter archives are untouched.

**Incidental change caught and reverted.** The rewrite added a trailing newline
to 5 archives that lacked one. Four had no status change at all — reverted with
`git checkout`; the fifth (`CORE-342.4`) had its trailing newline stripped back
so its diff is status-only. Re-verified: 0 non-status lines in the archive diff.

**No tests added.** The change is a contract/procedure assertion plus a data
backfill — there is no runtime code path to test, and flowtron ships no schema
validator by design (SPEC §"What flowtron does NOT provide"). Verification is
the archive-wide parse check in Testing Notes.

**Only code touched:** `viz/src/ui/utils.ts` — comment-only refresh on
`effectiveStatus`. The PLAN-wins fallback itself is deliberately **kept**: the
chosen direction was "assert the flip", not "retire the workaround", and the
fallback still earns its keep for adopters pinned to a pre-fix flowtron and for
the 9 pre-frontmatter archives.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation

- [x] (frontend) Asked the user for visual confirmation — `N/A`, see below

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Command | Result |
|---|---|---|
| viz suite | `npm --prefix viz run test` | **242/242 pass**, 18 files |
| Typecheck + build | `npm --prefix viz run build` | clean (`tsc --noEmit && vite build`, 318 modules) |
| Lint | `npm --prefix viz run lint` | clean, no output |
| Archive parse | node sweep replicating `parseFrontmatter`'s gate (`title` + `created` present, `status` ∈ enum) | **555 with frontmatter, 0 would fail** (was 5) · 9 without frontmatter, correctly out of scope |
| Backfill precision | `git diff --stat .flowtron/tasknote/archive/` | 359 files, 359 (+) / 359 (−) — one line each |
| Diff purity | `git diff -U0 … \| grep -v '^[-+]status:'` | 0 non-status lines |
| Counter-assertions | `grep -rn` across contract layer | 0 hits |

**Quality assertions.** The only code change is a comment; no duplication, dead
code, complexity, or public-surface growth introduced. The comment it replaces
*was* the stale code-facing documentation — it described the drift as an
open-ended condition ("some archives still say `in-progress`") when the
protocol now closes it; refreshed to state why the fallback is still retained.

**Visual confirmation `N/A`.** `viz/src/ui/utils.ts` changed, but the edit is
comment-only — zero rendered output differs. Confirmed by the clean build plus
the unchanged 242-test suite. (Note: the path still trips the deterministic
frontend signal at the 📦 gate, which is path-based and not overridable.)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Doc-drift sweep (12 entries):**

| Entry | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | **updated** — §"🚀 Phase 4: Closure" `Closed —` box + prose; §"Tasknote frontmatter" write-once carve-out |
| `docs/MIGRATION.md` | no change — its two Phase-4 mentions (lines 210, 404) reference the doc-sweep list and migration-tasknote closure, neither touching the `status:` contract |
| `claude/AGENTS-snippet.md` | no change |
| `codex/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — the flip is asserted in the agent-neutral SPEC + procedure SOP, adding no Claude-specific surface |
| `docs/PLATFORMS.md` | no change |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change |

**Final Summary:**

Phase 4 closure now asserts the YAML `status:` → `completed` flip, and
flowtron's own 359 stale archives were backfilled to match. This wasn't an open
design question: [[CORE-042.4]] (SPEC v0.8.0) had already locked the flip in as
one of Phase 4's two remaining writes — it just never became a checklist box,
so retiring the nav-chip box left Phase 4 with no status write encoded at all.
Nine days later [[CORE-042.5]] wrote the opposite into `/ft-micro-task`, citing
§"Tasknote body shape" — which governs the nav chip, not the YAML field, and
says the opposite of what it was cited for. Both halves are now fixed.

**Changed files (12 + 359 backfill):**

- Contract (7): `SPEC.md` (2 sections), `templates/tasknote-template.md`,
  `SPEC/procedures/ft-task.md`, `claude/skills/ft-task/SKILL.md`,
  `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-close-epic/SKILL.md`
- Beyond the ticket's list (2): `ft-epic-discovery` (Step 9) and `ft-goal-task`
  (Step 6) also enumerate closure ops explicitly instead of deferring to
  `/ft-task`, so they'd have silently kept the old behavior. `/ft-debug` says
  only "identical to `/ft-task`" and correctly inherits — untouched.
- Code (1): `viz/src/ui/utils.ts` — comment-only refresh on `effectiveStatus`
- Backfill (359): every archived tasknote whose `status:` wasn't `completed`

**Verification:** viz 242/242 tests pass; `tsc --noEmit && vite build` clean;
eslint clean. Archive-wide parse check: 555 archives with frontmatter, **0**
would now fail `parseFrontmatter` (was 5 — `done` ×3, `complete`, `de-scoped`
are not in the enum, which made viz drop those files' `title`/`tags`/`created`
too, not just status). Backfill diff is exactly 359 files / 359 (+) / 359 (−),
one line each, 0 non-status lines.

**Refactor deferred (deliberate).** `effectiveStatus`'s PLAN-wins fallback was
kept, not retired. The chosen direction was "assert the flip", and the fallback
still earns its keep for adopters pinned to a pre-fix flowtron and for the 9
pre-frontmatter archives. Retiring it was offered and declined.

**Out of scope (deliberate).** The 9 archives predating frontmatter
(`CORE-004`–`008`, `010`–`012`, `FE-001`) were left alone — synthesizing
frontmatter for them would be fabrication, not correction.

**Maintainability effect.** The producer now writes the field its consumer
reads, so `status:` becomes trustworthy for the first time: adopter dashboards
can filter on it without a PLAN.md cross-reference, and viz's fallback degrades
from load-bearing to defensive. The write-once carve-out is the durable part —
it names the exact misreading that caused this, so the next reader can't repeat
it. This tasknote is the first to close under the new rule.

**Archived:** 2026-07-31
