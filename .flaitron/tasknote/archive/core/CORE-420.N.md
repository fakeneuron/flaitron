---
title: release-surface-sync audit
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-420, CORE-420.2, CORE-420.3, CORE-420.4, CORE-420.5]
---

# CORE-420.N | release-surface-sync audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-420]]

## 🎯 Goal

Verify the completed `CORE-EPIC-420` (`release-surface-sync`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] The epic's own theme holds inside its own fix — the four mirror pairs encoded by `CORE-420.5` still return their documented clean signal at HEAD, and the fix children's edits have not re-drifted
- [x] `CORE-420.5`'s explicitly deferred miss (`claude/skills/ft-flowtron/SKILL.md` roster table as a fourth instance of the mirror class) is adjudicated — fixed in place or filed as a follow-up candidate, not silently dropped
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-420.N — audit CORE-EPIC-420` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-420.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-420.N.md`
- [x] Parent-flip prompt surfaced after audit closure — user confirms or declines flipping `CORE-EPIC-420` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Re-run `CORE-420.5`'s four encoded mirror-pair commands at HEAD — confirm each still returns its documented clean signal
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Adjudicate the `ft-flowtron` roster-table miss deferred by `CORE-420.5`
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-420.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: prompt user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-420]] — parent epic: release-surface-sync
- [[CORE-420.2]] — README mirror fixes (counter, templates roster, manual-path range)
- [[CORE-420.3]] — codex wrapper fold descriptions (`--debug`, `--park`)
- [[CORE-420.4]] — sidequest template back-link depth
- [[CORE-420.5]] — `/ft-release` §7.1 standing mirror-pair check (the gate)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-420.N`; pre-flight passed with a clean tree, all four implementation children (`.2`–`.5`) closed 2026-08-09, and `.N` the sole open child. No early-audit decision was needed — the cohort is complete. The audit has real work beyond formality: `CORE-420.5` closed with an explicit **"Observed, not fixed"** hand-off naming `claude/skills/ft-flowtron/SKILL.md`'s roster table as a fourth instance of the epic's own mirror class, routed to this audit by name.

- [x] Read relevant source files — all four archived cohort tasknotes (`archive/core/CORE-420.{2,3,4,5}.md`, full Goal/Acceptance/Final Summary), `claude/skills/ft-release/SKILL.md` §7.1 (the gate `.5` built), `.flowtron/tasknote/README.md` §"AI-referenced docs", and each cohort-touched surface at HEAD. Read set bounded and known — no probe needed.

- [x] **Best Practices Review** — `N/A` — the cohort's deliverables are markdown docs, skill prose, and a template back-link; no code module, dependency direction, or abstraction boundary is in scope.

- [x] **Archive skim** — self-referential, as expected for an epic audit: the four cohort children *are* the relevant archive entries and were read in full. Non-cohort context pulled from their `related-tasks`: `CORE-411` (filed the Standing README task-counter check), `CORE-390` / `CORE-391` (the v5.15.0 folds that minted the Codex description drift), `CORE-383` (the README escape hatch carrying the `§1.1–1.6` citation `.2` corrected).

- [x] **Drift check** — every path and line number the cohort cited still resolves at HEAD: `README.md:22-23` (counter), `README.md:57` (`§1.1–1.7`), `README.md:255` (roster), `SPEC.md:55` (roster twin), `templates/sidequest-template.md:12` (`../PLAN.md`), `codex/skills/ft-{task,file-followup}/SKILL.md:3`. `docs/MIGRATION.md`'s heading span is genuinely §1.1 … §1.7, so `.2`'s range fix is correct rather than merely changed. No contradiction with `SPEC/epic.md` or the PLAN line.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **one clarification surfaced** (scope of the `ft-flowtron` roster miss: fix inline vs. defer whole), taken to the Phase 1→2 operator gate per `SPEC/gates.md`'s `default-fire-on-clarifications` flavor.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory (four children, all closed 2026-08-09).**

| Child | Deliverable | Shape |
|---|---|---|
| `CORE-420.2` | README counter 606→625, `templates/` roster + `subagent-probe`, manual-path `§1.1–1.6`→`§1.1–1.7` | 4 files, +9/−9; scope widened at the Phase 1→2 gate from 1 file to 4 (same stale strings mirrored in `docs/MIGRATION.md` ×3, `docs/AGENT-NEUTRALITY.md` ×1, `ft-flowtron/SKILL.md` ×1) |
| `CORE-420.3` | Codex `ft-task` `--debug` + `ft-file-followup` `--park` fold descriptions | 2 files, +2/−2; sibling sweep of the other 16 Codex descriptions found no further *fold*-derived instances |
| `CORE-420.4` | `templates/sidequest-template.md:12` back-link `../../PLAN.md`→`../PLAN.md` | 1 file, +1/−1; repo-wide re-grep confirmed single-instance |
| `CORE-420.5` | `/ft-release` §7.1 **Standing mirror-pair check** (Pairs A–D) + 3 Codex descriptions | 4 files, +46/−3; scope widened at the gate (Pair B red on arrival: `--deep`/`--fast`/`--write` undocumented on the Codex side) and narrowed (Pair D cross-referenced to `CORE-411`, not restated) |

**Cohort arc.** `.2`/`.3`/`.4` each closed one *instance* of the mirror-drift class; `.5` closed the *gate* so the class fails a release-time command instead of surviving to a reader. Both `.2` and `.5` widened scope at the Phase 1→2 gate on the same stated reasoning — shipping a partial fix would leave the epic's own theme alive inside the epic's own fix. That precedent is directly relevant to this audit's one open question.

**Gate re-run at HEAD (`/ft-release` §7.1 Standing mirror-pair check, all four pairs).**

- **Pair A** (templates roster ↔ `templates/`) — **green.** `ls templates/` returns 10 files; `README.md:255` and `SPEC.md:55` carry a byte-identical roster clause naming every one (seed files as `PLAN.md` / `tasknote-README.md`, tasknotes by qualifier).
- **Pair B** (Claude flags ↔ Codex descriptions) — **green.** Loop prints nothing across all 18 slug-paired skills. The quote-strip behaves as `.5` documented: `ft-goal-task`'s `args="… --fast … --worktree"` illustrations are correctly excluded rather than counted as documented flags.
- **Pair C** (template back-link ↔ write target) — **green.** Four templates carry `../PLAN.md`; the stale-depth grep returns nothing repo-wide, not merely inside `templates/`.
- **Pair D** (README counter ↔ archive count) — **drifted, and correctly so.** `README.md:22` reads 625; the archive now holds 628. The delta is exactly the three sibling closures (`.3`, `.4`, `.5`) that landed after `.2` computed the figure. This is the counter behaving as `.2` described it — "a one-cut patch by design," recomputed by §7.1's Standing README task-counter check at the next release. Not an audit finding; fixing it here would re-stale it the moment this tasknote archives (629).

**Numbering observation (not a finding).** The cohort has no `.1` Discovery child — children start at `.2` because `/ft-audit-repo` supplied Discovery externally on 2026-08-08. Sibling `CORE-EPIC-421`, filed in the same audit-repo run, uses the identical `.2`-first numbering. Consistent established pattern for audit-repo-seeded epics, and `SPEC/epic.md`'s `.N`-is-terminal invariant is unaffected.

**Open question taken to the Phase 1→2 gate.** `.5`'s deferred miss is confirmed at HEAD — and is **larger than `.5` recorded**. `.5` named two absent flags; the roster table is actually missing three:

| Roster row | Flag documented on the Claude skill | In `ft-flowtron` roster? |
|---|---|---|
| `/ft-task` | `--debug` | ❌ **missing** — not named by `.5` |
| `/ft-epic-discovery` | `--deep` | ❌ missing (named by `.5`) |
| `/ft-spec` | `--fast` | ❌ missing (named by `.5`) |
| `/ft-file-followup` | `--park` | ✅ present |
| `/ft-stats` | `--write` | ✅ present |

The roster's *skill* coverage is complete (all 18 shipped `ft-*` slugs present) — only flag coverage is short. Two separable pieces: the **instance** (three clause additions, mechanical) and the **gate** (the roster is a fifth mirror surface no §7.1 pair covers — a design call about whether to add a Pair E or extend Pair B's loop).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the one inline fix extends the roster table's established flag-clause shape rather than inventing one. Two rows already document a flag (`/ft-file-followup` — "`--park` parks an idea or quick fix instead: …"; `/ft-stats` — "Read-only screen; `--write` also flushes to …"): backticked flag, active verb, appended as a trailing clause to the existing one-liner. The three new clauses follow that form exactly — no new row, no new column, no nested list.

- [x] **Minimal refactor gate** — no refactor made or deferred. The fix is three trailing clauses in one table; nothing structural was in scope.

- [x] Implemented the minimal solution — 1 file, +3/−3.

- [x] Updated/added tests for non-trivial behavior — `N/A`, no code surface. Verification is the re-run of `/ft-release` §7.1's encoded commands plus table-structure assertions (Phase 3).

**Implementation Notes:**

**Audit verdict: the cohort is coherent.** Four children, four distinct surfaces, no contradictory cross-refs, no regression in any earlier-shipped child. One finding, routed here by name from `CORE-420.5`'s own closure.

**Cohort coherence pass.**

- **Naming/style parity** — all four children used the same fix idiom (single-line text substitution against a named source of truth, verified by a re-grep that must return zero live hits). `.5`'s §7.1 block matches the section's established shape: bold header → rationale paragraph → fenced command → resolution rule, identical to the four Standing checks preceding it.
- **Cross-refs** — `.3`'s Final Summary names `.5` as the gate that closes its class; `.5`'s Related block names `.2`, `.3`, `.4` with accurate per-pair attribution; §7.1's Pair A/B/C/D rationales cite `CORE-420.3`, `CORE-420.4`, `CORE-420.5`, `CORE-411`, `CORE-EPIC-420`. Every citation checked and correct. No child claims a deliverable another child actually shipped.
- **No regressions** — `.2`'s three README edits, `.3`'s two Codex descriptions, and `.4`'s back-link all read at HEAD exactly as their tasknotes describe. Nothing later in the cohort overwrote anything earlier.
- **`SPEC/epic.md` invariants** — cohort children stayed 2-space nested beneath the active parent through every closure; none was moved to top-level `## Completed`. `.N` remained terminal.

