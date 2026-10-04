---
title: caller-surface-sweep
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-565.3, CORE-598.4, CORE-473.6, CORE-533, CORE-663]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/EXTERNAL-AGENTS.md
  - .flowtron/tasknote/README.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-655 | caller-surface-sweep

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Sharpen the Phase 4 doc-drift line so a moved stable-surface row in `docs/EXTERNAL-AGENTS.md` files the cross-repo caller-side (caobunga) row in the same closure, and add a stable-surface row covering the `## <emoji> Phase N:` headings, per-phase checkboxes, and `## 🎯 Goal`.

## ✅ Acceptance

- [x] `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" carries a tasknote-body-headings row — `grep -c 'Tasknote body headings' docs/EXTERNAL-AGENTS.md` → 1
- [x] The row names the `## <emoji> Phase N:` headings, the per-phase checkbox run, `## 🎯 Goal`, and the micro-template carve-out — `grep -c '⚡ Notes' docs/EXTERNAL-AGENTS.md` ≥ 1; completeness is `judgment` against Discovery Notes §B
- [x] The row names canonical owners and copies nothing; the doc stays adopter-name-free — `grep -ci 'caobunga\|CBN-' docs/EXTERNAL-AGENTS.md` → 0 hits
- [x] `.flowtron/tasknote/README.md` §"AI-referenced docs" binds a moved / renamed / retired stable-surface row to file the caller-side row in the **same** closure — `grep -c 'same closure' .flowtron/tasknote/README.md` ≥ 1
- [x] That entry cites its owner section rather than restating it — `grep -c 'Cross-repo edit remit' .flowtron/tasknote/README.md` ≥ 1
- [x] The caller-side row for *this* closure is filed in the caller's own `PLAN.md` (operator-chosen discharge, Discovery §D) — `grep -c 'CBN-236' ~/Code/caobunga/.flowtron/PLAN.md` → 1
- [x] Citations resolve and markdown is clean — CI Pair Q loop over the two changed files → 0 findings; `git diff --check` → 0

## 🧩 Subtasks

- [x] Phase 2: add the body-headings row to `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers", placed with the body-shape family (immediately before the `Template labels` row)
- [x] Phase 2: sharpen the `docs/EXTERNAL-AGENTS.md` entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" with the same-closure caller-side filing duty
- [x] Phase 2: file `CBN-236` in `~/Code/caobunga/.flowtron/PLAN.md` — row only, left uncommitted for caobunga's own session to carry
- [x] Phase 3: run the Acceptance greps, the CI Pair Q citation loop over both changed files, `git diff --check`
- [ ] Phase 4: doc-drift sweep (20 entries), Acceptance tick-through, stub flip, archive

## 🔗 Related

- [[CORE-565.3]] — predecessor: authored §"Stable surfaces for callers" and the owner-naming row shape this row extends; its "no adopter names in this doc" criterion still binds
- [[CORE-598.4]] — related-decision: the cross-repo caller-row precedent (ready-to-paste block, confirmed paste); this task takes the operator-chosen `PLAN.md`-row variant instead, per `SPEC.md` §"Cross-repo edit remit"
- [[CORE-473.6]] — depends-on: the layering rule — `docs/EXTERNAL-AGENTS.md` is the convention layer, names canonical owners in `SPEC/`, and copies nothing
- [[CORE-533]] — related-decision: verify behavioral claims against flowtron's own source; adopter IDs stay out of the caller-facing contract doc
- [[CORE-663]] — follow-up: the wider harness-survey pass that re-ranks whatever CORE-655…662 landed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both halves of the PLAN line reproduce at HEAD. The stable-surface table in `docs/EXTERNAL-AGENTS.md` has no row for the tasknote body's own headings, and the caller's reader parses exactly the three shapes the line names (§B). The sweep entry in `.flowtron/tasknote/README.md` names five drift triggers but no filing duty, so a moved stable-surface row today leaves the caller to discover the move at its next pin bump. Scope is two prose edits plus one caller-side row — no re-scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. Read set

Flowtron: `docs/EXTERNAL-AGENTS.md` (whole), `.flowtron/tasknote/README.md`
§"Archive layout" + §"AI-referenced docs", `SPEC.md` §"🚀 Phase 4: Closure" /
§"Cross-repo edit remit" / §"Deferred hand-off filing" / §"Handoff persistence" /
§"Tasknote body shape", `docs/CONVENTIONS.md` §"Verify behavioral claims against
flowtron's own source", `docs/CONTEXT-BUDGET.md` §"Budgets" + §"Always loaded to
run one task", `docs/HARNESS-SURVEY.md` §"Caobunga exposure",
`.github/workflows/ci.yml` (`drift` job: budget step, Pair Q), both tasknote
templates, `templates/tasknote-README.md`. Archive: `CORE-565.3` (whole),
`CORE-598.4` (frontmatter → Drift check). Caller (sibling read, `~/Code`
standing exception): `backend/caobunga/flowtron/tasknote.py:95-190`,
`backend/caobunga/brief.py:21`, `docs/CONTRACT.md:601` / `:845` / `:1173` /
`:1347`, `.flowtron/PLAN.md` + `.flowtron/PLAN-ARCHIVE.md` (max ID only).

### B. The surface, verified at the caller's HEAD

`phase_progress()` (`tasknote.py:148`) parses `^##\s+(?:\S+\s+)?Phase\s+(\d+):\s*(.+?)$`
— an optional single leading token (the emoji), the literal `Phase N:`, and a
name whose first word becomes the echoed slug — plus `- [x]` / `- [ ]` boxes at
column 0 beneath each heading up to the next `## `, and the micro template's
`## ⚡ Notes` heading (which returns the `notes` token when no phase heading
exists). `brief.py:21` `GOAL_HEADING = ^##\s+(?:🎯\s+)?Goal\s*$` reads
`## 🎯 Goal` as the body until the next `##`.

