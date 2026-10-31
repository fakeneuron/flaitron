# `[unattended]` candidacy

> Lazy-loaded SPEC module. Read by a filing surface at its write step — the moment it is about to write a `- [ ]` row into `PLAN.md` — by `/ft-seed-unattended` before it walks an existing plan, and by a runner whose closure discharged a deferred step through `/ft-file-task --unattended`. Not needed to run a task. See `SPEC.md` for the always-loaded core spec.

The `[unattended]` marker ([`SPEC/task-line-segments.md`](task-line-segments.md)) is
scarce for an accidental reason: nothing in the filing flow ever asks whether
a row qualifies. Every filer writes rows at the point of fullest context — it
has just read the surrounding code, drafted the description, and chosen the
`[model]` tag — and then discards the one judgment an operator-less caller
will later need. This module makes each filer **propose** candidates as part
of its ordinary pass, without changing who writes the token.

## Recommend, never write

**Flaitron itself never writes `[unattended]` — seeding is an operator act.**
That sentence is [`SPEC/task-line-segments.md`](task-line-segments.md)'s,
and this module preserves it verbatim. Candidacy is a *recommendation*: the
filer names the rows the predicate below admits, and the token lands on a row
only when the operator confirms that row **inside the confirm gate the surface
already has** — the structured-ask write-step review, the prose "show the
line, edit per feedback" gate, the reconcile review prompt. The confirmation
is the act. No surface gains a new gate to host the proposal; a surface with
no gate (`/ft-file-task --park`) has no candidacy at all.

Three consequences follow, and each is a boundary rather than a feature:

