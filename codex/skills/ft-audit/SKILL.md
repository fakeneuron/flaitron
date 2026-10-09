---
name: ft-audit
description: Run the Flaitron parameterized audit workflow from Codex — `ft-audit <domain> [scope]` (general/backend/frontend/security/performance/docs/structure/context). Use for any audit/review/harden request matching one of these domains.
---

# ft-audit - Codex wrapper

> **Fork, don't symlink.** The scaffold this points at is stack-neutral — its
> rubrics and verification commands diverge per stack — which is why `ft-audit`
> is deliberately absent from `../../../codex/AGENTS-snippet.md` §"One-time skill
> wiring"; symlinking this wrapper gets you the unfilled scaffold. Fork into an
> unprefixed adopter skill dir (`.agents/skills/audit/` under Codex, per
> SPEC/layout.md §"Skill namespace"). Prefer the **thin overlay**: copy
> `.flaitron/core/templates/audit-overlay-template.md` to `.agents/skills/audit/SKILL.md` and
> fill its `## Deltas` block — it runs the bundled passes by reference, so
> scaffold improvements arrive on every bump. Full-copy the whole
> `claude/skills/ft-audit/` directory (`SKILL.md` + `scaffold-bootstrap.md` +
> `passes/`) only when you need to edit pass bodies. Both procedures:
> `../../../docs/MIGRATION.md` §1.2.1 — its `cp` blocks are written in Claude
> paths: substitute `.agents/skills/` for `.claude/skills/` and skip the
> `.claude/commands/` copy (Codex has no command stub).

Read and follow `../../../claude/skills/ft-audit/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules".
