---
name: ft-audit
description: Run the Flaitron parameterized audit workflow from Codex — `ft-audit <domain> [scope]` (general/backend/frontend/security/performance/docs/structure/context). Use for any audit/review/harden request matching one of these domains.
---

# ft-audit - Codex wrapper

> **Fork, don't symlink.** The scaffold this points at is stack-neutral — its
> rubrics and verification commands diverge per stack — which is why `ft-audit`
> is deliberately absent from `../../../codex/AGENTS-snippet.md` §"One-time skill
> wiring". Fork the whole `claude/skills/ft-audit/` directory (`SKILL.md` +
> `scaffold-bootstrap.md` + `passes/`) into an unprefixed adopter skill dir (`.agents/skills/audit/` under
> Codex, per SPEC/layout.md §"Skill namespace") and fill it in; symlinking this wrapper
> gets you the unfilled scaffold. Fork procedure: `../../../docs/MIGRATION.md`
> §1.2.1 — its `cp -R` block is written in Claude paths, so translate the
> destination the same way §"Translation rules" translates `.claude/`.

Read and follow `../../../claude/skills/ft-audit/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules".