Both templates ship `## 🎯 Goal`; only the full template ships the four phase
headings, and only the micro ships `## ⚡ Notes`. The micro carve-out is in
scope (operator-confirmed): the `Template labels` row already carries one of
the same shape, and without it the declared surface reads as though every
tasknote has phase headings.

Nothing on flowtron's side moves — the row *declares* shapes the templates
already ship. `docs/CONVENTIONS.md` §"Verify behavioral claims…" governs claims
about flowtron's own behavior; this row makes none, and the caller-side facts
above were read at source rather than recalled.

### C. Archive skim

`grep -l EXTERNAL-AGENTS archive/core/*.md` → 15 notes; `archive/core/`
confirmed against the README table. Load-bearing subset:

- [[CORE-565.3]] — authored the section. Two rules bind this edit: rows **name
  canonical owners and copy nothing** ([[CORE-473.6]]'s layering), and the doc
  carries **no adopter names** (its own Acceptance grep over `SPEC.md`,
  `SPEC/blocked.md`, `docs/EXTERNAL-AGENTS.md` → 0). Both kept. Its §E also
  refused to specify anything merely because the caller reads it — this row
  clears that bar on flowtron's own terms: the headings are the template's
  published shape and a move is already a versioned change.
- [[CORE-598.4]] — the cross-repo row precedent. `SPEC.md` §"Cross-repo edit
  remit" was read there as "the deliverable is a paste block the operator
  carries across, not an edit"; the remit's own text endorses filing a
  `PLAN.md` line in the target repo. §D records which variant this task takes.
- No archived note contradicts the row or the sharpened entry; no ⚠️ pointers
  on the hits.

### D. Clarifications asked (AskUserQuestion, 2 questions)

1. **Caller-side discharge** — operator chose **write the row into the caller's
   own `.flowtron/PLAN.md` directly**, over the [[CORE-598.4]] ready-to-paste
   variant. This is `SPEC.md` §"Cross-repo edit remit"'s prescribed motion
   ("file it there — a `PLAN.md` line, a starter tasknote, or a routed
   ticket"); the remit forbids editing the target's *deliverable* from this
   cycle, not filing a row there. Assumption carried: **row only, left
   uncommitted** — the caller's own session commits it, so this cycle adds no
   commit to another repo. Consequence recorded: the caller's working tree
   holds one uncommitted `PLAN.md` line until then, which its next foreign-dirt
   gate will surface.
2. **Micro carve-out** — include as a clause in the same row (§B).

### E. Why this closure owes a caller-side row at all

The caller's `docs/CONTRACT.md:601` (its own CBN-235) records the phase/Goal
read **against the vendored template** and says so explicitly: it cites no
stable-surface row "rather than citing a row that does not exist yet", names
CORE-655 as the writer-side half, and points at the pin bump as where the two
halves get read against each other. Landing this row makes that hedge stale —
wording only, and only once a release carries it. So the filed row is
release-gated: repoint the paragraph after the flowtron release carrying
CORE-655 is pinned. Current released tag is v5.32.0; CORE-655 lands in the
next, uncut Minor, so the row names the release by its carried task rather than
by a tag that does not exist. Next free caller ID at read time: **CBN-236**
(max across its `PLAN.md` + `PLAN-ARCHIVE.md` is 235; re-check at write time).

### F. Drift check

- PLAN line vs HEAD: `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers"
  exists with 13 rows, none covering body headings ✓. The README sweep entry is
  a single line naming five drift triggers, no filing duty ✓. Both caller
  functions resolve at the cited shapes (§B) ✓.
- Cross-artifact: the plan contradicts no SPEC contract. §"Cross-repo edit
  remit" is satisfied by §D's filing motion; §"Deferred hand-off filing" is
  satisfied by filing rather than recording it as recap prose.
- Budgets: `docs/` is unbudgeted by construction and
  `.flowtron/tasknote/README.md` carries no `## Budgets` row, so the CI budget
  step cannot trip. Its figure in §"Always loaded to run one task" is a
  release-refreshed measurement, and `docs/CONTEXT-BUDGET.md` states its own
  exclusion from this sweep set — no obligation here.
- Mirror pairs: `templates/tasknote-README.md` ships a generic
  §"AI-referenced docs" list with no `docs/` entries, so the self-host edit
  mirrors nowhere. No `/ft-release` pair reads either changed line.
- CI Pair Q: both new citations use the backticked `` `SPEC.md` §"…" `` shape,
  root-relative, resolving against `## Cross-repo edit remit` and the
  `**Deferred hand-off filing.**` bold-lead.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`docs/EXTERNAL-AGENTS.md` (+1 line, 23,313 → 23,996 chars).** One new
`Tasknote body headings` row in §"Stable surfaces for callers", placed with the
body-shape family immediately above `Template labels` (the two are the only
rows about a note's *body*; the rows above them are all PLAN- or
frontmatter-shaped). It names the full template's four `## <emoji> Phase N: <Name>`
headings — optional leading emoji token, literal `Phase N:`, the name after it —
the `- [x]` / `- [ ]` run beneath each up to the next `## `, and `## 🎯 Goal`,
which both templates ship; then the micro carve-out (`## ⚡ Notes`, no phase
headings, so no phase progress to read). Owners: `SPEC.md` §"Tasknote body
shape" plus the two templates. No caller named, no regex copied — the row states
the shape the templates publish, which is what a caller may rely on.

**`.flowtron/tasknote/README.md` (+1/−1 on the `docs/EXTERNAL-AGENTS.md`
entry).** The sweep entry kept its five drift triggers and gained the filing
duty: a closure that moves, renames, or retires a stable-surface row files the
caller-side row **in the same closure**, in the caller's own `PLAN.md`, never
left as recap prose for the caller to discover at its next pin bump. Cites
`SPEC.md` §"Cross-repo edit remit" and §"Deferred hand-off filing" rather than
restating either. The caller is named once, parenthetically — this is the
self-host sweep list, not shipped contract, and the duty is not executable
without knowing where to file; `docs/EXTERNAL-AGENTS.md` and the SPEC layer stay
adopter-name-free (Acceptance grep → 0 hits).

**`~/Code/caobunga/.flowtron/PLAN.md` (+1 row, uncommitted).** `CBN-236`
`contract-phase-row-cite`, filed at the top of `## Low`: once the flowtron
release carrying `CORE-655` is pinned, repoint `docs/CONTRACT.md` §"Fleet
boundary" ¶CBN-235 at the new row and drop its "a row that does not exist yet"
hedge. Wording only; that repo's readers are unchanged. Written per the operator
choice in Discovery §D and `SPEC.md` §"Cross-repo edit remit" ("file it there — a
`PLAN.md` line…"), deliberately **left uncommitted**: this cycle adds no commit
to another repo, and the caller's own session carries it. Row grammar checked
against that repo's conventions — `[light]`, no glyph, shortname 23 chars, 47-word
description, no `Blocked by [[…]]` clause (the blocker is a release, not a task,
so the literal would dangle in its parser).

**Pattern survey.** Extended [[CORE-473.6]]'s established row shape — three
cells, owners named, nothing copied — and the `Template labels` row's own micro
carve-out idiom. No new shape. The README entry extended the existing
one-line-per-doc form rather than adding a paragraph.

**Minimal refactor gate.** No refactor. Three additive prose edits; nothing
adjacent touched.

**Downstream-impact scan.** Open PLAN rows: CORE-656…663, FE-124, CORE-641.
None plans an edit to either changed file. [[CORE-657]] moves incident history
out of `SPEC.md` but names §"Task-line format" owner citations in the
EXTERNAL-AGENTS stable table as staying put, and does not touch §"Tasknote body
shape" (a schema section, not incident prose). [[CORE-658]] inserts a Phase 4
checkbox above `**Doc-drift sweep** — 18 entries in `.flowtron/tasknote/README.md`
§"AI-referenced docs":

`README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (cited as
owner; §"Tasknote body shape" did not move) · `docs/MIGRATION.md` no change ·
`claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change ·
`cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change ·
`docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md`
no change · `docs/AGENT-NEUTRALITY.md` no change (the new row's three owners are
`SPEC.md` and the two templates — all agent-neutral; no `claude/` path is named,
unlike the Capability-probes row that earned [[CORE-565.3]]'s ledger entry) ·
`docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change ·
`docs/AGENT-COMPAT.md` no change · **`docs/EXTERNAL-AGENTS.md` updated** (new
`Tasknote body headings` stable-surface row) · `docs/WORKTREES.md` no change ·
`docs/VISION.md` no change (declaring a surface the templates already ship adds
no runtime; §"What we won't accept" is untouched).

`.flowtron/tasknote/README.md` itself is the sweep list rather than an entry in
it, and was updated — see Implementation Notes.

**Final Summary:**

Two prose edits plus one caller-side row, closing the gap the 2026-09-21 harness
survey recorded: the caller's reader parses the tasknote body's phase headings
and `## 🎯 Goal`, and flowtron's caller-facing stable-surface table did not list
them.

`docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" gains a
`Tasknote body headings` row (+683 chars) naming the full template's four
`## <emoji> Phase N: <Name>` headings, the checkbox run beneath each, and
`## 🎯 Goal` — with the micro carve-out (`## ⚡ Notes`, no phase headings) the
operator asked for, mirroring the `Template labels` row's own carve-out. Owners
named, nothing copied, no caller named: the doc stays adopter-name-free
(`grep -ci 'caobunga\|CBN-'` → 0 hits).

`.flowtron/tasknote/README.md` §"AI-referenced docs" sharpens the sweep entry
for that doc: a closure that moves, renames, or retires a stable-surface row now
files the caller-side row **in the same closure**, in the caller's own
`PLAN.md`, never as recap prose — citing `SPEC.md` §"Cross-repo edit remit" and
§"Deferred hand-off filing".

The closure dogfoods its own new rule. The caller's `docs/CONTRACT.md` §"Fleet
boundary" ¶CBN-235 explicitly hedged that no such row existed and named CORE-655
as the writer-side half, so this closure filed **CBN-236**
(`contract-phase-row-cite`, `## Low`, release-gated on the pin bump) directly in
that repo's `PLAN.md` — the operator's chosen discharge over [[CORE-598.4]]'s
ready-to-paste variant, and the motion `SPEC.md` §"Cross-repo edit remit"
prescribes. **Left uncommitted on purpose**: this cycle adds no commit to
another repo, so that row sits in the caller's working tree until its own
session commits it, and its next foreign-dirt gate will surface it.

Verification: seven Acceptance receipts plus the CI Pair Q citation shape on all
three new citations and `git diff --check`, all recorded in Testing Notes. No
test runner covers a markdown-only diff. Versioning: additive → **Minor**, cut
with the next release; no `**Version:**` bump here, per [[CORE-565.3]]'s
precedent. `touches:` reconciliation: declared `docs/EXTERNAL-AGENTS.md` and
`.flowtron/tasknote/README.md`; `git diff --name-only` matches exactly, with the
caller's `PLAN.md` outside this repo by construction and named here instead.
Maintainability effect: the rule that keeps the caller in sync now lives on the
checklist walked at every closure, rather than in the memory of whoever last
read the survey.` *specifically* to leave the caller's lede
regex untouched — the new row makes that constraint explicit for the phase
headings too, which strengthens rather than contradicts it. No reconcile edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted suite / lint / type-check: `N/A` — markdown only; `viz/` and `tools/`
untouched, so no runner covers the diff. Substituted the Acceptance receipts,
the CI Pair Q citation resolution, and `git diff --check`. `👁️ CONFIRM`: `N/A`,
no rendered surface.

```text
grep -c 'Tasknote body headings' docs/EXTERNAL-AGENTS.md              → 0 (prints 1)
grep -c '⚡ Notes' docs/EXTERNAL-AGENTS.md                             → 0 (prints 1)
grep -ci 'caobunga\|CBN-' docs/EXTERNAL-AGENTS.md                     → 1 (prints 0 — no hits, as required)
grep -c 'same closure' .flowtron/tasknote/README.md                   → 0 (prints 1)
grep -c 'Cross-repo edit remit' .flowtron/tasknote/README.md          → 0 (prints 1)
grep -c 'Deferred hand-off filing' .flowtron/tasknote/README.md       → 0 (prints 1)
grep -c 'CBN-236' <caller>/.flowtron/PLAN.md                          → 0 (prints 1)
git diff --check                                                      → 0
CI Pair Q shape, three new citations:
  SPEC.md §"Tasknote body shape"      → resolves (## Tasknote body shape)
  SPEC.md §"Cross-repo edit remit"    → resolves (## Cross-repo edit remit)
  SPEC.md §"Deferred hand-off filing" → resolves (**Deferred hand-off filing.**)
final-newline check, both changed files                               → OK
```

One Acceptance criterion moved a word during Phase 3: the README phrase was
`**same** closure`, which made the `grep -c 'same closure'` receipt print 0. The
emphasis was re-spanned to `**in the same closure**` rather than escaping the
grep — a receipt that depends on where bold markers fall is the brittle half.

**Structural quality.** No duplication introduced: the row copies no regex and
no caller detail, and the README entry cites its two owners instead of
restating them. No dead code, no public-surface growth beyond the one declared
surface the task exists to declare. Budgets: `docs/` is unbudgeted and
`.flowtron/tasknote/README.md` carries no `## Budgets` row, so the CI budget
step is untouched; its §"Always loaded to run one task" figure is a
release-refreshed measurement (`docs/CONTEXT-BUDGET.md` states its own exclusion
from this sweep set). Versioning: additive → **Minor** (`SPEC/versioning.md`),
carried by the next release cut; no `**Version:**` bump from this task, matching
[[CORE-565.3]]'s precedent when it added the whole section.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Archived:** 2026-09-22