**Finding F1 — `ft-flowtron` roster missing three flag clauses (fixed inline).**

`claude/skills/ft-flowtron/SKILL.md`'s "Bundled skills" table is a fifth instance of the epic's mirror class: it restates each skill's capability one-liner, so a flag added to a skill's own `description:` strands the roster. `CORE-420.5` flagged this as "Observed, not fixed" and routed it here. **The audit confirmed it and found it one item larger** — `.5` named `--deep` and `--fast`; `--debug` on `/ft-task` was also absent, plausibly because `.5`'s attention was on the two flags its own Pair B work had just touched.

Fixed at operator direction (Phase 1→2 gate, "fix instance, file gate"):

| Row | Clause added |
|---|---|
| `/ft-task` | `` `--debug` drives it hypothesis-first for a bug, regression, or unexpected behavior whose root cause is unknown (expected vs observed → ranked hypotheses → minimal repro → re-verify). `` |
| `/ft-epic-discovery` | `` `--deep` stages a `constitution → specify → clarify` pre-pass first, for high-uncertainty epics. `` |
| `/ft-spec` | `` `--fast` skips the review pause, still never auto-writing. `` |

Each clause was written from the source skill's own `description:` rather than paraphrased from memory, and compressed to roster length. Roster flag coverage is now 5/5 (`--debug` · `--deep` · `--fast` · `--park` · `--write`).

