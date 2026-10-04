# PLAN.md task-line grammar — conformance fixtures

Shared test cases for every parser that reads a flaitron `PLAN.md`. The
grammar itself is canonical in [`SPEC.md`](../../../SPEC.md) §"Task-line
format"; its tolerances, footguns, and exclusions are in
[`SPEC/plan-parser.md`](../../plan-parser.md). These fixtures pin that prose
to concrete inputs and outputs so independent parsers — the reference
`viz/src/parser.ts`, an adopter's Python or awk reader — test against one set
of cases instead of three hand-maintained ones.

The JSON is the contract. When a parser disagrees with a fixture, the parser
is wrong unless `SPEC.md` / `SPEC/plan-parser.md` changed first — in which
case the fixture is edited by hand in the same commit as the contract prose,
never regenerated from whichever parser happened to move.

## Files

Each `<case>.md` is a complete `PLAN.md` sample; its `<case>.json` sibling is
the expected parse of the whole file. Every `.md` has a `.json` and vice
versa. Fixture IDs use the synthetic `FX-*` area prefix so no sample row can
collide with a real task in any adopter.

| Case | Covers |
|---|---|
| `canonical` | Every optional-segment combination from `SPEC/task-line-segments.md`; all five priority headings; epic parent/child nesting; `[x]`/`[X]` marks and `Completed YYYY-MM-DD.` stamps; a task-shaped line above the first heading (ignored). |
| `tolerances` | Status glyph, suggestion glyph (all four, either side of the trailing run), stacked `[model]`, `[!critical]` after `[model]`; lettered / nested-decimal IDs; the legacy `## Critical` heading. |
| `markers` | `[unattended]` / `[handoff]` in either order and around glyphs; the `[!marker]` footgun (whole line unparsed); the before-`[model]` footgun (captured as the model). |
| `descriptions` | `[[TASK-ID]]` → `relatedTasks`; literal `Blocked by [[ID]]` → `blockedBy` (blocker wins); non-parsing near-misses (`Blocked by: ID`, `Blocked on`, lowercase); code-span masking; the reference `description` cleaning. |
| `exclusions` | Silently excluded lines (bare checkbox bullets, HTML comments, fenced code, completed legacy label lines, rows under unrecognized headings) vs. `unparsed` diagnostics (malformed IDs / tokens, pending legacy-shaped rows); the `nearMissHeadings` diagnostic. |
| `rotated-history` | `PLAN-ARCHIVE.md` grammar: `## Completed YYYY-MM` month headings map onto `Completed`; a malformed month heading is unrecognized. **Optional** — a consumer that never reads the archive may skip this file by name. |

## Expected JSON shape

```json
{
  "describes": "one sentence — what this case exercises",
  "tasks": [
    {
      "line": 12,
      "id": "FX-001",
      "completed": false,
      "priority": "High",
      "critical": false,
      "unattended": false,
      "handoff": false,
      "model": "heavy",
      "shortname": "every segment",
      "descriptionRaw": "Full canonical form … long description.",
      "description": "Full canonical form … long description",
      "completedDate": null,
      "relatedTasks": [],
      "blockedBy": []
    }
  ],
  "unparsed": [{ "line": 20, "text": "- [ ] **FX-220** [light] [!unattended] | …" }],
  "nearMissHeadings": [{ "line": 49, "heading": "medium", "matched": "Medium" }]
}
```

- `tasks` is in document order. `line` is the 1-based line of the row in the
  `.md` file. `priority` is one of `High` · `Medium` · `Low` ·
  `Future Opportunities` · `Completed` (the legacy `## Critical` heading and
  `## Completed YYYY-MM` headings map onto `High` and `Completed`).
- Absent optionals (`model`, `shortname`, `descriptionRaw`, `completedDate`)
  are `null`.
- `descriptionRaw` is the grammar-level capture: the ` — ` segment, trimmed,
  otherwise verbatim. `description` is the reference parser's presentation
  form — the `Completed YYYY-MM-DD` stamp removed, `**` stripped, whitespace
  collapsed, leading/trailing `.` trimmed; `""` when the segment is absent.
  A consumer asserts whichever of the two it models.
- `unparsed` lists checkbox lines inside a recognized section that look like
  a task but fail the grammar (`text` is the line, trimmed).
  `nearMissHeadings` lists `##` headings that case-insensitively match a
  priority name but are not one. Both are the *reference parser's*
  diagnostics: which lines to warn about is reader policy, not grammar. A
  consumer with no diagnostics channel ignores them; one with its own
  definition of a malformed row (a bare `- [ ] prose` bullet, a pending
  legacy-shaped row) asserts what that definition covers. Rule 3 below holds
  regardless.

## Consuming the fixtures

For each `<case>.md`, parse the whole file as a `PLAN.md` and compare with
`<case>.json`:

1. **Task membership and order are mandatory.** The parser must yield exactly
   the `tasks` rows, in order — the same `id`, `completed`, and `priority` on
   each. Which lines parse, and which do not, is the grammar.
2. **Assert every field you model; ignore the rest.** A reader that only
   counts open rows per section is conformant if its counts match `tasks`
   grouped by `priority` and `completed`. A reader with no `handoff` field
   skips that key. Field names are the reference parser's; map locally
   (`task_id`, `blocked_by`) as needed.
3. **Never invert a diagnostic.** A line in `unparsed` must not appear in
   `tasks`, and a `tasks` row must not be reported as unparsed.

Adopters reach this directory through the pinned submodule as
`.flaitron/core/SPEC/fixtures/plan/`. The reference consumer is
`viz/src/parser.test.ts` §"SPEC/fixtures/plan conformance".
