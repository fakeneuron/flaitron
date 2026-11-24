---
title: text-module
status: starter
tags: [refactor, updater]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/text.mjs
blocked-by:
  - CORE-931.3
---

# CORE-931.4 | text-module

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Third move of CORE-EPIC-931. The markdown helpers are pure functions of
text. The shared fixtures already pin them case by case
(`SPEC/fixtures/fence/cases.json`, `SPEC/fixtures/workflow-block/cases.json`),
so this step needs no new characterization tests. Their only internal
import is `SUBMODULE_PATH` (workspace.mjs, CORE-931.3).

### Solution shape

- Create `tools/update-adopters/text.mjs` and move: `PIN_LINE`,
  `WORKFLOW_HEADING`, `SECTION_END`, `FENCE`, `fenceOpeners`,
  `headingLines`, `workflowHeadings`, `rewritePinLines`,
  `workflowPasteBlock`, `replaceWorkflowSection`, `workflowFollowThrough`,
  `snippetLinks`, `codexRoster`.
- `cachedWorkflowBlock` (it reads FLAITRON_REPO via `cachedFlaitronFile`)
  stays in the entry until CORE-931.7 moves it beside `followThrough`.
- Entry re-exports the six public names; export set unchanged.
- Acceptance seeds: existing fixture-driven tests pin these seams (no new
  pins needed — say so at promotion); the move is behavior-preserving and
  never mixed with feature change; suite green after; export set unchanged.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` — remove moved code; imports + re-exports.
- `tools/update-adopters/text.mjs` — new.

### Explicitly out of scope

- [[CORE-930]]'s fence/CRLF fix to `workflowPasteBlock` — a behaviour change, never mixed into this move. It may land before this step (then it moves with the code) or after (then it edits text.mjs).
- `SPEC/layout.md`'s fixture lines name `tools/update-adopters.test.mjs`, which is unchanged. Doc pointers: CORE-931.8.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| text.mjs purity | No git, no fs | Keeps the fixture-pinned byte contract isolated |

### Acceptance that decides it

- Suite incl. fence + workflow-block fixture cases — `node --test tools/update-adopters.test.mjs`
- Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/text.mjs`

### Open at promotion (Phase 1 should resolve)

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.3]] — `blocked-by:` predecessor.
- [[CORE-930]] — same function, independent behaviour fix; either order.
- [[CORE-921]] — related-decision: workflow-block fixture owns the bytes.
