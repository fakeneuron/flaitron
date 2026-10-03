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
Files to touch / Explicitly out of scope / Decisions / Open at promotion /
Related) are conventional
but optional — drop any with nothing to capture. The canonical layout lives
in `templates/tasknote-starter-template.md`.

**Lifecycle:**

1. **Filing** (mid-flow): when AI surfaces rich context that warrants
   preserving, `/ft-file-followup [ID] --starter` writes the starter file at
   `.flowtron/tasknote/<ID>.md` and appends the PLAN.md entry under the
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
