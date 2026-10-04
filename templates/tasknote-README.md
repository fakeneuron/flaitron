# Tasknote Directory

This directory holds active tasknotes and archived tasknotes for completed
work. Tasknote templates are resolved from the flaitron submodule at
`.flaitron/core/templates/`. The canonical workflow lives in
`.flaitron/core/SPEC.md`.

## Layout

- `<TASK-ID>.md` — active tasknote (one per task in flight)
- `archive/<area>/<TASK-ID>.md` — completed tasknotes, one folder per area

Tasknotes are scaffolded automatically by the slash commands from
`.flaitron/core/templates/`; inspect those files directly for the
canonical shapes. Five variants:

- **Standard 4-phase tasknote** — `/ft-task <ID>` scaffolds from `tasknote-template.md`; full schema at `.flaitron/core/SPEC.md` §"Tasknote frontmatter" + §"Tasknote body shape" (model assignment lives on the PLAN.md task line — see §"Task-line format").
- **Starter tasknote** — `/ft-file-followup [ID] --starter` scaffolds from `tasknote-starter-template.md` for mid-flow context capture and suggests an ID when omitted; lifecycle at `.flaitron/core/SPEC/starter.md`.
- **Micro-tasknote** — `/ft-micro-task <ID>` scaffolds from `tasknote-micro-template.md` for tasks above the skip-tasknote threshold but below full 4-phase ceremony; threshold at `.flaitron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".
- **Sidequest stub** — `/ft-file-followup --park [ID]` scaffolds from `sidequest-template.md` to park a mid-session idea or quick fix without losing it; writes `.flaitron/sidequest/<ID>.md` alongside a PLAN.md line. Filing-motion guidance at `.flaitron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".
- **Epic lifecycle** — for code-sweep or major multi-child feature epics, bracket the implementation children with a **Discovery** subtask (`<AREA>-<N>.1`, plans the children) and an **Audit** subtask (final `.N`, verifies the completed work). See `.flaitron/core/SPEC/epic.md`. Simple implementations don't need it.

## Area prefixes

Canonical prefixes (defined by flaitron):

| Prefix | Area |
|--------|------|
| `CORE-` | cross-cutting, orchestration, project-wide |
| `BE-` | backend |
| `FE-` | frontend |
| `DB-` | database, migrations |
| `DEPLOY-` | deployment, CI/CD, infra |
| `TEST-` | testing infrastructure |

Project-specific prefixes (declare yours here, or delete this section if none):

| Prefix | Area | Notes |
|--------|------|-------|
| `XXX-` | example | replace or remove |

## Archive layout

**This table is authoritative.** `<area>` is *looked up here* — never derived
from the task ID. Read it on every task, for every prefix, canonical ones
included: a prefix that "looks known" is precisely the one an agent lowercases
on autopilot, and a folder that does not exist reads as an empty archive rather
than as a failed lookup.

| Prefix | Folder |
|--------|--------|
| `CORE-*` | `archive/core/` |
| `BE-*` | `archive/be/` |
| `FE-*` | `archive/fe/` |
| `DB-*` | `archive/db/` |
| `DEPLOY-*` | `archive/deploy/` |
| `TEST-*` | `archive/test/` |

**Declaration-time default — not a read-path rule.** When declaring a new
prefix, name its folder the prefix lowercased with the trailing `-` dropped
(`OCR-*` → `archive/ocr/`), then add the row above. A project may deliberately
declare a folder the default would not produce (e.g. `OPS-*` → `archive/operations/`);
the row wins. That is why `<area>` is read from the table rather than computed.
The folder itself is created when the first tasknote in that area lands at
Phase 4 closure — a missing folder is an empty archive, not an error.

## AI-referenced docs

The project-declared doc set walked at every Phase 4 closure (per
`.flaitron/core/SPEC.md` §"🚀 Phase 4: Closure") and at every
epic-audit subtask (per `.flaitron/core/SPEC/epic.md`) for the
doc-drift sweep. Flat list, one-line purpose each. Extend as the
architecture matures (architecture notes, API specs, DB schema docs,
ADRs, inventories).

Membership means **swept for drift** — it does not mean **loaded at
cold start**. The two are independent per-doc properties: a lazy doc
that drifts belongs on this list; an always-loaded doc that never
drifts need not.

- `README.md` — project overview, current shipped feature surface
- `AGENTS.md` — assistant-facing project guide; includes the flaitron paste-block (read by Claude Code, Codex, Cursor, Amp, Aider, Grok)
- `CLAUDE.md` — optional Claude-specific directives that don't belong in `AGENTS.md` (delete entry if not used)
- `.flaitron/PLAN.md` — roadmap and active task queue

## Project quick commands

Replace this section with the commands an assistant should run for this
project. Keep it terse and high-signal.

- Tests: `pytest tests/` or `npm test`
- Type check: `npm run typecheck`
- Lint: `ruff check .` or `npm run lint`
- Dev server: `npm run dev`