**Scope check on the fix.** The roster's *skill* coverage was already complete — all 18 shipped `ft-*` slugs present, no missing or retired rows — so only flag coverage needed the edit. The Codex twin (`codex/skills/ft-flowtron/SKILL.md`) delegates to the Claude body (`Read and follow ../../../claude/skills/ft-flowtron/SKILL.md`) rather than restating the table, so the roster has exactly one authoring site and there is no sixth instance to fan out to.

**Finding F2 — the roster has no release-time gate (follow-up candidate, not fixed).**

`/ft-release` §7.1's Pair B compares Claude `description:` frontmatter against Codex `description:` frontmatter. The `ft-flowtron` roster is a *body*-level restatement of the same facts, so no encoded pair covers it — F1 could recur on the next flag fold exactly as it did on the last one. Encoding it (a Pair E block, or extending Pair B's loop to also scan the roster body) is a design call with real substance: the command must avoid the same illustration-string false positives `.5` measured on Pair B, and must decide whether an *absent* row is drift or an intentional omission. Out of scope for an audit fix per the operator's gate decision.

→ **`/ft-file-followup` candidate:** encode the `ft-flowtron` roster ↔ skill-flag mirror as `/ft-release` §7.1 Pair E (or extend Pair B), closing the class F1 closed only by instance.

