---
title: skill namespace prefix
status: completed
tags: []
created: 2026-05-17
due:
related-tasks: [CORE-103, CORE-101, CORE-090, CORE-105]
---

# CORE-104 | skill namespace prefix

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Prefix flowtron's bundled skill names so they no longer risk silently shadowing adopter-owned skills with the same name in Claude Code's skill resolution.

## ✅ Acceptance

- [ ] All 15 bundled skill directories under `claude/skills/` carry the `ft-` prefix: `ft-task`, `ft-starter-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic`, `ft-new-project`, `ft-release`, `ft-flowtron`, `ft-audit`, `ft-audit-docs`, `ft-audit-backend`, `ft-audit-frontend`, `ft-audit-performance`, `ft-audit-security`.
- [ ] All 15 command files under `claude/commands/` rename to match (e.g., `claude/commands/ft-task.md`).
- [ ] Each `SKILL.md`'s frontmatter `name:` field updated to the new slug.
- [ ] Every cross-reference in `SPEC.md`, `SPEC/*.md`, all `SKILL.md` files (including lazy-load fragments under `task/`), all `commands/*.md` stubs, `claude/CLAUDE-snippet.md`, `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `README.md`, and `templates/*.md` updated to the `ft-` form.
- [ ] Flowtron-self `.claude/` rewired: forked `audit`/`audit-docs` dirs renamed (or re-forked) to `ft-audit`/`ft-audit-docs`; symlinks for `task` and `flowtron` re-pointed to `ft-task` and `ft-flowtron`.
- [ ] `CORE-103` (open Low) folded — its substantive content (`/ft-flowtron` adopter-facing global install) lands in `docs/MIGRATION.md` §1.0 as part of this sweep; PLAN.md `CORE-103` line flips to `Completed YYYY-MM-DD. (folded into CORE-104)`.
- [ ] SPEC ships a new short section establishing the `ft-` namespace contract (bundled flowtron skills own `ft-`; adopters MUST NOT use the prefix for project-specific skills; audit-family forks SHOULD NOT prepend `ft-` once forked).
- [ ] Verification grep: `grep -rE "/(task|audit|release|new-project|audit-docs|audit-backend|audit-frontend|audit-performance|audit-security|starter-task|micro-task|file-followup|epic-discovery|close-epic|flowtron)\b" --include='*.md' --exclude-dir=archive --exclude-dir=node_modules .` returns only intentional residue (this tasknote body, archive references, prose discussing the rename itself).
- [ ] Follow-up release task `CORE-105` (v3.0.0) filed in PLAN.md before closure — release commit is its job, not this one.
- [ ] `.claude/settings.local.json` allow-list entries updated to the new paths/skill-permissions (best-effort; per-machine file).

## 🧩 Subtasks

- [ ] **Plan the rename map** — write the 15-row old → new map; surface for visual confirmation before any file motion.
- [ ] **Rename skill directories** via `git mv claude/skills/<old> claude/skills/ft-<old>` for each of the 15.
- [ ] **Rename command files** via `git mv claude/commands/<old>.md claude/commands/ft-<old>.md` for each of the 15.
- [ ] **Update SKILL.md frontmatter** — flip `name:` field in each of the 15 SKILL.md files.
- [ ] **Update self-references inside skills** — paths like `claude/skills/task/` → `claude/skills/ft-task/`; lazy-fragment cross-refs inside `task/SKILL.md`, etc.
- [ ] **Sweep SKILL.md cross-references** — every SKILL.md mentions other skills (e.g., `/release` references `/task`); rewrite all to the `ft-` form.
- [ ] **Sweep `claude/commands/*.md`** stubs — descriptions and bodies that mention other commands.
- [ ] **Sweep `claude/CLAUDE-snippet.md`** — symlink commands, paste-block, verification text.
- [ ] **Sweep `docs/MIGRATION.md`** — adopter symlink commands (§1.2), audit-family `cp` snippets (§1.2.1), commit instructions (§1.6), verification (§1.7), §3 migration cleanup checklist, plus the `/ft-flowtron` global install (CORE-103 fold) under §1.0.
- [ ] **Sweep `SPEC.md` + `SPEC/*.md`** — every `/task` / `/release` / etc. reference.
- [ ] **Sweep `README.md`, `docs/PHILOSOPHY.md`** — public-facing slash-command mentions.
- [ ] **Sweep `templates/*.md`** — `PLAN.md`, `tasknote-template.md`, `tasknote-starter-template.md`, `tasknote-micro-template.md`, `tasknote-README.md`.
- [ ] **Sweep `_project/tasknote/README.md`** — pointers and quick-command text.
- [ ] **Rewire flowtron-self `.claude/`** — rename `audit/` and `audit-docs/` forks to `ft-audit/`, `ft-audit-docs/`; re-point `task` and `flowtron` symlinks; rename `audit.md` / `audit-docs.md` command files.
- [ ] **Add SPEC namespace section** — short subsection establishing the `ft-` prefix contract (likely after `What is Flowtron` or under `Working in the flowtron repo itself`).
- [ ] **Fold CORE-103** — flip its PLAN.md line to `Completed YYYY-MM-DD. (folded into CORE-104)` and move to `## Completed`.
- [ ] **Sweep `.claude/settings.local.json`** — update path-specific allow-list entries to new paths; flip `Skill(audit-docs)` → `Skill(ft-audit-docs)`.
- [ ] **Verification grep** — run the omnibus pattern; review remaining hits and decide retain-vs-fix per file.
- [ ] **Dogfood test** — verify flowtron-self `/ft-audit-docs` and `/ft-task` invocations work (this very tasknote's `/task` invocation no longer matches the renamed skill; that's an expected post-rename artifact captured in the closure recap).
- [ ] **File `CORE-105`** in PLAN.md for the v3.0.0 release cut.
- [ ] **Closure** — Doc-drift sweep, flip PLAN.md `CORE-104` line, archive tasknote.

## 🔗 Related

- [[CORE-103]] — folded into this task (substantive content rides along in MIGRATION.md update)
- [[CORE-101]] — created the audit family being renamed
- [[CORE-090]] — last `/flowtron` info-skill touch (adopter framing)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Collision risk is real (15 skills, generic names like `task`/`audit`/`release` shipping into adopter `.claude/skills/`); surface is well-scoped (~30 files); decisions are well-defined (prefix shape + migration strategy + epic-or-not). No drift; archive shows no prior namespacing attempt.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions (see "Decisions captured" below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Collision surface (the real concern)

Three different shipping modes, three different collision risks:

| Skills | Mode | Path on adopter machine | Collision behavior |
|---|---|---|---|
| `task`, `starter-task`, `micro-task`, `file-followup`, `epic-discovery`, `close-epic` (6) | **Symlinked** into adopter `.claude/` at adoption time (per `CLAUDE-snippet.md` §"One-time symlink wiring") | `.claude/skills/<name>` → `_project/flowtron/claude/skills/<name>` | The symlink occupies the namespace slot; adopter cannot define a same-named skill without breaking the link first |
| `new-project` (1, adopter-facing) + `release` (1, flowtron-self) | **Global symlinks** in `~/.claude/skills/` (per `MIGRATION.md` §1.0 "One-time global installs") | `~/.claude/skills/<name>` → `~/code/flowtron/claude/skills/<name>` | Shadows any user-owned global skill of the same name |
| `audit`, `audit-docs`, `audit-backend`, `audit-frontend`, `audit-performance`, `audit-security` (6) | **Forked** (file-copied) by adopters per `MIGRATION.md` §1.2.1 | adopter `.claude/skills/<name>/SKILL.md` (cp from upstream) | Adopter owns the name post-fork — but the §1.2.1 `cp` would silently overwrite a pre-existing same-named skill |
| `flowtron` (info skill) (1) | Not currently wired into adopters (CORE-103 gap); flowtron-self only at the moment | `~/.claude/skills/flowtron` (if globally wired) or none | If/when wired globally, shadows user-owned `flowtron` skill (low collision likelihood — the name is project-specific) |

All 15 skills are in scope for the rename — every shipping mode has at least one collision risk.

### Reference inventory (sweep scope, non-archive)

Slash-command mentions across the markdown surface (per `grep -rln`):

- `/task` — 38 files · `/audit` — 20 · `/flowtron` — 24 · `/starter-task` — 18 · `/micro-task` — 17 · `/close-epic` — 17 · `/new-project` — 16 · `/file-followup` — 16 · `/epic-discovery` — 15 · `/release` — 10 · `/audit-docs` — 6 · `/audit-backend` — 5 · `/audit-frontend` — 4 · `/audit-performance` — 3 · `/audit-security` — 3

Sweep touches: `SPEC.md`, all 5 `SPEC/*.md` modules, all 15 `claude/skills/*/SKILL.md`, all 15 `claude/commands/*.md`, `claude/CLAUDE-snippet.md`, `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `README.md`, all 5 `templates/*.md`, and `_project/tasknote/README.md` cross-references. Plus skill-internal directory self-refs (e.g. `task/SKILL.md` references `claude/skills/task/`) and SKILL.md frontmatter `name:` fields.

**Out of scope by SPEC §"Tasknote frontmatter" write-once policy:** archived tasknotes under `_project/tasknote/archive/CORE/` — they remain historical records with the old names.

**Also in scope:** flowtron-self's own `.claude/` at repo root (dogfooded skills): forked `audit`, `audit-docs` directories + symlinks for `task`, `flowtron`. The forks need renaming or remigration; the symlinks need re-pointing.

### Archive skim findings

Prior tasknotes that touched the namespace surface (informational — no prior namespacing decision):

- **CORE-004** (2026-04-28) — built `claude/` + self-hosting (original `/task` shape)
- **CORE-012** (2026-04-30) — `/new-project` skill (created)
- **CORE-054 / CORE-057** (2026-05-09) — `expand-shipped-skills` epic (created `/release`, `/epic-discovery`, `/close-epic`, `/file-followup`)
- **CORE-072 / CORE-082** (2026-05-10 / 2026-05-11) — `/audit` skill + audit doc-drift sweep
- **CORE-084 / CORE-090** (2026-05-11 / 2026-05-14) — `/flowtron` info skill + adopter framing
- **CORE-101 / CORE-102** (2026-05-17) — audit family bundle (created 5 audit-* siblings) + v2.2.0 release
- **CORE-103** (still open, Low) — `/flowtron` adopter-wiring gap; orthogonal but adjacent — may fold in

No prior tasknote considered a uniform namespace prefix. Naming choices were made ad-hoc at each skill's creation. This is greenfield contract work.

### Drift check

PLAN-line claims match current state:

- 6 named skills (`task`, `audit`, `release`, `new-project`, `audit-docs`, `flowtron`) all present at `claude/skills/<name>/SKILL.md` with matching frontmatter `name:` ✓
- Sweep surface cited (`claude/skills/`, `claude/commands/`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`, SPEC files, `_project/` cross-references) all present ✓
- "Breaking change for every adopter" — accurate; adopter `.claude/` symlinks would dangle on bump until re-symlinked
- "May promote to an epic during discovery" — open question; surfacing in clarifications below

No drift.

### Decisions captured (2026-05-17)

1. **Prefix:** `ft-` (short, idiomatic; reserves `ft-` namespace for flowtron-owned skills).
2. **Migration strategy:** **Hard cutover** — single major bump (v3.0.0). Old names removed in the same release. Adopters re-symlink on bump per the standard SPEC §Versioning flow. Matches flowtron's "deliberate version bumps" + "zero scripts" philosophy.
3. **Scope shape:** **Single CORE-104** for the rename + sweep. A separate follow-up **CORE-105** to be filed for the v3.0.0 release cut.
4. **`/flowtron` info skill:** Apply prefix uniformly → `/ft-flowtron`. No exception. Fold open **CORE-103** (the `/flowtron` adopter-wiring gap) into this task while the file is open — its substantive payload (adopter-facing global install of `/ft-flowtron`) rides along in the `docs/MIGRATION.md` §1.0 update.

### Surface inventory confirmed

- **Markdown:** ~30 files via `grep` against the `--exclude-dir=archive` set. SPEC + SPEC modules, all 15 SKILL.md + commands, CLAUDE-snippet, MIGRATION, PHILOSOPHY, README, templates/, `_project/tasknote/README.md`.
- **Code:** zero hits in `viz/src/` — viz parses PLAN.md task lines, not skill names. (`node_modules/` hits are unrelated.)
- **Configs:** `.claude/settings.local.json` carries permission allow-list entries citing specific paths (`claude/skills/task/SKILL.md`, etc.) + `Skill(audit-docs)` — handled as a sweep substep (per-machine file; best-effort).
- **Out of scope per write-once policy:** `_project/tasknote/archive/CORE/*.md` (all archived tasknotes). SPEC §"Tasknote frontmatter" mandates archives stay frozen.

### `.claude/` flowtron-self rewiring detail

```
claude/.claude/commands/
  audit-docs.md  → ft-audit-docs.md       (forked content; rename file in place)
  audit.md       → ft-audit.md
  flowtron.md    → ft-flowtron.md         (symlink → ../../claude/commands/ft-flowtron.md)
  task.md        → ft-task.md             (symlink → ../../claude/commands/ft-task.md)

claude/.claude/skills/
  audit/         → ft-audit/              (forked dir; rename)
  audit-docs/    → ft-audit-docs/
  flowtron       → ft-flowtron            (symlink → ../../claude/skills/ft-flowtron)
  task           → ft-task                (symlink → ../../claude/skills/ft-task)
```

### SPEC namespace contract (to land during sweep)

Short section to add to `SPEC.md`, placed under "Working in the flowtron repo itself" or as a new top-level subsection:

> ### Skill namespace
>
> Bundled flowtron skills carry the `ft-` prefix (`/ft-task`, `/ft-audit`, `/ft-release`, etc.). The prefix reserves the `ft-` slug namespace for flowtron-owned skills. **Adopters MUST NOT use `ft-` for project-specific skills.** When forking the audit family (per `docs/MIGRATION.md` §1.2.1), name the fork without the prefix — `audit-payments`, not `ft-audit-payments` — so ownership stays clear in skill resolution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no prior namespacing in flowtron; `ft-` codified as new shape, recorded in SPEC §"Skill namespace"
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior (N/A — markdown + symlinks only)

**Implementation Notes:**

- **15 `git mv` pairs** under `claude/skills/<old>` → `claude/skills/ft-<old>` and `claude/commands/<old>.md` → `claude/commands/ft-<old>.md`. Nested lazy fragments under `task/` and `micro-task/` followed via the dir rename.
- **15 SKILL.md `name:` frontmatter** fields flipped to `ft-<old>` via batched `sed -i ''`.
- **Markdown sweep via `perl -i -pe`** across all `*.md` excluding `_project/tasknote/archive/`, `node_modules/`, `.git/`, and the active `_project/tasknote/CORE-104.md`. Per-name substitution `s|/<name>\b|/ft-<name>|g` for the 14 names where path forms are bundle-renamed; `flowtron` got three targeted patterns (skills-path, commands-path, slash-command-with-negative-lookbehind) to preserve `_project/flowtron/...`, `~/code/flowtron/...`, and `flowtron.git` URLs. Final omnibus grep returned only intentional residue in CORE-104.md.
- **Flowtron-self `.claude/` rewired**: `audit`/`audit-docs` forks renamed via `git mv`; `task`/`flowtron` symlinks removed and recreated under `ft-` slugs pointing at the new upstream targets. Both forked SKILL.md `name:` fields hand-edited (the sweep doesn't touch frontmatter).
- **SPEC §"Skill namespace"** section added between "Working in the flowtron repo itself" and "Task ID convention" — codifies the `ft-` reservation and adopter forking guidance.
- **CORE-103 folded**: substantive payload (`/ft-flowtron` adopter-facing global install) landed in `docs/MIGRATION.md` §1.0 between `/ft-new-project` and `/ft-release`. PLAN.md line flipped to Completed stub `(folded into CORE-104)`; `## Low` collapsed to `(none)`.
- **`.claude/settings.local.json`** updated: 4 path-specific Bash allow-entries and `Skill(audit-docs)` → `Skill(ft-audit-docs)`.
- **CORE-105 filed** in PLAN.md `## Medium` for the v3.0.0 release cut.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code (N/A — no code changes, only markdown + symlinks + JSON allow-list)
- [x] Ran lint/type-check on changed code (N/A — markdown surface)
- [x] (frontend) Asked the user for visual confirmation (N/A — no UI)

**Testing Notes:**

- **Skill resolution dogfood** — Claude Code harness re-scanned `.claude/skills/` mid-rename; subsequent system reminders surfaced `ft-task`, `ft-flowtron`, `ft-audit`, `ft-audit-docs` as recognized skills. The new namespace resolves end-to-end on this machine.
- **Omnibus verification grep** — three passes (slash-skill refs, `claude/(skills|commands)/<old>` path refs, frontmatter `^name: <old>$`). All residue is intentional: bare-name discussion text inside this tasknote (excluded from sweep) and repo/submodule path forms preserved by design.
- **Dangling symlinks** — perl reported 2 `Can't open` errors during the sweep for `.claude/commands/task.md` and `.claude/commands/flowtron.md` (the symlinks targeting renamed-away upstream files); both removed + recreated under `ft-` in the rewire step.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — updated via sweep (slash-skill refs flipped to `ft-`); no further drift
  - `SPEC.md` — updated via sweep + new §"Skill namespace" section codifying the contract
  - `docs/MIGRATION.md` — updated via sweep + new `/ft-flowtron` global install block in §1.0 (CORE-103 fold)
  - `claude/CLAUDE-snippet.md` — updated via sweep (symlink commands now reference `ft-*` on both source and target sides); no further drift
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/CORE/`
- [x] Recap drafted (surfaces at closure)

**Final Summary:**

Renamed all 15 bundled flowtron skills to the `ft-` namespace prefix (`/ft-task`, `/ft-audit`, `/ft-release`, etc.) to eliminate skill-resolution collisions with adopter-owned skills. Hard cutover — ships in v3.0.0 (CORE-105). 62 files changed across SPEC + 5 lazy modules, all 15 SKILL.md (including lazy fragments), all 15 command stubs, CLAUDE-snippet, MIGRATION (with new `/ft-flowtron` global install — CORE-103 folded), PHILOSOPHY, README, 4 templates, flowtron-self `.claude/` (forks renamed, symlinks re-pointed), and `.claude/settings.local.json` allow-list. SPEC ships a new §"Skill namespace" section codifying the `ft-` reservation and forking guidance.

**Archived:** 2026-05-17
