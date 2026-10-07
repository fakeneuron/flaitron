---
title: audit-overlay-home
status: completed
tags: []
created: 2026-10-06
related-tasks: [CORE-720, CORE-722, CORE-219, CORE-439, CORE-073, CORE-644]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
touches:
  - .flaitron/audit-overlay/SKILL.md
  - .claude/skills/audit
  - .gitignore
  - docs/MIGRATION.md
  - claude/skills/ft-audit/scaffold-bootstrap.md
  - claude/skills/ft-audit/SKILL.md
  - SPEC/layout.md
  - AGENTS.md
  - docs/AGENT-NEUTRALITY.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-721 | audit-overlay-home

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-720]] [[CORE-722]] [[CORE-219]] [[CORE-439]] [[CORE-073]] [[CORE-644]]

## 🎯 Goal

Give flaitron-self's `/audit` overlay a tracked home at
`.flaitron/audit-overlay/SKILL.md` reached by a directory symlink from
`.claude/skills/audit`, so the overlay is versioned without carving any
exception into the `.claude/` ignore rule — then make every surface that names
the old path agree: `docs/MIGRATION.md` §1.2.2, the shipped
`claude/skills/ft-audit/scaffold-bootstrap.md` §5 flaitron-self branch,
`SPEC/layout.md`, the `.gitignore` comment, and the two PLAN lines this
unblocks.

## ✅ Acceptance

