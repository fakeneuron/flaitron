---
title: ft-import-task
status: starter
tags: []
created: 2026-11-08
touches:
  - claude/skills/ft-import-task/SKILL.md
  - codex/skills/ft-import-task/SKILL.md
  - SPEC/layout.md
  - CLAUDE.md
  - claude/AGENTS-snippet.md
---

# CORE-895 | ft-import-task

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-08)

## 🌱 Starter context

_Captured 2026-11-08 in a natabula design discussion after natabula NAT-558 closed. Promote to a full tasknote at `/ft-task` checkout._

### Why this exists

Adopters receive tasknotes written somewhere else: by an outside bot (natabula's Grok Task Notes on Drive), another repo or another agent. Natabula NAT-558 built this import as a personal skill, `tasknote-intake` (`~/Code/natabula/configs/claude/skills/tasknote-intake/SKILL.md` at natabula `853c68f`). About two thirds of that skill is generic, with no Drive or Grok dependency: §"Vet each note once" and §"File a starter". That part belongs in flaitron, so every adopter gets it through the pin. Natabula keeps only the Drive-specific overlay (natabula NAT-559).

### Solution shape

- **Input:** a file, a folder or pasted text.
- **Steps:**
  - Skip non-tasknotes.
  - Classify each note: candidate, parked or done.
  - Dedupe: provenance line first, then the `task:` key, then plan text.
  - Replace `<PREFIX>-<next>` placeholders using `SPEC/plan-filing.md` §"ID allocation", including cross-references between notes in the batch.
  - Normalize frontmatter to the pinned SPEC.
  - Write a provenance line, `Source: <locator> (<hash or id>), read at <sha>`.
  - Keep the source's wording.
  - Relabel the source's Decisions / Open questions as Discovery questions, keeping its leans as evidence. Decisions the operator actually answered stay locked.
  - Size each note as a row, starter or epic, then file and commit through the normal filing workflow.
- **Batch:** one proposal table and one go.
- **Output:** a receipt block (`imported <source> as <ID> at <sha>`) the operator can copy back by hand.
- It writes no `[unattended]` or `[handoff]` marker. Marking stays with `/ft-seed-unattended`.

### Files to touch (preliminary survey — drift-check at promotion)

- `claude/skills/ft-import-task/SKILL.md` and `codex/skills/ft-import-task/SKILL.md` — the new skill body and its Codex wrapper.
- `SPEC/layout.md` §"Skill namespace" — add it to the roster.
- `CLAUDE.md` and `claude/AGENTS-snippet.md` — the two skill rosters, kept in sync (see the KEEP IN SYNC comment).
- Possibly a `SPEC/` module for a portable starter format (Open at promotion 2).

### Explicitly out of scope

- Any transport: Drive, connectors, fetching. The source is already readable.
- A source-side index or any other write to the source.
- Fleet routing: notes for several repos, standards notes. That stays in natabula's `natabula-tasknote-intake`.
- Natabula's overlay, which keeps the Drive checkout gate, allowance and receipts (natabula NAT-559).

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Core access | Read-only; the skill never writes to the source | Writing a shared source needs a claim protocol (natabula NAT-556's gate), many sources can't be written (paste, read-only mounts, other people's repos), and writes trigger Path Access approvals or count as publishing |
| Import record | The destination's provenance line; no source-side index | The plan stays the one tracker. Cross-repo visibility comes from a read-only scan of provenance lines |
| Write-back | Only through an optional, fail-closed claim hook an adopter overlay supplies; if defined, it must pass before any repo write | Natabula's Drive gate becomes that hook; other adopters get a pure read |
| Layering | Generic import upstream; source adapters and claim protocols in adopter overlays | Same pattern as `ft-audit` and adopter audit overlays |

### Acceptance that decides it

- Both skill bodies exist — `test -f claude/skills/ft-import-task/SKILL.md && test -f codex/skills/ft-import-task/SKILL.md`.
- Drift checks pass — `bash tools/drift-checks.sh`.
- Both rosters list the skill — `grep -q "ft-import-task" CLAUDE.md && grep -q "ft-import-task" claude/AGENTS-snippet.md`.

### Open at promotion (Phase 1 should resolve)

1. A new skill, or an `/ft-file-task --import` mode? Leaning toward a new skill, since import doesn't start from an active tasknote, which `/ft-file-task` assumes.
2. Should flaitron publish a portable starter format spec (placeholder IDs, `read_at`, `repo:`) for outside authors?
3. The claim hook's contract: what it receives, what it must return, and how failure is reported.
4. Should a note whose `repo:` names a different repo be refused, or only warned about?
5. Acceptance for "no write to the source" — judgment or a mechanical check?

### Related

- natabula NAT-558 — the personal `tasknote-intake` this generalizes.
- natabula NAT-556 — the Drive checkout gate that becomes natabula's claim hook.
- natabula NAT-559 — natabula's overlay thinning, blocked on this plus a pin bump.