**Non-findings, recorded so a later reader does not re-litigate them.**

- **Pair D counter (625 vs 628).** Not drift. `.2` computed 625 with its own note landing; `.3`/`.4`/`.5` archived after, each +1. §7.1's Standing README task-counter check recomputes at the next cut, and this tasknote's own archival makes it 629 — patching it here would be stale before the commit lands.
- **Missing `.1` child.** The cohort starts at `.2` because `/ft-audit-repo` supplied Discovery externally on 2026-08-08. Sibling `CORE-EPIC-421` from the same run numbers identically. Established pattern, not a gap.
- **`ft-goal-task`'s `--fast` / `--worktree`.** Absent from Pair B's flag set by design — they appear only inside `args="…"` illustrations, which `.5`'s load-bearing quote-strip correctly excludes. Verified as intended behavior, not a check false-negative.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code surface. The changed file is a markdown skill body; the repo's suites (`npm --prefix viz test`, `node --test tools/update-adopters.test.mjs`) cover the viz app and the updater, neither of which reads this roster. Substituted verification is the §7.1 command re-run below.

- [x] Ran lint/type-check on changed code — `N/A` for the same reason; no linter in this repo covers skill markdown. Table structure asserted mechanically instead (below).

- [x] **Quality assertions** — no duplication introduced (each clause states its flag once, in the row that owns it); no dead or unexplained content; no public-surface growth (three trailing clauses, no new row or column); the roster is *less* stale than before the edit, which is the deliverable.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-prose verification, since the audit's only edit is three table clauses.

**Gate re-run after the edit — all four §7.1 mirror pairs still green.**

| Pair | Command | Result |
|---|---|---|
| A — templates roster | `ls templates/` + `grep -n 'canonical tasknote templates' README.md SPEC.md` | 10 files, both clauses byte-identical and complete |
| B — Claude flags ↔ Codex descriptions | the §7.1 `for` loop over all slug-paired skills | **no output** — re-run *after* the edit specifically to prove the roster change introduced no false positive (it edits body text, not `description:` frontmatter, so Pair B is correctly blind to it) |
| C — back-link ↔ write target | `grep -rn '](\.\./PLAN\.md)' templates/` + stale-depth grep | 4 templates correct; stale grep empty repo-wide, not merely under `templates/` |
| D — README counter | `find .flowtron/tasknote/archive -name "*.md" \| wc -l` | 628 vs README's 625 — expected accumulation, see Implementation Notes |

**Table-structure assertions on the changed file.**

