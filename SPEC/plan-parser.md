# PLAN.md parser tolerances and legacy shapes

> Lazy-loaded SPEC module. Read when authoring an unusual `PLAN.md` row, when a row fails to parse, or when changing `viz/src/parser.ts`. The canonical task-line grammar itself stays in `SPEC.md` §"Task-line format", and its per-segment semantics in [`SPEC/task-line-segments.md`](task-line-segments.md); this module carries the tolerances, footguns, exclusions, and reserved long-description conventions around them. See `SPEC.md` for the always-loaded core spec.

**Legacy `## Critical` heading.** Pre-FE-044 PLAN.md files used a `## Critical`
priority heading. The parser soft-migrates this: tasks under a `## Critical`
heading parse with `priority: 'High'` and `critical: true` — equivalent to
filing each row under `## High` with an explicit `[!critical]` flag. Adopters
on older flowtron versions don't lose rows when they bump; migration of the
PLAN.md heading itself is optional cleanup.

Adopting projects' visualizers parse the task line per `viz/src/parser.ts`
(canonical reference); the tolerances below describe what that parser accepts.

**Conformance fixtures.** Every shape this module and `SPEC.md` §"Task-line
format" describe is pinned as input + expected parse under
[`SPEC/fixtures/plan/`](fixtures/plan/README.md) — whole `PLAN.md` samples
paired with JSON. `viz/src/parser.test.ts` runs them as the reference
consumer; adopter parsers in other languages (a Python reader, an awk
row-counter) run the same files through the pinned submodule and assert the
fields they model. A grammar change lands in the prose, the fixture JSON, and
the reference parser in one commit — the fixtures are edited by hand to match
the prose, never regenerated from a parser.

**Parser tolerances (decorative, not captured).** `viz/src/parser.ts`
additionally accepts three real-board decorations without parsing them into
`Task` fields — they are dropped, not stored:

- **Model-suggestion glyph after `[model]`** — a `🧠` (heavy) / `🔧` (light) /
  `🧩` (medium) / `🔭` (xheavy) glyph appended to the model token
  (`[medium]🧩`, space-optional), mirroring the next-move suggestion label.
  Redundant with the model tier; ignored. It is accepted on **either side** of
  the trailing bracket-token run below, so a row carrying both a glyph and
  `[unattended]` parses whichever order it was written in
  (`[xheavy]🔭 [unattended]` and `[xheavy] [unattended]🔭` are equivalent).
- **Stacked `[model]` tokens** — `[fable] [light]`: the first bracket token is
  captured as `model`; trailing bracket tokens are tolerated and dropped —
  *except* `[unattended]` and `[handoff]`, which are canonical grammar and
  captured (see [`SPEC/task-line-segments.md`](task-line-segments.md)
  §"Segment table").
- **Leading status glyph** — a nav-header chip (`🟢`/`⏸`/`✅`/`⚪`/`🌱`) between
  the checkbox and the bold ID (`- [ ] ⏸ **ID**`).

These keep hand-decorated rows from being silently dropped (they surface in
the `parsePlanWithDiagnostics` diagnostics otherwise). They are tolerances,
not canonical authoring grammar — new entries should still use the clean form
in [`SPEC.md`](../SPEC.md) §"Task-line format".

**`[unattended]` / `[handoff]` mis-authoring footguns.** Both markers ride the
same trailing bracket-token run as the stacked-`[model]` tolerance, so two
neighbouring shapes fail in ways worth naming rather than discovering. Neither
is rescued, for either marker:

- **`[!unattended]` / `[!handoff]`** — the `!` prefix belongs to `[!critical]`
  alone. A bang-prefixed token matches no slot, so the **whole line fails the
  grammar**: it is absent from the task list, and surfaces in
  `parsePlanWithDiagnostics`'s `unparsed`. (Adopter readers with no
  diagnostics channel drop it silently — which is the sharper edge, and the
  reason this is documented rather than tolerated.)
- **A marker before `[model]`, or with no `[model]` at all** — the model slot
  takes the *first* bracket token it sees, so `[unattended] [heavy]` and a
  bare `[unattended]` both parse with `model: 'unattended'` and
  `unattended: false` (likewise `[handoff]` → `model: 'handoff'`,
  `handoff: false`). The row stays in the task list looking healthy while
  silently mis-declaring its model and declaring no marker — write it after
  `[model]`.

A row carrying **both** markers parses with both booleans set — it is
mis-authored rather than rejected, and [`SPEC/task-line-segments.md`](task-line-segments.md)
§"Segment table" says which one a reader honours (`[handoff]`).