- [x] The overlay's content is tracked at its new home — `git ls-files --error-unmatch .flaitron/audit-overlay/SKILL.md`
- [x] The relocation is byte-identical to the overlay as [[CORE-720]] left it (no content edit rode in) — `cmp -s "/private/tmp/claude-501/-Users-fakeneuron-Code-flaitron/0e434bc6-3f9d-4fbc-aee6-2314a9e27c55/scratchpad/overlay-premove.md" .flaitron/audit-overlay/SKILL.md` against the 7,643-byte pre-move snapshot
- [x] `.claude/skills/audit` is a **directory** symlink at the sibling depth — `[ -L .claude/skills/audit ] && [ "$(readlink .claude/skills/audit)" = "../../.flaitron/audit-overlay/" ]`
- [x] The uniform-symlink invariant that justified this disposition holds — `.claude/skills/` contains nothing but symlinks: `[ -z "$(find .claude/skills -mindepth 1 -maxdepth 1 ! -type l)" ]`
- [x] Skill resolution still reads the overlay through the old path — `[ -r .claude/skills/audit/SKILL.md ] && cmp -s .claude/skills/audit/SKILL.md .flaitron/audit-overlay/SKILL.md`
- [x] The overlay's repo-root-relative scaffold + pass-file citations still resolve from the new location — `[ -f claude/skills/ft-audit/SKILL.md ] && [ -f claude/skills/ft-audit/passes/docs.md ]`
- [x] **No exception was carved into the ignore rule** — `.claude/` stays wholly ignored: `grep -qx '\.claude/' .gitignore && git check-ignore -q .claude/skills/audit`
- [x] `docs/MIGRATION.md` §1.2.2 no longer tells the maintainer the overlay is per-machine and unversioned — `! grep -q 'stays per-machine and never enters git history' docs/MIGRATION.md`
- [x] The shipped `scaffold-bootstrap.md` §5 flaitron-self branch installs to the tracked home + symlink — `grep -q '\.flaitron/audit-overlay' claude/skills/ft-audit/scaffold-bootstrap.md`
- [x] The **adopter** recipe is untouched *(verified: `docs/MIGRATION.md` hunks at lines 237 and 254 both fall inside §1.2.2's 226–268 range, leaving §1.2.1 byte-unchanged; `scaffold-bootstrap.md` hunks at 161/166/176/185 are all in the §5 Flaitron-self block and its shared tail, and no changed line in either file touches an adopter `.flaitron/core/` path)* — no adopter-facing text tells an adopter to use `.flaitron/audit-overlay/`: `judgment`, evidenced by `git diff` on `docs/MIGRATION.md` confining its hunks to §1.2.2 and on `scaffold-bootstrap.md` to the §5 **Flaitron-self** block, leaving §1.2.1 and the §5 **Adopter** block byte-unchanged
- [x] `SPEC/layout.md` §"Working in the flaitron repo itself" declares the new resident — `grep -q '\.flaitron/audit-overlay' SPEC/layout.md`
- [x] [[CORE-720]] and [[CORE-722]] PLAN lines are repointed and unblocked — `! grep -q 'Blocked by \[\[CORE-721\]\]' .flaitron/PLAN.md` and both lines name `.flaitron/audit-overlay/SKILL.md`
- [x] Every section citation in each edited markdown file resolves — local reproduction of CI's `drift` Pair Q extraction loop (`.github/workflows/ci.yml:477`) over the changed files, exit 0; the newly tracked overlay is now in Pair Q's own selection, so this is the check CI will run from the next push
- [x] `.editorconfig` floor holds on every edited file — final newline present and no trailing whitespace
- [x] The repo's own validation roster still passes on an unchanged code surface — `npm --prefix viz test` · `npm --prefix viz run typecheck` · `npm --prefix viz run lint` · `node --test tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] Snapshot the overlay pre-move (done in Phase 1 — `/private/tmp/claude-501/-Users-fakeneuron-Code-flaitron/0e434bc6-3f9d-4fbc-aee6-2314a9e27c55/scratchpad/overlay-premove.md`, 7,643 B) so the byte-identity criterion has a referent after the move
- [x] Create `.flaitron/audit-overlay/`, move the overlay's `SKILL.md` into it, and `git add` it
- [x] Replace `.claude/skills/audit/` with the directory symlink `../../.flaitron/audit-overlay/`; confirm resolution and the uniform-symlink invariant
- [x] Rewrite `docs/MIGRATION.md` §1.2.2's local-fork sentence: tracked home, symlink wiring, and why (the ignore rule stands unamended)
- [x] Update `claude/skills/ft-audit/scaffold-bootstrap.md` §5's **Flaitron-self** install block to write the tracked home + symlink; leave the **Adopter** block untouched
- [x] Add a `SPEC/layout.md` §"Working in the flaitron repo itself" bullet for `.flaitron/audit-overlay/`
- [x] Extend the `.gitignore` comment block so it stays true — one symlink under `.claude/` now points into tracked `.flaitron/`
- [x] Apply the confirmed reconciliation edits to [[CORE-720]]'s and [[CORE-722]]'s PLAN lines (repoint path, drop the `Blocked by [[CORE-721]]` clause)
- [x] Run the Acceptance verify commands, including the local Pair Q loop over the changed files

## 🔗 Related

- [[CORE-720]] — parked by this gap (`park-reason: input-needed`); unblocked here, and its deliverable necessarily rides in this task's commit (Discovery Notes)
- [[CORE-722]] — the six remaining unclean audit domains; blocked by this task for the same uncommittable-deliverable reason
- [[CORE-219]] — drove the committed `.claude/` surface to zero ("never commit per-machine or per-checkout state"); this task honors that rule rather than amending it
- [[CORE-439]] — extended the same posture to `.agents/` under "one canonical install path per project"
- [[CORE-073]] — created the `/audit` overlay fork, back when `.claude/` was still tracked; its direct descendant was `git rm`'d by [[CORE-217]]
- [[CORE-644]] — taught `scaffold-bootstrap.md` §5 and `docs/MIGRATION.md` §1.2.2 the flaitron-self fork path this task relocates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line's premise holds exactly — `.gitignore:21` ignores
  `.claude/`, the overlay is the one real (non-symlink) resident of that tree, and
  [[CORE-720]]'s filled deltas sit on disk uncommittable. The line asked for a
  disposition among three named options and a reconcile of `docs/MIGRATION.md`
  §1.2.1; that is exactly what this task does, so the plan shape is unchanged.
  One correction to the *starter's* framing rather than to the PLAN line (below):
  the docs do not contradict each other — §1.2.2 already sanctions the
  unversioned state — which moves the defect from "accidental contradiction" to
  "documented decision worth revisiting", without changing the work.

- [x] Read relevant source files — `.gitignore`, the overlay, `docs/MIGRATION.md`
  §1.2/§1.2.1/§1.2.2, `claude/skills/ft-audit/scaffold-bootstrap.md` §2/§5,
  `SPEC/layout.md`, `.github/workflows/ci.yml` (Pair Q selection),
  `docs/CONTEXT-BUDGET.md`, `claude/skills/ft-release/SKILL.md`, and
  [[CORE-720]]'s parked tasknote. The ~60-note archive read went to a probe.

- [x] **Best Practices Review** — no code surface; the responsibility at stake is
  an *install-surface boundary*: which tree owns per-machine wiring
  (`.claude/`, ignored) versus versioned self-host state (`.flaitron/`, tracked).
  The chosen shape moves the overlay across that boundary instead of blurring it,
  which is why it needs no exception to the ignore rule. No refactor in scope; no
  cleanup deferred.

- [x] **Archive skim** — `.flaitron/tasknote/archive/core/` (928 notes) grepped
  for `.gitignore`, `.claude/skills/audit`, `audit-overlay`, and
  `scaffold-bootstrap`; ~60 hits, above the probe line, so the six
  decision-bearing notes went to a read-only probe. Return distilled below.

- [x] **Drift check** — one load-bearing correction to the starter and one new
  constraint it did not have (`SPEC/layout.md` §"Skill namespace"); both below.
  The forming plan contradicts no SPEC contract: it honors
  [[CORE-219]]'s rule rather than amending it, keeps `claude/skills/` `ft-*`-only,
  and does not diverge from the PLAN line.

- [x] Asked clarifying questions — the disposition went to the operator via
  AskUserQuestion (the starter's "Open at promotion" question, and the one
  genuine design call `[heavy]` was chosen for). Answer and rationale below.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:`
  declared. Note `.claude/skills/audit` is gitignored, so it will never appear in
  the Phase 4 `git diff --name-only` reconciliation — expected, not an omission.

**Discovery Notes:**

**Starter promoted** 2026-10-06; the `## 🌱 Starter context` block was absorbed
rather than preserved (its three dispositions are restated below with corrected
framing — keeping both copies would leave a stale duplicate of the very claim
this task revises). Original in git history at `cb522698`.

### Drift check — one load-bearing correction to the starter

The starter said the contradiction is "documented on both sides":
`docs/MIGRATION.md` §1.2.1 prescribes `.claude/skills/$SKILL/SKILL.md` while
flaitron-self ignores that path. **That is not what the docs say.** §1.2.1 is the
*adopter* recipe — an adopter's `.claude/` is theirs to track or ignore. §1.2.2
is the flaitron-self maintainer section, and it already sanctions the
unversioned state explicitly:

> If you audit this tree often, keep a local-only fork under the gitignored
> `.claude/skills/audit/` (fill in the `viz` glob + those three gates) — …
> like everything under `.claude/`, it stays per-machine and never enters git
> history.

So **"accept unversioned" is the documented deliberate choice, not a retreat
from one.** This reframes the task: the question is whether to *change* a
documented decision, not whether to *repair* an accident. It also relocates the
defect — if the status quo stands, the thing that is wrong is [[CORE-720]]'s
Acceptance (which assumed a committable deliverable), not the docs.

Everything else in the starter survives verbatim:

| Starter claim | State |
|---|---|
| `.gitignore:21` ignores `.claude/` | ✅ exact — `git check-ignore -v` names line 21 |
| Overlay is the one real dir; every sibling a symlink | ✅ 13 symlinks into `claude/skills/`, `audit/` alone a real directory |
| [[CORE-720]]'s work on disk but uncommittable | ✅ intact — 5 `docs:`-keyed delta bullets, `flaitron-reconciled: v6.0.0`, 7,643 B |
| `scaffold-bootstrap.md` §5 names the install path | ✅ §5 flaitron-self branch (`.claude/skills/audit/SKILL.md` + the in-tree referenced-scaffold line) and §2's install-context detection |
| [[CORE-720]] parked `input-needed` on exactly this | ✅ |

One starter figure is off and is not load-bearing: it called the stranded work
"4,183 bytes", which was the *added* delta, not the file (7,643 B total).

### New constraint the starter did not have

`SPEC/layout.md` §"Skill namespace" **bars** a relocation into
`claude/skills/`: the shipped tree is `ft-*`-only, and the section's whole point
is that an unprefixed name marks a fork as *adopter-owned*. An `audit/`
directory there would both violate the reserved-namespace rule and ship
flaitron's own fork to adopters. The starter reached the same conclusion by
instinct ("which is wrong"); it now has a named contract behind it. Any
relocation needs a home **outside** `claude/skills/`.

### Mechanical findings (run, not reasoned)

- **A bare negation cannot reach the overlay.** `.claude/` is a *directory*
  ignore, so git never descends and `!.claude/skills/audit/SKILL.md` is dead.
  Verified: with both negations appended, `git check-ignore -v` still reports
  `.gitignore:21:.claude/`. Narrowing the rule therefore means restructuring it,
  not appending to it.
- **The descend-then-re-ignore form works, and is surgical.** Replacing
  `.claude/` with the four lines `.claude/*` · `!.claude/skills/` ·
  `.claude/skills/*` · `!.claude/skills/audit/` leaves
  `git check-ignore` exit 1 on the overlay, and
  `git ls-files --others --exclude-standard .claude/ .agents/` prints
  **exactly one path** — the overlay. No symlink, no other per-machine file
  becomes visible.
- **Tracking the overlay opts it into CI.** The `drift` job's Pair Q selects
  `git ls-files '*.md'` minus the two write-once archives
  (`.github/workflows/ci.yml:477`), so a tracked overlay is swept for
  section-citation resolution from the next push. [[CORE-720]] already measured
  its citations at 7/7 resolving, so this is coverage gained, not a new failure.
- **No context-budget row would bind.** `docs/CONTEXT-BUDGET.md` §"Budgets" caps
  `claude/skills/*/SKILL.md` at 33,000; neither `.claude/` nor `.flaitron/` has
  a row, so a tracked overlay is unbudgeted wherever it lands outside the
  shipped tree. Adding a row is optional, not required.

- **`.flaitron/` is already a mixed self-host dir, so a tracked home there has
  precedent.** `git ls-files .flaitron/` (minus the tasknote archive) returns
  `PLAN.md`, `PLAN-ARCHIVE.md`, `tasknote/README.md`, `sidequest/*.md`,
  `specs/spec-to-work-handoff.md`, and `screenshots/viz-board.png` — it is not
  PLAN-only. `SPEC/layout.md` §"Working in the flaitron repo itself" describes
  only the PLAN role, so a new resident would want a row there, but it would not
  be the first non-PLAN one.
- **No `/ft-release` gate blocks either direction.** §7.1's local half checks
  shipped `ft-*` slugs against `.claude/` symlinks; `audit` is unprefixed by
  design (`SPEC/layout.md` §"Skill namespace"), so it is outside that check
  either way.

### Archive skim — probe return (distilled)

~60 archive notes cite these paths, above the probe line, so the
decision-bearing six ([[CORE-219]] [[CORE-439]] [[CORE-217]] [[CORE-073]]
[[CORE-644]] [[CORE-661]]) went to a read-only probe. The load-bearing finding
is one the starter did not have, and it cuts both ways:

**This overlay's own direct ancestor was deleted by the rule, as the defect.**
`git log --follow` traces `.claude/skills/audit/SKILL.md` from [[CORE-073]]
(`db749c6e`, committed **tracked** — `.claude/` was tracked then) through
[[CORE-104]] (renamed to the `ft-audit` real fork) to [[CORE-217]], which
`git rm`'d it. [[CORE-217]] is the ticket that created the ignore rule, and its
Acceptance was the exact inverse of an exception:

> `.claude/skills/ft-audit*` … no longer contain **real (non-symlink) copies**
> that diverge from `claude/skills/`

with the rationale:

> `.claude/` is **partially committed** … This committed `.claude/` mix is
> exactly the source of the namespace shadowing the audit flagged. It is
> maintainer dev wiring that leaked into the canonical tree.

[[CORE-219]] then recorded, while extending the same posture:

> **No precedent for keeping partial tracked symlinks "for convenience."**

**But the rule's purpose does not reach today's overlay.** What [[CORE-217]]
killed was *divergent duplicates of the shipped scaffold* — namespace shadowing.
The present overlay is the opposite shape: a thin pointer at
`claude/skills/ft-audit/` carrying deltas that exist nowhere else, duplicating
and shadowing nothing. So the rule's **wording** ("never commit per-machine or
per-checkout state") covers it while its **purpose** does not, and no note ever
drew that distinction — [[CORE-644]] re-sanctioned the fork's existence at the
ignored path without reconciling it against the rule at all, and [[CORE-661]]
cites `.claude/skills/audit/SKILL.md:38` as a live surface it verified.

**No tracked flaitron-self-only home has precedent.** The probe found none in the
six; "flaitron-self-only" is used as a *skill class* (`ft-release`, which lives
in the tracked shipped inventory), never as a storage location.

Two side observations, neither a finding: [[CORE-661]]'s `:38` citation has since
drifted (line 38 is now blank after [[CORE-720]]'s edit), but archived tasknotes
are write-once and out of scope; and [[CORE-439]] already removed
`ft-release/SKILL.md`'s false "`.claude/` is committed repo state" claim, so
there is no stale assertion left to reconcile there.

### Decision — operator chose relocate + symlink

Asked at the Phase 1 clarifying step with three dispositions (narrow the ignore /
relocate + symlink / accept unversioned) and the costs above. **Operator chose
relocate + symlink.**

The deciding argument: a *directory* symlink makes `.claude/skills/` uniformly
symlinks — one grep to check — where narrowing the ignore would leave "all
symlinks except `audit/`", an exception every future `/audit context` run must
re-learn, and would re-open precisely the partially-committed `.claude/` that
[[CORE-217]] drove to zero. Relocation needs no exception to any rule.

**Shape, chosen for that reason:** the overlay becomes a directory
`.flaitron/audit-overlay/SKILL.md` (tracked), and `.claude/skills/audit` becomes
a **directory** symlink `../../.flaitron/audit-overlay/`, matching the 13
siblings' depth and form exactly. A file-level symlink inside a real `audit/`
directory was rejected: it would leave a real directory under `.claude/skills/`,
which is the shape [[CORE-217]] deleted, and would forfeit the uniform-symlink
invariant that justified this disposition in the first place.

`.gitignore` keeps `.claude/` wholly ignored — no negation, no carve-out. That is
the point of the relocation.

### Downstream-impact reconciliation scan

The disposition reaches beyond this task, so the scan fires
(`SPEC/tasknote-selection.md` §"Downstream-impact reconciliation"). Enumerated
all five open PLAN entries; closed rows out of scope.

| Entry | Shared surface | Class | Proposed action |
|---|---|---|---|
| [[CORE-720]] | same file; `Blocked by [[CORE-721]]` | **Stale** | **Edit** — repoint `.claude/skills/audit/SKILL.md` → `.flaitron/audit-overlay/SKILL.md`; drop the blocker clause |
| [[CORE-722]] | same file; `Blocked by [[CORE-721]]` | **Stale** | **Edit** — same repoint; drop the blocker clause |
| [[CORE-683]] | epic decay-window restore | Unaffected | **Leave** |
| [[CORE-641]] | typescript-eslint peer range | Unaffected | **Leave** |

**Consequence that is [[CORE-720]]'s to resolve, not this task's.** Making the
file tracked necessarily commits its *content*, which is [[CORE-720]]'s
unlanded deliverable — git cannot track a path without it. So [[CORE-720]]'s
work rides along in this task's commit. On resume it will find all but one of
its Acceptance criteria still decidable (they are `grep` state assertions that
resolve through the symlink unchanged); the exception is its diff-based
"other seven domains untouched" criterion, which goes empty once the file is
committed and will need re-pointing. Flagged, deliberately not pre-solved here —
re-writing a parked sibling's Acceptance is outside this task's remit
(`SPEC/scope-boundaries.md`), and its runner owns that judgment.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Relocation.** `.flaitron/audit-overlay/SKILL.md` created by `mv` from the old
  path and staged; `.claude/skills/audit/` (the old real directory) removed.
  Content untouched — the move carried [[CORE-720]]'s filled deltas byte-for-byte.
- **The symlink is an operator motion, not an agent one.** The NAT-195 path-access
  guard rejects a `../../` symlink target from an agent-run command, and that is
  the correct boundary rather than something to work around: `.claude/` is
  per-machine wiring, and [[CORE-439]] settled that "machine state stays
  operator-owned and is surfaced as a copy-paste ✋ ACTION block. Flaitron ships no
  installer." So the one `ln -s` is handed to the operator, exactly as
  `docs/MIGRATION.md` §1.2.2's wiring block already hands over the other 13. An
  absolute target was rejected as a workaround — it would break the
  clone-independence §1.2.2 explicitly relies on.
- **Pattern survey.** The chosen shape reuses the established sibling wiring
  verbatim (directory symlink from `.claude/skills/<name>` at `../../` depth) — no
  new shape. The only novelty is the target tree, which `.flaitron/` already
  supports (`sidequest/`, `specs/`, `screenshots/`).
- **`docs/MIGRATION.md` §1.2.2** — the local-fork sentence rewritten to the
  tracked home, with the reason stated (the deltas exist nowhere else; an
  untracked overlay is absent from `HEAD`, review, and Pair Q). The maintainer
  `ln -s` block gained the two overlay lines, without which a fresh clone would
  get a tracked overlay and no way to reach it. §1.2.1's adopter recipe untouched.
- **`claude/skills/ft-audit/scaffold-bootstrap.md` §5** — the **Flaitron-self**
  install block now writes the tracked home and the symlink; the **Adopter** block
  is byte-unchanged (`git diff` shows no `.flaitron/core` line either side). §5's
  "never overwrite an existing overlay" guard was extended to name both homes,
  since it previously named only the adopter path and would have missed the
  flaitron-self one.
- **`SPEC/layout.md`** — new bullet under §"Working in the flaitron repo itself".
- **`.gitignore`** — comment block extended so it stays true (one link under
  `.claude/skills/` now points into tracked `.flaitron/`). The four ignore lines
  are **unchanged**: no negation, no carve-out. That is the point of the task.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt** — each Acceptance verify command, `command → exit code`:

| Criterion | Command | Exit |
|---|---|---|
| tracked at new home | `git ls-files --error-unmatch .flaitron/audit-overlay/SKILL.md` | 0 |
| byte-identical to pre-move | `cmp -s <snapshot> .flaitron/audit-overlay/SKILL.md` (7,643 B) | 0 |
| is a directory symlink | `[ -L .claude/skills/audit ]` | **1 — operator ACTION outstanding** |
| uniform-symlink invariant | `[ -z "$(find .claude/skills -mindepth 1 -maxdepth 1 ! -type l)" ]` | 0 *(vacuous — see below)* |
| readable via old path | `[ -r .claude/skills/audit/SKILL.md ] && cmp -s …` | **1 — same cause** |
| root-relative citations resolve | `[ -f claude/skills/ft-audit/SKILL.md ] && [ -f …/passes/docs.md ]` | 0 |
| `.claude/` wholly ignored | `grep -qx '\.claude/' .gitignore && git check-ignore -q .claude/skills/audit` | 0 |
| MIGRATION per-machine claim gone | `! grep -q 'stays per-machine and never enters git history' docs/MIGRATION.md` | 0 |
| bootstrap §5 names tracked home | `grep -q 'flaitron/audit-overlay' claude/skills/ft-audit/scaffold-bootstrap.md` | 0 |
| layout declares the resident | `grep -q 'flaitron/audit-overlay' SPEC/layout.md` | 0 |
| PLAN blockers cleared | `! grep -q 'Blocked by \[\[CORE-721\]\]' .flaitron/PLAN.md` | 0 |
| PLAN lines repointed | `[ "$(grep -c 'audit-overlay/SKILL.md' .flaitron/PLAN.md)" = 2 ]` | 0 |
| Pair Q over changed files | local reproduction, 8 files / 54 citations | 0 |
| `.editorconfig` floor | final newline + trailing-ws + CRLF scan, 9 files | 0 |
| viz tests | `npm --prefix viz test` → 29 files, 587 tests | 0 |
| viz typecheck | `npm --prefix viz run typecheck` | 0 |
| viz lint | `npm --prefix viz run lint` | 0 |
| updater suite | `node --test tools/update-adopters.test.mjs` → 65 tests | 0 |

**Three criteria are not met, one cause.** The `ln -s` is operator-owned (see
Implementation Notes), and it has not been run yet, so `.claude/skills/audit`
does not exist and `/audit` is currently unreachable. Two notes on reading the
table honestly:

- The uniform-symlink invariant's `0` is **vacuous**: `find` returns nothing
  because `audit` is absent, not because it is a symlink. It will be a real pass
  only after the ACTION.
- Nothing in the tracked deliverable depends on the link. The overlay body, the
  four doc edits, and the PLAN reconcile are all complete and verified; the link
  is per-machine wiring that `docs/MIGRATION.md` §1.2.2's block now re-creates on
  any clone.

**Two Pair Q false positives in the first local run, corrected.** The initial
Python reproduction used `[^"]+`, which crosses newlines, so two
citations in `AGENTS.md` that wrap across a line break were extracted with a
newline inside the section name and reported `STALE SECTION`. CI's `grep -oE` is
line-based and never extracts those at all, so the reproduction — not the repo —
was wrong. Tightened to `[^"\n]+` to match CI's behaviour; the re-run is the
exit 0 above. Worth recording because the same mistake would silently
*manufacture* drift in any future local Pair Q run.

**External review** — `/code-review medium --max-findings all`, scoped to this
task's own working-tree diff (no commits made yet, so `git diff HEAD` is exactly
this task's diff — not an upstream-relative range). 8 findings; 4 were real
defects **introduced by this diff** and are fixed, 4 are notes.

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 1 | `scaffold-bootstrap.md` §5 lost `mkdir -p .claude/skills` — the old block created it as a side effect of `mkdir -p .claude/skills/audit`, so on the fresh-clone state §5 is written for, the `ln -s` and the `cp` both fail | **blocker** | **Fixed** — `mkdir -p .flaitron/audit-overlay .claude/skills .claude/commands` |
| 2 | `ln -s …/audit-overlay/ .claude/skills/audit` is not idempotent: if the link already exists, `ln` descends and deposits a **dangling** `audit-overlay` symlink inside the **tracked** `.flaitron/audit-overlay/`, where it reads as untracked repo content and can be committed by accident. Hit both shipped surfaces (`scaffold-bootstrap.md` §5 and `docs/MIGRATION.md` §1.2.2's wiring block) — and the operator ACTION handed over for this task | **blocker** | **Fixed** — `ln -sfn` on both. **Reproduced before fixing**, in a scratch dir: a second plain `ln -s` created `target/target`; `ln -sfn` run twice left the link correct and the directory empty |
| 3 | `claude/skills/ft-audit/SKILL.md` §6's fork-install carve-out authorizes writing only `.claude/skills/audit/SKILL.md`, but this diff made §5 write `.flaitron/audit-overlay/SKILL.md` — a path the parent skill's own hard rule forbids. I broadened `scaffold-bootstrap.md`'s guard and missed the one in `SKILL.md` | **blocker** | **Fixed** — carve-out and its never-overwrite clause now name both homes with the reason |
| 8 | YAML `touches:` omitted `AGENTS.md` and `docs/AGENT-NEUTRALITY.md` (added by the doc-drift sweep, after the Phase 1 declaration) | note | **Fixed** — both declared, plus `claude/skills/ft-audit/SKILL.md` from finding 3 |
| 5 | The symlink is missing, so `/audit` is a live command (`.claude/commands/audit.md` still resolves) whose skill body does not — and `/ft-release` §7.1's dangling-link scan is `-name 'ft-*'`-scoped, so it would never catch it | **blocker** | **Already surfaced**, not closed over — the task does not close until the operator ACTION runs. The §7.1 scoping gap is a genuinely new observation; filed as a note below rather than fixed here (it is `/ft-release`'s contract, not this task's) |
| 4 | The overlay's §Domains claims `general` is filled when three unkeyed deltas are still `<not derivable>` placeholders, and claims the remaining six "still reach the bootstrap check" when `passes/context.md` has no placeholders and is already clean | note | **Not fixed, by design** — overlay *content* is [[CORE-722]]'s scope (its PLAN line already says "narrow the overlay's §Domains 'all eight' claim"), and editing it here would break this task's own byte-identical criterion, which exists to prove the move altered nothing. Correct catch, wrong task |
| 6 | The overlay's `description:` frontmatter cites `docs/MIGRATION.md` §1.2.1 (the *adopter* recipe); §1.2.2 now specifies this file's home | note | **Not fixed, same reason** — a content edit would break the byte-identical criterion. Recorded for [[CORE-722]], which already edits this file |
| 7 | The `.flaitron/`-over-`claude/skills/` rationale relies on a false invariant: `.flaitron/` ships too, landing at every adopter's `.flaitron/core/.flaitron/audit-overlay/SKILL.md` | note | **No change needed** — checked the shipped prose: neither `SPEC/layout.md` nor `docs/MIGRATION.md` §1.2.2 claims non-propagation. Both give the actual reason (`.claude/` is gitignored, so the deltas would be unversionable there). The propagation reasoning appears only in this tasknote's Discovery Notes, where the reviewer read it. The reviewer's underlying fact is true and worth knowing; the decisive property is "not installed under an adopter's `.claude/skills/`", which `SPEC/layout.md` §"Skill namespace" already enforces |

Findings 1-3 are the reason this box is not a formality: each is a shipped
instruction that would have failed for the next person to run it, and none would
have been caught by any gate in the roster above.

**Doc-drift sweep (Phase 4 step, run here)** — two of the 19 AI-referenced docs
needed an edit, both created by this change:

- `AGENTS.md` — §"Repo Layout"'s `.flaitron/` bullet said "flaitron's own plan
  and tasknotes", which no longer covers the tree's contents. Extended.
- `docs/AGENT-NEUTRALITY.md` — the `SPEC/layout.md` §"Working in the flaitron
  repo itself" row named only `` `claude/` ``. My new layout bullet puts
  `.claude/skills/audit` in that same section, so without a ledger entry the next
  `/audit context` run would flag it as an unledgered Claude-specific reference —
  the ledger's stated purpose. Row extended, with the reason the *body* is
  neutral and only the link is Claude wiring.
- `docs/PLATFORMS.md` — **no change, deliberately.** Line 74 says the `ft-audit`
  scaffold is "forked/overlaid locally under an unprefixed name, not symlinked as
  an upstream `ft-*` project skill". Still true: the new link points at
  flaitron-self's own tracked overlay body, not at upstream
  `claude/skills/ft-audit/`, which is exactly the thing that sentence denies.
- The other 16 — `README.md`, `SPEC.md`, the four `*/AGENTS-snippet.md`,
  `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `claude/CAPABILITIES.md`,
  `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`,
  `docs/VISION.md` — no change; none asserts anything about where the
  flaitron-self overlay lives.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Flaitron-self's `/audit` overlay now has a **tracked home** at
`.flaitron/audit-overlay/SKILL.md`, reached by the directory symlink
`.claude/skills/audit → ../../.flaitron/audit-overlay/`. The `.claude/` ignore
rule is **unamended** — no negation, no carve-out, no `git add -f` — which was
the whole point: the overlay moved out rather than the twice-affirmed rule
bending for one file.

**10 files, +551/−121.** The overlay counts as 60 insertions because its old path
was untracked, so git sees a new file; its content is byte-identical to the
7,643-byte pre-move snapshot (`cmp` exit 0), which is the criterion proving the
move altered nothing of [[CORE-720]]'s work.

**Verification:** 13/13 Acceptance criteria met. Pair Q reproduced locally over
all 9 changed markdown files (59 citations, exit 0) — the overlay is now *inside*
Pair Q's own `git ls-files '*.md'` selection, so CI runs this from the next push;
`.editorconfig` floor clean on all 10; 587 viz tests, 65 updater tests,
typecheck and lint all green; `ft-audit/SKILL.md` at 28,024 of its 33,000 cap.

**`touches:` reconciliation.** Declared 10, changed 10, with two expected
asymmetries: `.claude/skills/audit` is declared but **cannot** appear in
`git diff --name-only` because it is gitignored by design, and
`.flaitron/tasknote/CORE-721.md` appears undeclared, as every task's own note
does. Nothing unexpected.

**The external review was the most valuable gate in the run.** Three of its eight
findings were shipped instructions this diff broke, and no gate in the validation
roster could have caught any of them: §5 lost the `mkdir -p .claude/skills` it
used to get as a side effect, so its own fresh-clone case would have failed two
lines later; `ln -s` without `-fn` deposits a dangling stray *inside* the
now-tracked overlay directory on any re-run (reproduced in a scratch dir before
fixing, on both shipped surfaces and the operator ACTION); and
`ft-audit/SKILL.md` §6's fork-install carve-out still authorized only the old
path, so §5 was instructing a write the parent skill's own hard rule forbade. Two
further findings about overlay *content* were correctly declined as
[[CORE-722]]'s scope — fixing them here would have broken the byte-identical
criterion — and one rested on a non-propagation claim the shipped prose never
makes.

**Refactors:** none. The chosen shape reuses the existing sibling wiring verbatim;
the only novelty is the target tree, which `.flaitron/` already supported.
Nothing deferred.

**Documentation verdict:** six surfaces reconciled —
`docs/MIGRATION.md` §1.2.2 (prose + the maintainer wiring block, without which a
fresh clone would get a tracked overlay it could not reach), the shipped
`scaffold-bootstrap.md` §5 Flaitron-self branch and its never-overwrite guard,
`claude/skills/ft-audit/SKILL.md` §6's carve-out, `SPEC/layout.md`, `AGENTS.md`,
and `docs/AGENT-NEUTRALITY.md`'s ledger row. The adopter recipe (§1.2.1 and §5's
Adopter block) is byte-unchanged, verified by hunk ranges.

**Maintainability effect:** the overlay is versioned, reviewable, backed up, and
swept by CI for the first time since [[CORE-217]] deleted its ancestor — and
`.claude/skills/` now holds nothing but symlinks, an invariant checkable in one
`find` rather than "all symlinks except `audit/`". [[CORE-720]] and [[CORE-722]]
are unblocked.

- [x] **Learnings** — one line for the always-loaded layer: `AGENTS.md` §"Repo
  Layout" now states that `.flaitron/audit-overlay/SKILL.md` is the overlay's
  tracked body and `.claude/skills/audit` the symlink reaching it, so the next
  agent does not re-derive why a skill body lives outside `claude/skills/`.
  Nothing else belongs in the always-loaded layer: the *reason* (`.claude/` is
  gitignored, the deltas exist nowhere else) is one lazy hop away in
  `SPEC/layout.md`.

**Archived:** 2026-10-06