- `awk -F'|'` field count on the three edited rows → `3` each, matching every untouched row (2-column table, leading + trailing pipe). No clause introduced an unescaped `|` that would split a cell.
- `grep -c '^| \`/ft-'` → **18**, unchanged before and after; matches `ls claude/skills | grep '^ft-' | wc -l`. No row lost or duplicated.
- Flag-coverage sweep → `--debug` · `--deep` · `--fast` · `--park` · `--write` each present exactly once (1 occurrence per flag, so no clause was accidentally pasted twice).
- `git diff --stat` → `1 file changed, 3 insertions(+), 3 deletions(-)`; `git diff -U0` confirms all six changed lines are the three edited rows and nothing else.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**Cumulative sweep across the whole `CORE-EPIC-420` cohort — 14/14 no change.** This is the epic-level sweep the fixed line exists for: not "did *this* task drift a doc" but "did the cohort, in aggregate, leave the declared doc set consistent." Four of these entries were themselves edited by `CORE-420.2`, so each was re-read at HEAD rather than assumed.

| # | Doc | Verdict |
|---|---|---|
| 1 | `README.md` | **No change.** Edited by `.2` (counter, roster, `§1.1–1.7`); all three verified at HEAD. Counter reads 625 against an archive of 628 — expected accumulation from the three sibling closures, owned by §7.1's Standing README task-counter check at the next cut, deliberately not patched here (would restale to 629 on this note's archival). |
| 2 | `SPEC.md` | **No change.** Line 55's roster clause byte-matches `README.md:255` — the Pair A invariant holds. Line 548's `subagent-probe-template.md` reference resolves. |
| 3 | `docs/MIGRATION.md` | **No change.** Edited by `.2` (three `§1.1–1.6`→`§1.1–1.7` fixes at lines 10/16/46). Heading span independently confirmed to be §1.1 (Add submodule) … §1.7 (Verify), so the range is correct rather than merely consistent. |
| 4 | `claude/AGENTS-snippet.md` | **No change.** Cohort added and retired no skill, so the symlink-wiring block and its consumer counts are untouched. |
| 5 | `codex/AGENTS-snippet.md` | **No change.** The cohort edited Codex *skill descriptions*, not the adopter snippet; the installed-surface policy subset is unchanged. |
| 6 | `docs/CONVENTIONS.md` | **No change.** No commit/versioning/formatting convention in scope. |
| 7 | `CONTRIBUTING.md` | **No change.** No contribution-model surface in scope. |
| 8 | `SECURITY.md` | **No change.** No threat-model surface in scope. |
| 9 | `docs/AGENT-NEUTRALITY.md` | **No change.** Edited by `.2` (the `§1.1–1.7` citation in the `CORE-383` quickstart row); verified at HEAD. The ledger's Claude-specific rows are unaffected — this audit's roster edit lands in `claude/skills/`, the wiring layer, which the ledger explicitly does not track. |
| 10 | `docs/PLATFORMS.md` | **No change.** The slug-scoped parity claim still holds (18 Claude ↔ 18 Codex, no slug added or removed); the `.flowtron/sidequest/` write-target reference at line 238 matches Pair C's table; `Last verified` stamps stay at `v5.15.0 · 2026-08-02` — the cohort shipped no new platform wiring, only description and roster text. |
| 11 | `claude/CAPABILITIES.md` | **No change.** Its `--park` row (line 33) already documents the `.flowtron/sidequest/<ID>.md` write target `.4` corrected the template against — consistent, not drifted. Last-verified `v5.15.0 · 2026-08-02` stands; no Claude capability trigger changed. |
| 12 | `docs/AGENT-COMPAT.md` | **No change.** The Codex row's consume-mode, entry-point, and skill primitive are all unchanged by `.3`/`.5`'s description edits, so the currency stamp does not move. |
| 13 | `docs/EXTERNAL-AGENTS.md` | **No change.** No delegation, handoff, or one-agent-per-tasknote surface in scope. |
| 14 | `docs/WORKTREES.md` | **No change.** No worktree convention in scope; the cohort ran no `wt-*` isolation. |

