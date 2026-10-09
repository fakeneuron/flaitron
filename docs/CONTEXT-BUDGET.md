# Context budget

Per-file byte budgets for the surfaces an agent loads to run one flaitron task,
and the measured ledger of what each surface costs today.

This is a **mechanism** under [SPEC.md](../SPEC.md) Core Principle #3 ("One task
per context window"), not a new principle. [[CORE-382]] deliberately demoted
context economy from flaitron's pitch to a mechanism; this doc keeps it there.
Nothing below is a promise about how any particular agent allocates its window —
it is a promise flaitron makes about the size of the files it ships.

> **This doc is read at release time, not at task time.** It is not part of the
> always-loaded set it measures, and adding it there would defeat its own point —
> [[CORE-194.1]] declined a `CONTEXT.md` mega-doc for exactly that reason
> ("always-loaded competes with SPEC + SPEC modules + currently-loaded SKILL for
> context budget"). Read it when cutting a release, when a budget is questioned,
> or when planning a split.

## Why byte budgets

[[CORE-EPIC-223]] split `SPEC.md` at ~40,000 chars into `SPEC/gates.md` and
`SPEC/tasknote-selection.md`, projecting `SPEC.md` down to ~24,700. Its Phase 3
verified the result with `wc -c` and recorded the margin. Three months later
`SPEC.md` was 77,322 and `gates.md` 51,812 (measured at [[CORE-535.1]]).

Nothing went wrong except that no number was ever written down. The split had no
ratchet, so every task after it added a paragraph and none subtracted one, and
the ~40,000 figure survived only as an oral working number — [[CORE-508]] went
looking for it and found no cap in `SPEC.md`, `SPEC/`, `docs/`, `AGENTS.md`, or
`CONTRIBUTING.md`. The budgets below are that missing ratchet.

**Bytes, not tokens.** `wc -c` is exact, reproducible, and needs no tooling
(Core Principle #2, Zero scripts). Tokens are roughly chars/4 for English
markdown — good enough to reason with, too tokenizer-dependent to gate on.

## Budgets

Checked on every push by the CI `drift` job and at every release cut by
`/ft-release` §7.1 (see "How this is enforced").

| Surface | Budget (chars) | Why this number |
|---|---|---|
| `SPEC.md` | 49,000 | The always-loaded contract, read in full by every lifecycle skill. Sized to hold ~2 substantial contract-edit working units (a substantial edit runs +1,127 to +2,957 chars — see `gates.md`'s row for how the unit is measured). Extract-don't-raise is the standing remedy when headroom erodes; cap history below. |
| `SPEC/gates.md` | 19,500 | Lazy in principle, per-task in practice: the first conditional gate loads it, and almost every task hits one. Sized to hold ~2 substantial gate-contract edits (~2,500 chars each) since the flag-posture split moved a chunk of the old cap's headroom out; cap history below. |
| `SPEC/gate-postures.md` | 22,000 | The `--fast` / `--unattended` postures and the flag×surface matrix, split out of `gates.md`. Budgeted although lazy — a split that un-budgets what it moves has gamed the number rather than met it (§Ledger, lazy fragments). Sized to file size plus ~1.5 working units (~1,400 chars per substantial posture edit); on a three-edit sample the next substantial posture edit should trim or extract before this cap raises. |
| `SPEC/post-closure.md` | 10,000 | The three post-archive steps — commit decision, 🏁 marker plus next-move suggestion, copy-paste line — split out of `SPEC.md`. Budgeted although lazy — it arrives only at a closing runner's final step, once the tasknote is archived — for the same un-budgets-what-it-moves reason as `gate-postures.md`. Sized like its siblings: the file plus ~1.5 working units. |
| `SPEC/task-line-segments.md` | 10,000 | The per-segment table, the worked examples, and the `[unattended]`-candidacy proposal contract, split out of `SPEC.md` §"Task-line format". Budgeted for the same reason as its siblings. Sized like its siblings: the file plus ~1.5 working units. The split point is read-vs-write, not frequency — a runner *capturing* a row at Step 1 needs only the grammar block and the ordering rule, both of which stay in `SPEC.md`; the per-token write semantics travel here. |
| `SPEC/tasknote-selection.md` | 12,500 | The use/skip routing, the filing-discipline word budget, and the downstream-impact scan. Lazy by declaration, near-universal in practice: every filing and runner skill cites it, so it is budgeted like its loaded siblings. Sized like them: the file plus ~1.5 working units. |
| `claude/skills/*/SKILL.md` | 33,000 | One skill body is loaded per task, on top of `SPEC.md`. Sized to give the largest ordinary body — `ft-open-epic` (32,749 since [[CORE-766]]'s Model-clause edit, from 32,663 after [[CORE-741.4]]'s routing-skill sweep; `ft-close-epic` 28,321) — now ~250 of headroom, under one working unit, so its next substantial edit extracts a lazy fragment (a substantial skill edit runs +1,187 to +3,390 chars). Not lowered when `ft-task` dropped below it: much of that drop moved into `preamble.md`, which has its own row below, rather than leaving the run. Extracting a lazy fragment ([[CORE-556.2]]) is the preferred remedy over raising this cap when a body is genuinely overgrown rather than merely near its line. |
| `claude/skills/ft-task/preamble.md` | 9,000 | The one `ft-task` fragment read on **every** run — the Step 1 / 1.5 preamble shared with `/ft-micro-task` ([[CORE-724.4]]), single-sourced rather than branch-gated. Budgeted because a fragment that loads every run is body by another name, and leaving it uncapped would let the `SKILL.md` row be met by moving bytes. Sized like `post-closure.md`: the file plus ~1.5 working units. |
| `claude/skills/ft-release/SKILL.md` | 40,000 | More specific row wins. A release cut is a whole-repo motion whose skill is loaded alone, never alongside a tasknote, and this body is already post-trim ([[CORE-507]] cut it from ~77,000 to 37,274). Budgeted rather than exempted so it still ratchets. |
| `claude/skills/ft-release/**` | 113,000 | Directory total — every file under the skill, summed, not a per-file cap. The row above caps only the body, and the ledger's own §"Skill bodies" note says why that is not enough: fragments defer load, they do not remove it, and a release cut walks every fragment in this directory on every cut. Sized to the directory's measured total plus ~1.5 working units — a working unit here is a new mirror pair or CI binding, which across the last twenty touching commits ran +4,000 to +5,300. |
| `SPEC/procedures/ft-task.md` | 34,200 | The always-loaded runner body for Codex/Cursor/Grok tasks — this project's non-Claude equivalent of `claude/skills/ft-task/SKILL.md`, read in full on every such task's cold start. Sized like its lazy-but-near-universal siblings: file size plus ~1.5–2.3 working units (a substantial edit runs +524 to +892 chars, a routine one +1 to +420). What would consume the remaining headroom in one task is a new mode at [[CORE-473.4]]'s scale — the case §"Known over budget" exists for. |

**Precedence:** the most specific matching row wins. `ft-release`'s own row
governs it; every other `SKILL.md` falls under the glob row. A `/**` row is
outside that precedence: it is a directory total, checked in addition to
whatever per-file rows its files match, never instead of them.

**Headroom is judged per row, in working units.** Each row's "Why this number"
says how many units it is sized to hold — its own measured unit, or a sibling's
where it is "sized like its siblings"; that, not a flat percentage, decides
whether a surface is short. A 10% figure is a fair shorthand where the unit is
small, but it misreads a row like
`claude/skills/ft-release/**`, whose unit is +4,000–5,300: 8.8% there is ~2
units ([[CORE-671]], settling the heuristic [[CORE-670.N]] measured against).

**Not budgeted, deliberately:** `docs/`, archived tasknotes, `tools/`, `viz/`,
and the lazy `SPEC/` modules other than `gates.md`, `gate-postures.md`,
`post-closure.md`, `task-line-segments.md`, `tasknote-selection.md`, and
`SPEC/procedures/ft-task.md`. None of them is loaded to
run an ordinary *Claude* task, so capping them would ration bytes that cost
nothing there — but that framing is scoped to Claude's own load path:
`SPEC/procedures/ft-task.md` is the always-loaded runner body on the
Codex/Cursor/Grok path, which is why it earns its own row above rather than
falling under this exemption. A lazy module that starts arriving on most
tasks (on any supported runner) earns a row here; until then it does not.
`docs/MIGRATION.md` and `docs/PLATFORMS.md` are exempt by name, not only by
the `docs/` glob: they are the two largest files that clause covers, and every
reader addresses them by section, never whole ([[CORE-670.4]]; figures and
re-budget trigger in §"Ledger" → "Large reference docs").

## Cap history

Raise/lower deltas for the `## Budgets` rows above, collapsed out of their
"Why this number" cells by [[CORE-662]] so those cells stay one line each.
One row per surface, oldest → newest; a bare number with no `→` is the cap a
row was budgeted at on first appearing in this table, not a change.

| Surface | History |
|---|---|
| `SPEC.md` | 50,000 split target [[CORE-535.1]] → 55,000 [[CORE-555]] → 57,000 [[CORE-558.5]] → 53,000 [[CORE-607]] (extracted `post-closure.md`) → held 53,000 [[CORE-664]] (extracted `task-line-segments.md`) → 49,000 [[CORE-724.2]] (restatement + archaeology trim, 47,056 → 42,901) |
| `SPEC/gates.md` | set [[CORE-535.1]]; split (cue vocabulary, discipline prose) [[CORE-535.5]] → 35,000 → 40,000 [[CORE-555]] → 25,000 [[CORE-604.2]] (extracted `gate-postures.md`) → 19,500 [[CORE-724.2]] ("Moved to" stubs retired, restatements cut, 20,454 → 14,314) |
| `SPEC/gate-postures.md` | split from `gates.md`, budgeted 23,000 [[CORE-604.2]]; re-measured, no change [[CORE-631.3]] → held 23,000 [[CORE-671]] (trimmed 21,592 → 20,409) → 22,000 [[CORE-724.2]] (20,409 → 19,840) → held 22,000 [[CORE-738]] (open-siblings stop; 21,482) |
| `SPEC/post-closure.md` | split from `SPEC.md`, budgeted 12,000 [[CORE-607]] → 10,000 [[CORE-724.2]] (8,389 → 7,787) |
| `SPEC/task-line-segments.md` | split from `SPEC.md` §"Task-line format", budgeted 10,000 [[CORE-664]] |
| `SPEC/tasknote-selection.md` | budgeted 12,500 [[CORE-724.3]] (routing prose compressed, 15,217 → 10,706) |
| `claude/skills/*/SKILL.md` | 30,000 [[CORE-535.2]] → 33,000 [[CORE-558.5]] → held 33,000 [[CORE-724.4]] (re-justified against `ft-epic-discovery`; `ft-task` 29,387 → 23,437, partly moved into `preamble.md`) → held 33,000 [[CORE-729]] (skill/pin guard, ~770 bytes in each of seven bodies; `ft-epic-discovery` 30,765) → held 33,000 [[CORE-726]] (`ft-epic-discovery` 32,081; next edit extracts a fragment) → held 33,000 [[CORE-730]] (+114 bytes in each of the seven guard copies; `ft-epic-discovery` 32,195, a one-clause fix, not a substantial edit) → held 33,000 [[CORE-736]] (`.N` sibling + cascade clauses; `ft-epic-discovery` 32,296) → held 33,000 [[CORE-738]] (cascade folded into the Capture list; `ft-epic-discovery` 32,302) → held 33,000 [[CORE-741.4]] (`[frontier]` routing clauses; `ft-epic-discovery` 32,663) |
| `claude/skills/ft-task/preamble.md` | budgeted 9,000 [[CORE-724.4]] (shared ft-task / ft-micro-task preamble, 7,276) → held 9,000 [[CORE-738]] (open-siblings hook; 8,164) |
| `claude/skills/ft-release/SKILL.md` | budgeted 40,000, post-trim from ~77,000 [[CORE-507]] |
| `claude/skills/ft-release/**` | measured but unbudgeted through [[CORE-613]] (117,337, exceeding the body row unseen) → budgeted 125,000 [[CORE-622.2]] → 113,000 [[CORE-750]] (re-sized to measured + ~1.5 units after [[CORE-734]]'s pair retirements cut the directory to 106,247, leaving ~4 units of slack) |
| `SPEC/procedures/ft-task.md` | budgeted 38,000 [[CORE-608]]; re-measured, no change [[CORE-631.3]] → held 38,000 [[CORE-670.3]] (debug-mode restatement routed to `step-4-debug-mode.md`) → held 38,000 [[CORE-678.2]] (post-closure and cross-repo restatement routed back to their modules; 37,538 → 34,302) → 34,200 [[CORE-724.4]] (Phase 4 and drift-carve-out restatement routed to SPEC; 34,320 → 32,740) → held 34,200 [[CORE-738]] (open-siblings entry stop; 33,800) → held 34,200 [[CORE-741.4]] (`[frontier]` routing clause; 33,842) |

Full narrative provenance for any of the above — exact per-commit deltas,
which task found which headroom figure — lives in `git log -p --
docs/CONTEXT-BUDGET.md` and in the cited tasknotes' archives, not here.

## Known over budget

Self-liquidating. A surface listed here **with an open owner** is informational
at the release gate; a surface over budget **without** one blocks the cut. Each
owning task deletes its own row at closure, so the exemption expires on its own
and needs no later flip.

*Empty.* [[CORE-535.5]] deleted the last row (`SPEC/gates.md`, 51,809 → 32,299)
at its own closure, as the rule above intends. Every budgeted surface is under
its cap.

## Ledger

Measured 2026-10-09 at v6.1.0, refreshed by [[CORE-767]] — the release cut,
which re-measured the four command-covered subsections. The large-reference
figures stay the 2026-09-22 readings named in that subsection. Refreshed by
`/ft-release` §7.1 in the same cut that reads it — if these numbers are stale,
the cut that made them stale skipped its own standing check.

**Default-path cold start.** A ledger row, not a budget — nothing here is
CI-enforced; it sums the surfaces a flagless `/ft-task <ID>.<sub>` reads before
any Phase 1 write: `claude/skills/ft-task/SKILL.md`
(25,430) + `claude/skills/ft-task/preamble.md` (8,215) + `SPEC.md` (43,217) +
`.flaitron/tasknote/README.md` (10,731) + `templates/tasknote-template.md`
(3,993) + `SPEC/gates.md` (13,812) + `SPEC/epic.md` (5,738) = **111,136 chars**
(≈28k tokens; `.flaitron/PLAN.md`'s own band, below, is excluded since it isn't
a flaitron-shipped surface). Re-measured at [[CORE-674]] — the −231 since [[CORE-664]]'s 121,840 is `gates.md` losing
464 (unrelated trims) against `ft-task/SKILL.md` +218 (CORE-656's review-probe
box) and `SPEC.md` +15, net of the rest holding flat. Tracks
the trend [[CORE-EPIC-604]] set out to cut: [[CORE-604.1]] measured ≈172k chars
at v5.28.0 before the epic's tiering (gate-postures split, runner/stub/`model.md`
trim, rotation-bound lower, and [[CORE-605]] dropping `SPEC/plan-filing.md`
off this sum by softening its three Closed-line/Step-3 citations to
consult-when-unclear pointers), and [[CORE-607]] then took `SPEC.md` from
53,999 to 47,265 by moving the post-closure protocol — consulted only after
the tasknote is archived — off this path into `SPEC/post-closure.md`. The
+1,008 on `ft-task/SKILL.md` since [[CORE-607]]'s 117,719 reading is
[[CORE-EPIC-610]]'s executable pre-archive gate; the +1,719 since
[[CORE-613]]'s 118,727 is mostly the tasknote README's guard-history
paragraph ([[CORE-622.3]], +1,065) plus `SPEC.md`'s `/ft-seed` and
fixtures pointers (+566); unchanged at v5.31.0 ([[CORE-642]]). The +502 since
is mostly the tasknote README's sweep-set-exclusion paragraph naming
`docs/PHILOSOPHY.md` / `docs/DOGFOOD.md` / `docs/CONTEXT-BUDGET.md` /
`docs/VERSION-HISTORY.md` (+498, [[CORE-650]]); the rest is single-digit drift
across `SPEC.md` and `ft-task/SKILL.md`. Re-measured at [[CORE-684]]: `SPEC.md`
47,007 (+84, [[CORE-660]]), `gates.md` 20,444 (+112, [[CORE-660]]), `epic.md`
5,959 (−168); the other four rows held. Sum **121,637** (+28).
Re-measured at [[CORE-690]]: the seven cold-start inputs held (`SPEC.md`'s
version token stayed the same length). Sum **121,637**.
Re-measured at [[CORE-712]]: `gates.md` 20,454 (+10, [[CORE-691]]), `SPEC.md`
47,006 (−1, the `v6.0.0` token); the other five rows held. Sum **121,646** (+9).
Re-measured at [[CORE-767]], with `ft-task/preamble.md` (8,215, every-run since
[[CORE-724.4]]) added to the sum: [[CORE-EPIC-724]]'s context diet took
`SPEC.md` 47,006 → 43,217, `ft-task/SKILL.md` 29,338 → 25,352, `gates.md`
20,454 → 13,812, the template 5,635 → 3,993, and `epic.md` 5,959 → 5,738; the
tasknote README moved −3 and the command stub held. Sum **113,578** (−8,068,
net of the preamble's first count). [[CORE-769.2]] retired the
`claude/commands/ft-task.md` stub, taking its 2,520 off the path; the
`argument-hint:` line it carried moved into `ft-task/SKILL.md` (+78); the
other rows keep their [[CORE-767]] readings. Sum **111,136**.

[[CORE-664]] re-measured every row rather than differencing one against the
v5.32.0 snapshot, and found the snapshot had gone stale on three of them —
`ft-task/SKILL.md` 28,105 → 29,117, the tasknote README 10,379 → 10,734, the
template 5,188 → 5,635, none of them this task's doing. The path had therefore
drifted to **125,953** before this task, not the 120,948 recorded above. CORE-664
took **−4,113** off it — `SPEC.md` 51,024 → 46,908 by moving the §"Task-line
format" segment table into `SPEC/task-line-segments.md`, plus +3 on
`ft-task/SKILL.md` for a repointed citation — landing 121,840.

**Read that as a caution about this ledger, not just a number.** A per-file
figure here is a snapshot, and the sum is only true when every row is measured
at the same moment. Refreshing one row against six stale ones produces a
plausible total that describes no state the repo was ever in — CORE-664 did
exactly that on its first pass (writing a −965 that its own external review
caught), which is why the rows above are now all re-measured together and
stamped to this task rather than to v5.32.0.

### Always loaded to run one task

| Surface | Chars |
|---|---|
| `SPEC.md` | 43,217 |
| `claude/skills/ft-task/SKILL.md` | 25,352 |
| `claude/skills/ft-task/preamble.md` | 8,215 |
| `AGENTS.md` (`CLAUDE.md` is a symlink to it) | 8,400 |
| `.flaitron/tasknote/README.md` | 10,731 |
| `templates/tasknote-template.md` | 3,993 |
| `.flaitron/PLAN.md` | ~2–3k (band — see below) |

**Why `.flaitron/PLAN.md` carries a band and not a number.** Every other surface
in this ledger changes only when a task deliberately edits it, so a drifted
figure there is *signal* — it says an always-loaded surface grew, which is what
the ratchet exists to catch. PLAN.md changes on **every** closure regardless of
what the task was about, because closure itself rewrites a task line. Its exact
size therefore reports how many tasks happen to be open today, not the size of
anything flaitron ships: an adopter receives `templates/PLAN.md` (measured under
§"Adopter-side always-loaded") and then grows their own. A precise figure here
would be falsifiable on every commit and informative on none.

Do not "correct" the band back to a `wc -c` reading. [[CORE-537]] chose it over
*dropping* the row — `/ft-task` really does read PLAN.md in full, so the section
would understate its own total without it — and over *marking it
release-refreshed*, which the §"Ledger" stamp above already says of every row
and which would still leave this one stale between closures. The row stays
unbudgeted for the same reason it is banded: flaitron cannot cap a file it does
not ship.

### Lazy `SPEC/` modules

`procedures/ft-task.md` 33,842 · `gate-postures.md` 21,482 ·
`plan-filing.md` 18,525 · `model.md` 17,816 ·
`cue-vocabulary.md` 16,838 · `blocked.md` 14,888 ·
`gates.md` 13,812 · `unattended-candidacy.md` 13,130 ·
`tasknote-selection.md` 10,604 · `plan-parser.md` 9,368 ·
`loop.md` 8,428 · `post-closure.md` 8,307 · `layout.md` 6,225 ·
`task-line-segments.md` 5,976 · `epic.md` 5,738 ·
`scope-boundaries.md` 5,583 · `procedures/README.md` 5,119 ·
`tasknote-inserts.md` 4,031 · `superseded-claims.md` 2,947 ·
`starter.md` 2,520 · `versioning.md` 1,349.
Re-measured 2026-10-02 at v5.34.0 ([[CORE-684]]). Deltas since the v5.33.0
stamp: `gates.md` 20,332 → 20,444 and `SPEC.md` 46,923 → 47,007 ([[CORE-660]],
both still under cap), `plan-filing.md` 17,176 → 18,622, `epic.md` 6,127 →
5,959. `procedures/ft-task.md` and `gate-discipline.md` already matched the
[[CORE-678.2]] and [[CORE-660]] re-measurements and did not move again.
Re-measured 2026-10-02 at v5.35.0 ([[CORE-690]]). Deltas since that stamp:
`model.md` 14,636 → 14,765 ([[CORE-688]]), `post-closure.md` 7,823 → 8,389
([[CORE-685]]). The other lazy rows held.
Re-measured 2026-10-04 at v6.0.0 ([[CORE-712]]). Deltas since that stamp, all
from the rename sweep ([[CORE-711.4]]) and the cite sweep ([[CORE-691]]):
`procedures/ft-task.md` 34,302 → 34,295, `gates.md` 20,444 → 20,454,
`plan-filing.md` 18,622 → 18,660, `cue-vocabulary.md` 15,135 → 15,213,
`blocked.md` 14,627 → 14,655, `plan-parser.md` 9,331 → 9,364, `loop.md`
8,476 → 8,428, `scope-boundaries.md` 5,371 → 5,472, `starter.md` 2,494 →
2,520, `versioning.md` 1,219 → 1,349. The other lazy rows held.
Re-measured 2026-10-09 at v6.1.0 ([[CORE-767]]). [[CORE-724.3]] retired
`gate-discipline.md` (into `docs/GATE-DISCIPLINE.md`) and `purpose-blurb.md`
(into `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb"), so both rows are gone. Largest
deltas since that stamp: `gates.md` 20,454 → 13,812 and `tasknote-selection.md`
15,217 → 10,604 ([[CORE-724.2]] / [[CORE-724.3]]), `model.md` 14,765 → 17,816
(the `[frontier]` rung and §"Effort recommendations", [[CORE-EPIC-741]]),
`cue-vocabulary.md` 15,213 → 16,838 (the folded purpose blurb),
`gate-postures.md` 20,409 → 21,482. The rest moved under ±900.

`gates.md` and `tasknote-selection.md` are lazy by declaration and
near-universal in practice; `plan-filing.md` was too until [[CORE-605]]
softened its three Closed-line/Step-3 citers (`SPEC.md`,
`templates/tasknote-template.md`, `claude/skills/ft-micro-task/SKILL.md`) from
inline "per ..." loads to consult-when-unclear pointers, so it now loads only
when a closure genuinely needs the exception/rotation/filing-commit detail;
the rest genuinely load only on their task shape. [[CORE-535.3]]
added six of the modules above by moving narrow-use sections out of `SPEC.md`
— which is why the `SPEC/` total grew while the always-loaded set shrank.
[[CORE-535.5]] added two more the same way, out of `gates.md`: neither
`cue-vocabulary.md` (reference — loaded when composing or interpreting a cue)
nor `gate-discipline.md` (folded into `docs/GATE-DISCIPLINE.md` by [[CORE-724.3]]) is consulted by an
ordinary run, which is why neither earned a budget row. [[CORE-595]] split
`tasknote-selection.md` (28,952 → 15,236) the same way, moving its three
PLAN.md-row contracts — filing commits, the `## Completed` stub form, and
rotation — into `plan-filing.md`; both halves are near-universal (every
closure loads the stub form) but each is now half the size; [[CORE-724.3]]
later budgeted `tasknote-selection.md` anyway, as near-universal. [[CORE-604.2]] split `gates.md` (35,910 →
20,804) the same way, moving the `--fast` / `--unattended` postures and the
flag×surface matrix into `gate-postures.md` (19,029) — genuinely lazy, loaded
only when a flag or the `[unattended]` row marker is set, and budgeted anyway
because it was budgeted before it moved. [[CORE-607]] moved §"Post-closure
protocol" (7,273) out of `SPEC.md` into `post-closure.md` the same way —
consulted only at a closing runner's final step, after the tasknote is
archived, so it leaves the cold-start path entirely — and budgeted it on the
same grounds, lowering `SPEC.md`'s cap 57,000 → 53,000 rather than letting the
moved bytes widen the core's headroom.

### Skill bodies (`SKILL.md` only)

ft-release 35,146 · ft-open-epic 32,749 · ft-close-epic 28,323 · ft-task
25,352 · ft-file-task 24,971 · ft-update 19,794 · ft-audit 18,392 ·
ft-micro-task 18,195 · ft-refactor 16,486 · ft-adopt 13,935 · ft-seed-unattended
12,433 · ft-audit-repo 11,577.

`ft-goal-task`, `ft-spec`, `ft-starter-task`, `ft-worktree-start`, and
`ft-worktree-end` were retired at v5.27.0 (CORE-570/571/572/573), folded into
`ft-task`, `ft-file-followup --starter` (renamed `ft-file-task` at v7.0.0), and demoted content; `ft-flowtron`,
`ft-stats`, and `ft-audit-context` followed at v5.29.0 (CORE-603.2/603.3), the
last folded into `ft-audit` as its `context` domain — eight fewer rows here
across the two cuts, not eight fewer surfaces flaitron covers.

Lazy fragments are not counted against a skill's row — they arrive later, and
only on the branch that needs them. Whole-directory totals for the two largest:
`ft-release` 107,012, `ft-task` 85,291. Splitting a body into fragments defers
load; it does not remove it ([[CORE-507]] §2.5), so a skill that fragments its
way under the cap without shedding content has gamed the number rather than met
it. For `ft-release` that is no longer only a ledger observation: its
`claude/skills/ft-release/**` row in §"Budgets" caps the directory total, so
the gaming case fails the same check the per-file rows do. `ft-task`'s
directory stays a ledger figure — its fragments are genuinely branch-gated
(`--debug`, `--loop`, `--unattended`), where `ft-release`'s all load on every
cut. The one exception is `preamble.md`, read on every `/ft-task` and
`/ft-micro-task` run, which is why it carries its own §"Budgets" row.

### Adopter-side always-loaded

`claude/AGENTS-snippet.md` 12,890 (pasted into the adopter's `AGENTS.md`) ·
`templates/tasknote-README.md` 4,839 · `templates/PLAN.md` 3,048.

### Large reference docs

`docs/PLATFORMS.md` 67,894 · `docs/MIGRATION.md` 62,249 (measured
2026-09-22 at [[CORE-670.4]]). Up from 21,497 and 33,194 on 2026-06-01
(3.2× and 1.9×), so neither has ever had a ratchet.

[[CORE-670.4]] **exempted** both rather than budgeting them. A budget here
caps what a runner loads, and no runner loads either file whole. Each reader
goes to one section: `ft-adopt` follows MIGRATION §1.1–§1.7, §2, §3, and
§"Pinning and bumping"; `ft-release` greps the `describe --tags` pin, `awk`s
§1.6, and checks PLATFORMS §"Installed-surface policy"; `SPEC/model.md` points
at PLATFORMS §"Platform×model×effort calibration table"; `SPEC/procedures/ft-task.md`
names PLATFORMS §"Non-Claude capability triggers" for one branch. Both files are on the
§"AI-referenced docs" sweep list. The sweep checks them against the contract
each task touched and does not read them in full. Capping the file total would
limit bytes no task pays for. It would also miss the real risk: one section
growing large enough that a runner reads the whole file to find it.

A doc earns a §"Budgets" row when a runner starts reading it in full, meaning
a skill or procedure step that names `docs/X.md` without a section. Until then,
watch the sections instead. The largest ones readers cite today are PLATFORMS
§"Non-Claude capability triggers" at 34,235 and MIGRATION §1.2.1 at 11,992
(ft-adopt cites §1 by subsection). When a cited section outgrows its
reader, split the section rather than cap the file. These figures are refreshed
with the rest of the ledger, and a jump between cuts means checking which
section grew.

## How this is enforced

Two layers, both reading this table rather than restating it, and one
shell: the `context_budget` function in `tools/drift-checks.sh`, a
`wc -c`-and-compare against the Budgets table above. The `drift` CI job runs
it on every push to `main` and every pull request, catching a regression on
the commit that lands it. The standing check in
[`claude/skills/ft-release/step-7.1-standing-checks.md`](../claude/skills/ft-release/step-7.1-standing-checks.md)
runs the same function at every release cut, then additionally
applies the §"Known over budget" judgment above (which needs
`.flaitron/PLAN.md` ownership context CI does not have) and refreshes the
§"Ledger" above — both stay release-only.

**Every number lives here and is restated nowhere.** The check measures; this doc
decides. That is deliberate: [[CORE-465]] retired a §7.1 check whose failure mode
was a hand-maintained roster kept in two places, and its lesson — "stop counting,
start deriving" — applies to a budget as much as to a skill list. A budget
duplicated into the check would drift from the budget written here, and the gate
would be guarding its own stale copy.

## Not on the doc-drift sweep list

`docs/CONTEXT-BUDGET.md` is deliberately **not** in `.flaitron/tasknote/README.md`
§"AI-referenced docs", and should not be added.

[[CORE-491]] settled that membership means *swept for drift*, which this doc's
numbers plainly do — on nearly every commit. But [[CORE-492]] records the
countervailing rule: every entry on that list is walked at *every* Phase 4
closure, and that per-task cost is why `SPEC/*.md` and the skill bodies are
excluded from it. These numbers already have a better owner than a per-task sweep
— the release check reads and refreshes them in the same motion. Adding the doc
would buy a permanent "no change (numbers owned by `/ft-release`)" line at every
closure and catch nothing the release gate misses.

The prose above still drifts like any doc. It is swept when a budget changes,
which is the only time it can go wrong.