**Rewrites must preserve the trailing bracket-token run verbatim.** A
task-line rewrite — a Re-scope note ([`SPEC.md`](../SPEC.md) §"📝 Phase 1: Discovery"), a model
retag ([`SPEC/model.md`](model.md)), or a Phase 4 stub flip
([`SPEC/plan-filing.md`](plan-filing.md) §"`## Completed`
archive convention") — touches only the segment it means to change. It must
copy every other bracket token already on the line (`[unattended]`, a stacked
`[model]` tolerance) and any model-suggestion glyph verbatim from the original
rather than reconstructing the line from scratch. A rewrite that preserves
the visible shortname/description but drops a bracket token disarms it with
no diagnostic — `[unattended]` disappearing silently turns an
operator-approved row back into "undecided," with no visible sign on the
rendered board.

**Parser tolerances (adopter near-misses).** `viz/src/parser.ts` also accepts
three shapes that are not canonical authoring — they parse (or stay silent)
instead of surfacing as unparsed diagnostics. New entries should still follow
[`SPEC.md`](../SPEC.md) §"Task ID convention" and the canonical flag order in
that file's §"Task-line format".

- **Lettered subtask suffix** — a lowercase letter after digits on a decimal
  segment (`FE-310.3a`). Parsed as a task; nests under the matching epic.
- **Nested decimals** — more than one decimal segment (`FE-067.2.1`). Parsed
  as a task; nests under the matching epic.
- **`[!critical]` after `[model]`** — canonical order is `[!critical]` before
  `[model]`; the parser also accepts the reverse (including after a
  model-suggestion glyph) and still sets `critical: true`.

**Bare checkbox bullets (excluded, not tolerated).** A checkbox line inside a
recognized section that carries no markdown emphasis (`*` / `**`) is a prose
checklist item, not a failed task — excluded from both the task list and
`unparsed`. Lines that attempt an ID via emphasis but fail `TASK_LINE`
(`*FE-064*`, `**fe-065**`) still surface (FE-063.2).

**HTML comments are ignored.** Checkbox-shaped lines inside `<!-- ... -->`
comment blocks are non-rendered content: the parser blanks the comment
interior first, so such lines are neither parsed as tasks nor surfaced as
diagnostics. This lets a grammar-reference example carrying a literal
`**TASK-ID**` placeholder live in a comment block (see `templates/PLAN.md`)
without polluting the task list.

**Legacy label lines (excluded, not tolerated).** Some adopter PLAN.md files
predate flowtron entirely and carry completed historical records whose bold
token was never an `<AREA>-NNN` ID (`**P1**`, `**flowtron v5.2.0 bump**`).
Unlike the decorative tolerances above, these aren't parsed into a `Task` at
all — a completed (`[x]`) checkbox line with a bare `**token**` (optionally
followed by an em/en-dash description, no `[!critical]`/`[model]`/
`| shortname`) whose token has no letter-dash-digit ID shape (checked
case-insensitively, so a case-typo like `**fe-065**` still surfaces as a
diagnostic) is silently excluded from both the task list and
`parsePlanWithDiagnostics`'s `unparsed` output. A pending (`[ ]`) line in this
shape still surfaces as unparsed — new entries should get a real ID.

## Long-description conventions

The long description is free prose, but two machine-readable
conventions are reserved so visualizers can surface cross-task signals
on rows without tasknotes:

| Convention | Meaning | Parses into |
|---|---|---|
| `[[TASK-ID]]` | Cross-reference / "see also" | `Task.relatedTasks: string[]` |
| `Blocked by [[ID]]` | Hard dependency on another task | `Task.blockedBy: string[]` |

Both are **wikilink-only** — bare-ID forms do not parse. `Blocked by` is a
literal, case-sensitive match: `Blocked on [[ID]]`, `Depends on [[ID]]`, a
bare ID, and free prose all leave `Task.blockedBy` empty, so nothing that
reads the field sees the dependency. Multiple
comma-separated wikilinks are supported in a single `Blocked by` clause.

For illustrative wikilinks that shouldn't be parsed: use markdown inline
code spans (treated as literal text) in PLAN.md, or angle-bracket
placeholders (`[[<TASK-ID>]]`) in skill/doc files — both avoid the
`[A-Z]+-[0-9]+` wikilink-integrity grep.

A wikilink inside a `Blocked by` block lands in `blockedBy` only; the same
ID elsewhere in the description is excluded from `relatedTasks` (blocker is
the stronger signal).

Examples:

```markdown
- [ ] **CORE-016** [opus] — Execute migration per [[<CORE-008>]] playbook. Blocked by [[<CORE-008>]] — wait for upstream signal.
- [ ] **FE-003** [opus] | wikilink resolution — Builds on [[<FE-001>]]; pairs with [[<FE-004>]].
- [ ] **FE-007** — Touches [[<FE-001>]], [[<FE-004>]]. Blocked by [[<CORE-008>]], [[<CORE-016>]] — needs both upstream.
```