Note on scope: `claude/skills/ft-flowtron/SKILL.md` — this audit's one edited file — is deliberately **not** in the swept set. `.flowtron/tasknote/README.md` excludes `claude/skills/*/SKILL.md` from the cold-start sweep as lazily-loaded. That exclusion is precisely why Finding F2 matters: the roster is a mirror surface outside both the doc-drift sweep and §7.1's encoded pairs.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The `CORE-EPIC-420` cohort holds together: four children fixed four instances of
one drift class, the fifth built the release-time gate that catches the class,
and all four of that gate's encoded checks return green at HEAD. The audit found
one real miss — the same class living in a fifth surface the gate does not cover
— fixed the instance, and filed the gate as a follow-up.

**The finding.** `claude/skills/ft-flowtron/SKILL.md`'s roster table restates
every skill's capability one-liner, making it a mirror surface with no binding to
its source. `CORE-420.5` spotted this at its own closure and routed it here rather
than absorbing or dropping it. The audit confirmed it and found it **one item
larger than `.5` recorded**: `.5` named `--deep` and `--fast` as absent; `--debug`
on `/ft-task` was missing too. That undercount is itself the epic's thesis in
miniature — a mirror checked by eye gets checked incompletely, which is why `.5`
built a command instead.

**Evidence.** 1 file, +3/−3 — three trailing clauses appended to the `/ft-task`,
`/ft-epic-discovery`, and `/ft-spec` rows, each written from the source skill's own
`description:` and compressed to roster length, following the flag-clause shape the
`/ft-file-followup` and `/ft-stats` rows already used. Verified by: all four §7.1
pair commands re-run post-edit (Pair B specifically, to prove the body edit
introduces no frontmatter false positive — silent); `awk -F'|'` field count `3` on
each edited row matching every untouched row; row count 18 before and after,
matching `ls claude/skills | grep '^ft-'`; flag-coverage sweep showing all five
flags present exactly once. Roster flag coverage 2/5 → 5/5; skill coverage was
already 18/18 and needed nothing.

**Deferred, with reasons.** The *gate* for this fifth surface is filed rather than
built: §7.1's Pair B compares `description:` frontmatter to `description:`
frontmatter, and extending it to a table body is a design call — the command must
dodge the illustration-string false positives `.5` measured, and must decide
whether an absent row is drift or intent. Building that inside an audit would have
been the cohort's largest scope widening, and the operator chose instance-inline /
gate-filed at the Phase 1→2 gate.

**Non-findings recorded so they are not re-litigated.** The README counter reads
625 against 628 archived tasknotes — exactly the three sibling closures that landed
after `.2` computed it, owned by §7.1's standing check and deliberately unpatched
(this note's own archival makes it 629). The cohort has no `.1` child because
`/ft-audit-repo` supplied Discovery externally; sibling `CORE-EPIC-421` numbers
identically. `ft-goal-task`'s `--fast`/`--worktree` stay outside Pair B's flag set
because they appear only in `args="…"` illustrations — the quote-strip working as
designed, not a false negative.

**Refactors:** none made, none deferred — three trailing clauses in one table;
nothing structural was in scope.

**Documentation verdict:** documentation *is* the deliverable. Cumulative
cohort-wide sweep returned 14/14 "no change", with the four entries `.2` edited
re-read at HEAD rather than assumed, and `docs/MIGRATION.md`'s §1.1–1.7 span
independently re-derived from its actual headings.

**Maintainability effect.** Every documented flag flowtron ships is now discoverable
from all three surfaces an operator might read — the skill's own description, its
Codex mirror, and the `/ft-flowtron` info screen. Two of those three are now
gate-protected; the third is the open follow-up. The epic's net position: a drift
class that previously surfaced only when a reader tripped over it now fails a
release-time command across four pairs, with the fifth pair scoped and filed rather
than forgotten.

**Archived:** 2026-08-09
