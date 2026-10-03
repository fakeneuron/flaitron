---
title: flaitron-rebrand discovery
status: starter
tags: [rebrand, breaking, fleet]
created: 2026-10-03
---

# CORE-711.1 | flaitron-rebrand discovery

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-03)

## 🌱 Starter context

_Captured 2026-10-03 during a release-vs-rebrand discussion — promote to full tasknote at `/ft-task CORE-711.1` checkout._

### Why this exists

The operator plans to rebrand flowtron → flaitron. It is breaking (folder and submodule paths move), so it ships as **v6.0.0**. A v5.x release first was rejected: only 3 commits (docs-only CORE-691 sweep + PLAN edits) landed after v5.35.0 on the same day, too thin to justify an adopter bump before the rename. Those commits ride into v6.0.0.

### Solution shape

- Rename live references only: app/viz branding, `.flowtron/` → `.flaitron/`, `.flowtron/core` → `.flaitron/core`, SPEC/docs/skills/templates/tools text, repo folder `~/Code/flowtron` → `~/Code/flaitron`.
- Rename the GitHub repo to flaitron (GitHub redirects old URLs); update `.gitmodules` URLs in every adopter.
- Migrate adopters in one fleet wave with a migration recipe (`git mv`, `.gitmodules`, symlink re-wire) via `/ft-update` / `tools/update-adopters.mjs`, one operator confirm.
- Cut v6.0.0 after the rename lands.

### Files to touch (preliminary survey — drift-check at promotion)

- `SPEC.md`, `SPEC/`, `docs/`, `templates/`, `claude/`, `codex/`, `cursor/`, `grok/`, `tools/`, `viz/`, `README.md`, `CLAUDE.md`, `.flowtron/` — full inventory is this task's deliverable.
- External (operator-approved scan paths): `~/Code` siblings (natabula + every adopter), `~/fakeneuron/`, `~/.claude/` (global CLAUDE.md, `ft-*` skill symlinks, settings, `path-access-roots`, memory), judedelparte GitHub branding.

### Explicitly out of scope

- Legacy/archived tasknotes (`.flowtron/tasknote/archive/**`, `PLAN-ARCHIVE.md`) — left as historical records, content untouched (the folder they live in still moves with `.flowtron/`).
- The `ft-*` skill/command prefix — "ft" also reads as flaitron, so it stays.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Release before rebrand? | No — roll into v6.0.0 | Only 3 docs-only commits since v5.35.0 |
| Scan scope | `~/Code` siblings, `~/fakeneuron/`, `~/.claude/`, judedelparte GitHub | Operator named each path 2026-10-03 (per-session approval — re-confirm in the Discovery session) |
| GitHub repo | Rename to flaitron | Redirects cover old URLs |
| Adopter migration | Rename to `.flaitron/` in one fleet wave | Breaking → v6.0.0 |
| Skill prefix | Keep `ft-*` | Works for both names |

### Open at promotion (Phase 1 should resolve)

- Is `judedelparte` a GitHub account/org, a local folder, or a site? Which exact path/URL may be inspected? Lean: ask again at promotion.
- Case-insensitive FS: `~/Code/flowtron` and `~/code/flowtron` are the same dir — confirm rename handles both spellings (additional working directory is registered under the lowercase path).
- Does the viz/npm package name, tag history, and VERSION-HISTORY keep old names for past entries? Lean: yes, history unchanged, new entries use flaitron.
- No-bulk-push memory: adopter bump commits stay local; each repo pushes from its own session. Does the rename wave follow that? Lean: yes.
- Order: rename flowtron repo first, or adopters first? Lean: flowtron content first, then fleet wave, then repo rename + tag.

### Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.N]] — audit
