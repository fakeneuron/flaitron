---
title: codex-wiring-bootstrap
status: starter
tags: [codex, skills, adoption]
created: 2026-10-14
related-tasks: [CORE-772, CORE-777]
---

# CORE-789 | codex-wiring-bootstrap

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-14) · 🔗 [[CORE-772]] [[CORE-777]]

## 🌱 Starter context

Captured from Natabula's cross-repository Codex discovery investigation. The operator requested this Flaitron prevention task separately from Natabula's existing-fleet repair. Promote in the Flaitron checkout with `$ft-task CORE-789`.

### Why this exists

A read-only fleet scan found 21 of 25 Flaitron-enabled repos with incomplete Codex wiring: 143 missing links, four retired dangling links in Flaitron self-host, and a broken global-only ft-new-project link. The skills exist in pinned submodules, but most projects only have `.claude/skills`; two pilot repos had hand-installed only `.agents/skills/ft-task`. Users therefore have to locate bodies manually instead of selecting the intended `$ft-*` skill.

Official Codex docs confirm repo-scoped `.agents/skills`, symlink support, and lazy full-body loading: https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills . This task concerns establishing/reconciling the discovery surface, not removing normal progressive disclosure.

### Observed causes (drift-check at promotion)

- `claude/skills/ft-adopt/SKILL.md` Step 3 sends the caller to the Claude symlink block. `codex/skills/ft-adopt/SKILL.md` is a thin translation wrapper. The wrapper/snippet already supplies the Codex roster, but the canonical adoption drive does not reliably establish that surface for Codex callers.
- `claude/skills/ft-update/SKILL.md` Step 4 checks Codex links only if `.agents/skills` already exists; otherwise it explicitly skips. Bumps therefore do not bootstrap an absent Codex surface. Check same-version early returns too: repair must not require an unnecessary pin movement.
- `tools/update-adopters.mjs` deliberately excludes general newly shipped skill wiring from its remit. Its rename handling and report are not a general installer. Do not quietly broaden that fleet updater while fixing adoption/update.
- Flaitron's ignored `.agents/skills` had four retired names while Claude's self-host links had been repaired at CORE-772. The global-only utility still used the retired ft-new-project name. Migration guidance must distinguish self-host, pinned adopters and allowed global utilities.
- No active overlapping upstream wiring task was found; CORE-772 and CORE-777 are closed historical work, not fixes for missing bootstrap.

### Solution shape

- Make a Codex-selected adoption/update drive establish and reconcile the documented Codex skill surface even when its directory is absent. Preserve the relative links through the adopter's pin and canonical single-source roster.
- Define the selection policy in Discovery: explicit invocation platform, an explicit platform choice, or another existing documented mechanism. Do not infer a blanket all-platform install without reviewing the resulting contract. Preserve Claude/Cursor/Grok selection and existing behavior outside the selected surface.
- Reconcile missing, renamed and retired links using exact known targets/types. Do not overwrite live custom destinations or delete arbitrary skill directories. Report conflicts and preserve unrelated skills.
- Test absent directories, partial installs, already-correct links, same-version repair, retired/dangling links, custom conflicts, and multiple platform surfaces. Reuse existing helpers/tests before adding code; test behavior rather than duplicating roster literals.
- Reconcile `codex/AGENTS-snippet.md`, platform/migration docs, canonical adoption/update bodies and thin wrappers together. Preserve one canonical skill body and pinned install policy; no project-family global install as a workaround.
- Keep the temporary fleet backfill in Natabula NAT-416. This upstream task's deliverable is reliable future bootstrap/reconciliation, tests and instructions in Flaitron, not edits to adopter repos.

### Files to touch (preliminary survey — drift-check at promotion)

- `claude/skills/ft-adopt/SKILL.md`, `claude/skills/ft-update/SKILL.md` and applicable lazy fragments.
- `codex/skills/ft-adopt/SKILL.md`, `codex/skills/ft-update/SKILL.md`, `codex/AGENTS-snippet.md` when translation/dispatch needs clarification.
- `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `docs/CODEX-VERIFICATION.md` only for reconciled install policy and actual evidence; do not rewrite historical runtime receipts.
- Existing tools/fixture seams that can exercise the install/reconciliation behavior; keep `tools/update-adopters.mjs`'s documented boundary unless Discovery explicitly revisits it.

### Acceptance to carry into Discovery

- Codex-selected adoption produces the correct repo-scoped pinned subset without manually finding skill bodies.
- Codex-selected update repairs an absent/partial surface, including a same-version request where applicable, without gratuitous pin changes or installing unrelated platform surfaces.
- Repeated execution is idempotent; valid custom destinations survive, known obsolete links are handled deliberately, and conflicts are reported.
- Regression fixtures exercise the absent/partial/healthy/rename/conflict cases and preserve behavior for other platform surfaces.
- Canonical bodies/wrappers/docs agree on platform selection, adopter/self-host/global utility scope and `$` invocation.
- Actual representative runtime discovery evidence is distinguished from static link assertions; no fictitious all-fleet runtime coverage.

### Explicitly out of scope

- Repairing the current fleet from this task or modifying Natabula's pinned submodule; NAT-416 owns the backfill.
- Brand kit/import work, new public service or automatic publication, global task-family installs, unrelated updater redesign, pushes and deployment.

### Decisions locked in this conversation

Flaitron owns its generic adoption/update workflow and source. Natabula owns fleet repair execution. Each producer keeps its own pin; repo-scoped Codex skills must point through it. Native Codex selection uses `$ft-task`, not assumptions about arbitrary CLI slash commands. Normal lazy SKILL.md loading remains valid.

### Open at promotion

- Choose the minimum platform-selection mechanism that reliably reaches Codex bootstrap and same-pin reconciliation without duplicating the canonical body.
- Determine executable test seams for procedural install instructions, retaining canonical roster derivation.
- Recheck current main for overlapping fixes and the exact boundary between rename migration and general wiring.
- Release/bump adoption remains a separate deliberate motion; this filing neither bumps adopter pins nor authorizes pushes.

### Related

- [[CORE-772]] — completed Claude self-host v7 wiring repair; Codex stale links persisted separately.
- [[CORE-777]] — completed ignored skill-link path handling.
- [Natabula NAT-416](../../../natabula/.flaitron/tasknote/NAT-416.md) — confirmed current-fleet repair scope; independent of upstream implementation.
