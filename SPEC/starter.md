# Starter tasknotes

> Lazy-loaded SPEC module. Loaded by `/ft-task` Step 3a when an existing tasknote has `status: starter`. See `SPEC.md` for the always-loaded core spec.

A **starter tasknote** is a lightweight, intentionally minimal tasknote shape
for capturing rich AI-discovered context at task-filing time — when context
exists but the task isn't ready to start. Starters preserve the rationale,
suspected files, drift hypotheses, and design decisions that would otherwise
be lost or bloat the PLAN.md long description.

A starter has the same YAML frontmatter as a standard tasknote but with
`status: starter` and the optional `due:` / `related-tasks:` fields
typically omitted. The body has a single `## 🌱 Starter context` section —
**no** spec sections (🎯 Goal / ✅ Acceptance / 🧩 Subtasks / 🔗 Related),
**no** phase scaffolding. Those are added at promotion.

```markdown
# <TASK-ID> | <title>

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed YYYY-MM-DD)

## 🌱 Starter context

<rich context: rationale, solution shape, file survey, decisions,
open questions for promotion, related tasks>
```

Sub-headings within `## 🌱 Starter context` (Why this exists / Solution shape /
Files to touch / Explicitly out of scope / Decisions / Acceptance that decides
it / Open at promotion / Related) are conventional
but optional — drop any with nothing to capture. The canonical layout lives
in `templates/tasknote-starter-template.md`. One combination is not optional
for one purpose. `touches:`, `### Acceptance that decides it`, and an empty
`### Open at promotion` together make up the readiness basis. A `[heavy]`,
heavy-tier-name, or rendered-surface row needs that basis to be an
`[unattended]` candidate
([`SPEC/unattended-candidacy.md`](unattended-candidacy.md) §"Readiness
basis"). At promotion, those acceptance criteria seed `## ✅ Acceptance`
verbatim. The drift check below still applies to them. A drifted criterion
is surfaced to the user, never silently reworded.

**Lifecycle:**

1. **Filing** (mid-flow): when AI surfaces rich context that warrants
   preserving, `/ft-file-task [ID] --starter` writes the starter file at
   `.flaitron/tasknote/<ID>.md` and appends the PLAN.md entry under the
   appropriate priority section. If the ID is omitted, the skill suggests one
   for review before writing. (`/ft-refactor` writes its child starters from
   the template directly, one per implementation child.)
2. **Sitting**: visualizers render a 🌱 chip on the row and exclude starters
   from "in progress" counts.
3. **Promotion** at `/ft-task <ID>`: the `/ft-task` skill detects `status: starter`,
   drift-checks the captured context against current code (paths, line
   numbers, function names cited in the starter may have moved), scaffolds
   the rest of the template (🎯 Goal / ✅ Acceptance / 🧩 Subtasks / 🔗 Related
   above a divider, then the four phase sections), and flips status to
   `in-progress`. The starter context informs the spec sections; it is not
   silently authoritative — Phase 1's drift check applies fully.

## Importing a starter

A starter can also arrive from outside the repo: written by another agent, a
bot, or another project, and handed in as a file, a folder, or pasted text.
`/ft-import-task` files such notes into this repo's plan
(`claude/skills/ft-import-task/SKILL.md`). This section is the portable input
format it reads, so an outside author knows what to write.

- **Body.** Starter-shaped: a `## 🌱 Starter context` section, or the
  template's sub-headings (Why this exists / Solution shape / Files to touch /
  Explicitly out of scope / Decisions / Acceptance that decides it / Open at
  promotion / Related) without it. Wording is kept as written.
- **Not a note.** A file whose first line starts with `NOT A TASKNOTE` (a
  folder guide, an index) is skipped.
- **IDs.** The author cannot know this repo's next number, so the note's own ID
  is a placeholder: `<PREFIX>-<next>`, or any `<…>`-bracketed ID. A reference
  to another note in the same batch names that note's file name. The importer
  allocates real IDs per [`SPEC/plan-filing.md`](plan-filing.md) §"ID
  allocation" and replaces both.
- **Frontmatter.** The SPEC keys (§"Tasknote frontmatter" in `SPEC.md`) where
  the author has them, plus four optional import keys, none of which survive
  the import as written:

  | Key | Meaning | On import |
  |---|---|---|
  | `repo:` | `owner/name` the note is for | Compared with this checkout's origin; a mismatch is skipped unless the operator files it anyway; several repos are always skipped |
  | `read_at:` | `owner/name@<sha>` the author read | Kept as the provenance line's `read at` clause when it names this repo |
  | `task:` | The ID a previous import already filed it as | A dedupe key: the note is already filed |
  | `priority:` | `High` / `Medium` / `Low` / `Future`, or P0–P3 | Maps to the PLAN section (P0/P1 → High, P2 → Medium, P3 → Low) |

  `touches:` may carry a repo prefix (`owner/name:path`); the importer strips
  it to repo-local paths.
- **Status.** `status: starter`, a missing `status:`, or `pending` is a
  candidate. `parked`, `idea` or `revisit-later` is parked: reported, not
  filed unless the operator asks. `done`, `completed` or `superseded` is
  skipped.
- **Decisions are proposals.** A decisions or open-questions section the
  author wrote is filed as Discovery questions, its leans kept as evidence. Only
  a decision the operator actually answered stays locked, with where they
  answered it.

An imported starter carries one extra line under its nav header,
`Source: <locator> (<hash or id>), read at <owner/name>@<sha>` — the `read at`
clause dropped when the note named no commit of this repo. It is the import
record: dedupe reads it, and nothing is written back to the source.