- **A posture with no operator act writes nothing.** `--fast` skips the
  review that would have been the act; `--unattended` declares there is nobody
  to perform it. Both *emit* the candidates and write no token (§"Three
  postures"). A caller that files rows cannot mark its own
  ([`docs/EXTERNAL-AGENTS.md`](../docs/EXTERNAL-AGENTS.md) step 2) — this
  module is how the caller learns which rows the operator might mark, not a
  way around that rule.
- **No autonomy chain.** A row proposed under `--unattended` stays unmarked
  until an operator confirms it in an attended session. Readers keep denying
  by default; an unmarked row is still undecided, not approved.
- **Not a cue, not a gate.** The proposal rides an existing ask and the
  emission line is a report. Neither adds a row to
  [`SPEC/cue-vocabulary.md`](cue-vocabulary.md), a checklist box, a banner,
  or a phase. The two-banner cap is untouched.

## Candidacy predicate

Evaluated over the **drafted row text** — the exact `- [ ]` line the filer is
about to write — plus, for epic children, the closure state of the siblings
clause 6 names, and, for the basis arms of clauses 1 and 3, the row's starter tasknote
(§"Readiness basis"). Every clause must hold; the first miss disqualifies the row.
The predicate is deliberately conservative: a false negative leaves a row
undecided, which is the status quo, while a false positive is exactly what
the operator's confirm exists to catch — so when a clause is uncertain, the
row is **not** a candidate.

1. **`[model]` is `[light]` or `[moderate]`** (legacy `[medium]` included)
   **or a concrete name of that tier, or `[heavy]` or a heavy-tier name
   with a complete, operator-confirmed readiness basis**
   (§"Readiness basis").
   A bare `[heavy]` row and a missing tag both fail. Heavy work is design or
   ambiguity work. It is dispatchable only once a starter has settled that
   design and the operator has confirmed the result. A row with no model
   declared has not been scoped enough to be dispatched blind.
   A concrete name reads by its inherent tier. That is the "Band at
   default effort" cell of `docs/PLATFORMS.md` §"Platform×model×effort
   calibration table", for a roster token or for a model a cell names at
   one band (`sol`, in the `gpt-5` row). A name off the roster reads by
   the calibration baseline in [`SPEC/model.md`](model.md)
   §"Category-vs-concrete matching" (`haiku`). So `haiku` reads light;
   `sonnet`, `grok`, `codex`, and `sol` read moderate; `opus` reads heavy
   and needs the basis. A name neither source can tier to one band fails:
   `gpt-5` and `gemini-flash`, whose cells span several bands, and any
   name neither lists. The token still pins the runner: the model gate
   stops a run on any other model.
   **Never admitted**, checked before the tier read: `[frontier]`,
   `[xheavy]`, and the frontier names `fable`, `mythos`, and `astra`, plus
   any name the roster bands frontier at its default. The three names are
   an operator exclusion, not a roster reading (the roster bands Astra
   heavy at its default). No basis admits them, and no preparation is
   offered (§"Preparing declined rows" → **Stay**).
2. **Not `[!critical]`.** The urgency flag exists to pull an operator's eye to
   the row, which is the opposite of "safe with nobody present."
3. **No operator hand-off signal.** A `[handoff]` marker on the drafted row
   ([`SPEC/task-line-segments.md`](task-line-segments.md)) is **definitive** — the
   operator has declared the row stops for a human act, so it is never a
   candidate and nothing below is consulted. On an unmarked row the screen
   falls back to the row text, minus the row's own bold ID
   (`**DEPLOY-054**`) and every backticked span (`` `migrations/0001` ``,
   `` `docs/MIGRATION.md` ``), which name things rather than ask for a
   person. Anything left that holds one of the cue glyphs `👁️` `🗄️` `▶️`
   `📡` `💻` `✋`, or one of the words *operator*, *hand-off* / *handoff*,
   *manual*, *credential*, *secret*, *password*, *physical*, *cross-repo*,
   *production*, *deploy*, *migration*, trips. A keyword inside another ID
   or a path outside backticks still trips. Two layers. That list is the mechanical screen,
   and it stays that list: do not add visual or raster keywords to close a
   miss. A keyword miss is not a semantic pass, and neither is a skipped
   span. An LLM filer and `/ft-seed-unattended` decline a row that reads as
   needing a person even when no keyword trips. They always decline a row
   whose work falls in §"Never autonomous", whatever its basis; that is
   where a backticked `` `wrangler deploy` `` is caught. A row whose
   described work changes a rendered surface reads as needing a person
   too: its Phase 3 👁️ is a person's look
   ([`SPEC/gate-postures.md`](gate-postures.md) §"Park conversions"). The
   exception is a row whose starter carries a complete, operator-confirmed
   readiness basis, (d) included: its deciding spec stands where the look
   would, so the rendered surface alone no longer declines it
   (§"Readiness basis"). Candidacy decides only what may be marked. How an
   `--unattended` run handles that row's 👁️ is the runner's rule, in the
   same §"Park conversions". Candidacy never proposes
   `[handoff]` itself; like `[unattended]`, it is written only by the operator.
4. **No `Blocked by` clause of any form** — `Blocked by [[ID]]`, bare `Blocked
   by`, or a `blocked-by:` echo. A blocked row is by construction waiting on
   something outside itself.
5. **Not a parent `<AREA>-EPIC-<N>` row.** The parent is a checkbox with no
   tasknote and no runner; only children are driven.
6. **Epic-child rule.** A `.1` Discovery row is never a candidate — it is a
   scoping conversation, and `[heavy]`-or-above by convention. Every other child waits
   on siblings, and each must be **settled**: already `- [x]`, or being
   proposed in the **same pass with the same candidacy**. A `.k` row waits on
   the sibling it follows — its stem predecessor per the `.1`'s
   `## 🌳 Fan-out`, or `.k-1` when undeclared — so a candidate cannot be the
   first open row in a sequential chain whose head is not one. A `.N` audit
   row (or a legacy numeric audit child) waits on every other child of its
   parent, `.1` included — an audit runs after every child, so an unsettled
   sibling would park it on drift (`/ft-close-epic` accepts `--unattended`, so
   an audit tagged `[light]` or `[moderate]` is otherwise coherent).

Three filers carry their own carve-outs on top: `/ft-audit`'s trivial-fix rows
(written and closed in one motion — nothing to dispatch), `/ft-open-epic`
Step 4's parent + `.1` lines (clauses 5–6 by construction), and the epic
parents and `.N` placeholders `/ft-audit-repo` files at first contact.

## Readiness basis

A **readiness basis** is the set of facts that makes a row dispatchable
with nobody present when its line alone is not enough. It is required for a
`[heavy]` or heavy-tier-name row and for a row whose work changes a
rendered surface. A row clause 1 never admits gains nothing from one.
A `[light]` or `[moderate]` row that renders nothing needs none. The basis
lives in the row's **starter tasknote**
([`SPEC/starter.md`](starter.md)), in sections the starter template already
ships plus one new one, so no new file type exists and the PLAN.md line
keeps its single `[unattended]` token. A basis is **complete** when all of
these hold:

- **(a) Scope.** YAML `touches:` is declared and non-empty. It names the
  paths the run is confined to.
- **(b) Deciding acceptance.** The starter's `### Acceptance that decides
  it` sub-heading lists at least one criterion. Every criterion names the
  command that decides it, per the verify-command rule in
  [`SPEC.md`](../SPEC.md) §"🧪 Phase 3: Testing & Linting", and none is
  marked `judgment` or `👁️`. An unfilled template placeholder
  (`<Criterion>`, `<verify command>`) is not a criterion. Promotion copies
  this list into `## ✅ Acceptance` verbatim.
- **(c) Nothing open.** The sub-heading starting `### Open at promotion`
  (the template ships it with a parenthetical suffix) is empty, holds only
  the template placeholder, or is absent. An open question is a decision
  nobody present can make.
- **(d) A deciding spec for a rendered surface.** When the work changes a
  rendered surface, at least one (b) criterion runs a spec (Playwright or
  the repo's equivalent) that decides the rendered result. The criterion
  states the assertion in words: what the spec asserts, and where. The run
  may write that spec in Phase 2. Implementing an assertion the operator
  stated is not choosing the check. A generic runner with no spec for that
  result does not decide it (§"Preparing declined rows" → **Pin**).
  On a row that renders nothing, (d) does not apply.

A basis admits a row in two places. Clause 1 lets a `[heavy]` or
heavy-tier-name row through on it. Clause 3 stops reading a rendered
surface as a person's look once (d) holds. Neither overrides anything else:
the row's other clause-3 trips and §"Never autonomous" still decline it.

A basis counts only once an operator has **confirmed** it. That happens
when the operator keeps the starter at a filing gate that showed the basis
fields: the `/ft-file-task --starter` S3 review, or a later gate that shows
the same fields. A starter edited by hand afterwards carries the same trust
as a hand-written token. An incomplete basis is not partly ready. The row
is declined on the clause the basis would have satisfied, and the filer
shows which of (a)–(d) is missing.

## Never autonomous

Some work needs a person however well it is scoped: the act itself is the
operator's, or a mistake cannot be undone from the transcript. A row whose
described work falls in this set is never a candidate. A basis does not
change that, and neither does any tier or any keyword miss:

- credentials and secrets;
- deploy, production, and push;
- migrations on real data;
- destructive operations;
- paid external calls, and any outbound side effect: email, posts, API
  mutations, OAuth, the operator's identity leaving the machine;
- physical acts, and reads of a live system;
- prose in the operator's voice;
- public or legal claims;
- design choices not yet decided;
- opening an epic;
- self-widening guardrails: permission allowlists, hooks,
  `path-access-roots`, gitleaks or pre-commit config, CI workflows, and
  this module;
- release and tag cuts;
- new third-party dependencies.

This is the semantic layer of clause 3, read by meaning. The keyword list
stays the mechanical layer under it, and the set adds no keyword to it.
Every LLM filer and `/ft-seed-unattended` declines such a row as a
**stay** whose reason names the item. It is never a pin, a split, or any
other preparation: how to slice such work is the operator's call, made in
an attended session.

## Three postures

A filer runs the predicate once, over every row it is about to write, and
then takes exactly one of these three branches. Which branch is fixed by the
invocation, never by the number of candidates.

**Attended (default).** The candidates are shown **inside the surface's
existing confirm gate**, alongside the rows themselves — each candidate row
displayed with the proposed token in place (`[light]🔧 [unattended]`) and the
clause-6 predecessor named where it applies (for an audit row, every open
sibling). The operator's confirmation of the write is the act: the token is
written only on rows the operator confirmed, and lands after `[model]` and any model-suggestion glyph, per
[`SPEC.md`](../SPEC.md) §"Task-line format" and the position footgun in
[`SPEC/plan-parser.md`](plan-parser.md). A surface whose gate is a prose
review (not a structured ask) does the same in prose: it shows the line
with the token and writes it only if the operator's edit or assent keeps it.
On either gate shape, clause 6 is then re-read against what the operator
kept: a reply that drops a candidate — by edit, ID list, or exclusion — drops
every kept candidate that leaned on it, transitively, and the surface says
which.

**`--fast`.** The review pause that would have carried the proposal is
skipped, so there is no act. The filer writes every row **without** the
token and emits, on its own line in the same turn as the write report:

```text
unattended-candidates: CORE-581, CORE-582.3
```

Bare IDs, comma-separated, in PLAN order; `unattended-candidates: none` when
the predicate admitted nothing. The line always emits under this posture, so
a later reader can tell "ran, found none" from "never ran." It is a report —
no reply, no gate. The line carries no dependency edges: a `.k` or `.N` on it
admitted on a same-pass sibling (clause 6) is a candidate only together with
that sibling. Marking a subset re-runs clause 6,
which is what `/ft-seed-unattended` does.

**`--unattended`.** Identical to `--fast`: the same line, zero tokens written.
On top of it, the line persists (§"Persistence") because an operator-less run
has no operator watching the transcript.

The two flagged postures degrade *identically* by design — the proposal never
becomes a write on either, and the difference between them is only where the
line is recorded. A surface that accepts neither flag has only the attended
branch.

## Seeding an existing plan

Candidacy fires at the write step, so a row filed before this module existed,
or by hand, was never proposed and stays unmarked until someone edits the
line. `/ft-seed-unattended` is the bulk path for those rows, and for the rows
the predicate declines: an **attended, flagless** walk of every open row in
the four active `PLAN.md` sections that applies the predicate above to each
row *as it stands in the file* — the existing line is the drafted line — and
brings the whole walk to **one** prose review gate. Two classes are skipped
before the predicate runs and reported as counts — a row already carrying the
token, wherever it sits (a mis-positioned one is also named, below), and a
`[handoff]` row (clause 3). The gate lists three things, in this order:

- **Marks.** Every row the predicate admits, shown as it stands with the
  token in place.
- **Preparations.** Every declined row a pin or a split
  (§"Preparing declined rows" below) rewrites, shown as the bytes the write
  will produce, each followed by a **dependent token
  item** when the predicate admits the resulting row as drafted — the pinned
  row, or a split's mechanical row — shown with the token in place. A
  preparation whose result the predicate still declines — a pin on a
  `[heavy]` or heavy-tier-name row with no complete basis (clause 1), a `.k` whose predecessor is open and not a
  candidate (clause 6) — carries no item and names that clause instead, and
  the write leaves that row unmarked.
- **Stays.** Every other declined row, with the first clause it failed and,
  where §"Preparing declined rows" asks for one, the reason: the path a
  keyword tripped on, the note or stub the ID collides with, the missing
  `.N`.

The gate opens when it holds a mark or a preparation; a walk with neither
reports the counts and the stays and stops — no gate, no commit. The
operator's reply is the act, and the write covers only what the reply
keeps: the token after `[model]` on each kept mark and each kept token item —
every other byte verbatim to the file on a mark, to the drafted bytes on an
item; the rewritten line of each kept pin; the remainder, the mechanical row,
and the starter of each kept split. A token
item depends on its preparation: dropping the preparation drops the item with
it; dropping the item keeps the preparation and leaves the row unmarked, for
a later walk to offer as a mark when the predicate then admits it. Clause 6
reads the plan itself, and a kept
token item counts as a candidate in the same walk — when it settles a
dependent, and in the re-read in §"Three postures", which drops every kept
row leaning on a dropped mark or a dropped item. The whole write — tokens, rewrites, mechanical
rows, starters — commits as one filing commit under
[`SPEC/plan-filing.md`](plan-filing.md) §"Filing commits".

Nothing in §"Recommend, never write" bends for it. The skill accepts neither
`--fast` nor `--unattended` — remove its gate and it is a report, which the
filers already emit as `unattended-candidates:` — so it never writes a token
nobody confirmed and never emits that line. It never writes `[handoff]`,
which no filer proposes. It seeds and never repairs: a mis-positioned marker
is named in the report for a hand edit, not rewritten, and a row's other
defects — a `[handoff]` that reads stale, a `Blocked by` that has since
cleared — are left as they stand. A second run never
re-offers what the first seeded; an open sibling the first run marked does
not settle a dependent, which stays declined until that sibling closes.
Existing filers keep their own gates.

### Preparing declined rows

Prefer a pin when one fact removes the person. Prefer a split when a
factual slice separates cleanly and the rest still needs a person.
Otherwise stay. Each declined row is one class:

- **Pin.** Add a fact to the existing line: a file, a command, or which of
  two patterns already in the repo. A pin may rewrite the words that ask
  for a look or a manual check — a cue such as `👁️` or *manual*, or a
  phrase that reads as one — only when it names an existing test command
  that decides that check. A generic runner that merely exists (`npm run
  test:e2e` with no spec for that result) does not, so the row is a split
  or a stay. Work that changes a rendered surface is admitted only on a
  starter's complete basis (clause 3), and a pin is a fact on the line,
  so that row is never a pin. Rewording a keyword that trips on a path
  or a name outside backticks removes no person, so the skill does not
  do it. A pin
  leaves no other clause-3 trip on the row, or it is not a pin. The pin
  does not add a test, a
  Playwright spec, or a keyword to clause 3, and it does not change
  `[model]`.
- **Split.** A mechanical row plus an attended remainder. The mechanical
  row is new, `[light]` or `[moderate]`, and describes only the factual
  slice. It never uses the person act's result — an answer, a value, or a
  state the act leaves behind — so it is correct before, after, or
  without the act. It is also safe to ship before the act: shipped
  while the act is pending, it leaves the project working. It neither
  removes nor switches off a path the project relies on until the act
  lands, and it never requires anything the act provides. Dropping a
  live provider before the act onboards its successor fails, even
  when the code is correct. A slice that fails either test has not
  separated cleanly, and the row stays. The drafted mechanical row
  also passes clauses 1–5 as drafted — the exact line, any mention of
  the source ID included. Clause 3 skips only the row's own bold ID and
  backticked spans, so a mention such as DEPLOY-12 written
  outside a backticked span trips on its prefix. A mention of the source is optional, so one that trips is left
  out. A row that still trips (a path outside backticks, the slice's
  words) has not separated cleanly, and the row
  stays. The source row becomes the remainder. File a starter for the
  remainder when its line alone does not say what to do.
- **Stay.** Taste and a true look stay declined — a
  true look is a result someone must see, where no existing test command
  decides it, and a rendered-surface change is one unless a complete basis
  decides it (clause 3). So does a row whose whole text is the person
  act, a §"Never autonomous" row (the reason names the item), a
  `[frontier]`, `[xheavy]`, or frontier-name row (clause 1), a row whose
  clause-3 keyword trips only on a path or a name written outside
  backticks (a bare migrations/0001 — the reason names the path, for a
  hand edit), a `[!critical]` row, an epic parent, a `.1` Discovery
  row, a `.N` audit row, and a row clause 4 still blocks. A split of an
  epic child whose parent has no `.N` row stays too: there is no `.N` to
  insert before, so the new `.k` would land after a legacy numeric audit or
  take the slot an unfiled one needs. A source ID that already has a
  tasknote, active or archived, or a `.flaitron/sidequest/<ID>.md` stub,
  stays as well: the skill does not overwrite a note or orphan a stub. So
  does a split whose drafted mechanical row still trips clauses 1–5.

A pin or a split is a preparation at the gate above; a stay is listed with
its clause. A split's mechanical `.k` takes the next number after the highest
numeric sibling, so under clause 6 it waits on that sibling — the remainder
itself when the source was the highest — and a later walk reads it the same
way. The default errs toward a false negative, as the predicate does: the
slice is still safe to ship first, and the walk after that sibling closes
offers the mark.

## Persistence

A terminal line is not durable ([`SPEC.md`](../SPEC.md) §"🚀 Phase 4:
Closure" → "Handoff persistence"), so under `--unattended` the
`unattended-candidates:` line is written down at the one place the run
already persists:

- **A runner closure that discharged deferred steps through
  `/ft-file-task --unattended`** (`SPEC.md` §"Deferred hand-off filing";
  `SPEC/plan-filing.md` §"Unattended filing authority") copies the line
  from the filing report into its own tasknote's **Final Summary** before the
  archive move — a pre-archive closure write, not a retroactive edit. The
  resuming operator finds it where they find the deferred rows.
- **A standalone `/ft-file-task --unattended`** has no tasknote; its
  Step 5 report is the only record, as it already is for the rows themselves.
- **Attended** filings persist nothing extra: the token is on the row or it is
  not, and the operator was there.

No new file, no `## 🔄 Handoff` insert, no queue. The line names rows an
operator may later mark; it is not a work item and is not filed as one.

## Surfaces and mirrors

The rule lives here once. Each filing surface applies it at its own write
step and carries a **labeled mirror** there
([`docs/CONVENTIONS.md`](../docs/CONVENTIONS.md) §"Canonical source with
labeled mirrors"): one line naming the branch it takes, plus the
`unattended-candidates:` literal so the emission shape is the same string on
every surface. The label shape is fixed so citation rot is mechanical to
catch:

```text
mirror of `SPEC/unattended-candidacy.md` §"Three postures"
```

The quoted section must be a real `## ` heading in this file.
`/ft-release` §7.1 **Pair N** — lifted into the CI `drift` job — checks that
every file under `claude/skills/` naming this module carries both the literal
and a labeled mirror; Pair Q resolves the label. A filer that Reads the module without mirroring it
fails that check.

| Surface | Write step | Existing gate the proposal rides | Owner |
|---|---|---|---|
| `/ft-open-epic` | Step 7 (`.2..M+1`, `.N`) | reconcile review prompt | [[CORE-577.3]] |
| `/ft-file-task` default, `--starter` | Step 4 / S4 | Step 3 / S3 prose review | [[CORE-577.4]] |
| `/ft-file-task --unattended` | Step 4 | none — emits, persists via the discharging runner | [[CORE-577.4]] |
| `/ft-file-task --park` | — | **no candidacy** (one-motion by design; decided when the stub is promoted) | — |
| `/ft-audit` §5 | ticket write | structured-ask write-step confirm | [[CORE-577.5]] |
| `/ft-refactor` | Step 5 | Step 4 structured-ask review; own `--fast` → emit only | [[CORE-577.5]] |
| `/ft-audit-repo` §6 | milestone write | write-confirm structured ask | [[CORE-577.6]] |
| `/ft-task` · `/ft-close-epic` | — | not filers; carry the §"Persistence" hook only | [[CORE-577.4]] |
| `/ft-seed-unattended` | Step 4 (existing rows, bulk — marks, pins, splits) | Step 3 prose review — the skill's only gate; no flags, attended only (§"Seeding an existing plan") | [[CORE-619]] · [[CORE-EPIC-812]] |

Adopter forks of `ft-audit` (`.claude/skills/audit/`) pick the mirror up only
through `/ft-update`'s fork refresh; until then a fork files as before —
proposing nothing — which is the safe direction.
