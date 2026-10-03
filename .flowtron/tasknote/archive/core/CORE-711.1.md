---
title: flaitron-rebrand discovery
status: completed
tags: [rebrand, breaking, fleet]
created: 2026-10-03
due:
related-tasks: [CORE-EPIC-711, CORE-711.N]
touches:
  - .flowtron/PLAN.md
  - .flowtron/tasknote/CORE-711.1.md
---

# CORE-711.1 | flaitron-rebrand discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-711]] [[CORE-711.N]]

## 🎯 Goal

Inventory every live `flowtron` reference (this repo, the 22-repo adopter fleet, global config, external surfaces), settle the migration shape and ordering, and file implementation children `.2..(M+1)` under CORE-EPIC-711 so the rename can ship as v6.0.0.

## ✅ Acceptance

- [x] Inventory recorded in Discovery Notes for all four surfaces (repo, fleet, global, external) — `judgment`: completeness of a survey has no single command; backed by the grep counts recorded
- [x] Migration shape settled (back-compat posture, fleet mechanism, ordering) and recorded — `judgment`: design decision, operator-confirmed
- [x] Children `.2..(M+1)` filed nested under CORE-EPIC-711, before `.N` — `grep -nE '^  - \[ \] \*\*CORE-711\.[2-9]' .flowtron/PLAN.md`
- [x] Parent epic line refined at `.1` closure (per its own note) — `grep -n 'CORE-EPIC-711' .flowtron/PLAN.md`
- [x] `## 🌳 Fan-out` section names Parallel / Sequential / Synthesis rows (M>1) — `grep -q '^## 🌳 Fan-out' .flowtron/tasknote/archive/core/CORE-711.1.md`

## 🧩 Subtasks

- [x] Repo inventory (pattern classes, code-path constants, env vars, localStorage keys, CI, brand)
- [x] Fleet inventory (adopters, `.gitmodules`, symlinks, natabula-owned deposits, snippet surfaces)
- [x] Global + external inventory (`~/.claude/`, `~/fakeneuron/`, judedelparte) — scan only operator-approved paths (`~/fakeneuron/` blocked by the guard → deferred to a child)
- [x] Resolve open questions via AskUserQuestion
- [x] Draft child list + ordering + Fan-out
- [x] File children in PLAN.md; refine parent line

## 🔗 Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.N]] — terminal audit

## 🌳 Fan-out

- **Parallel:** [[CORE-711.2]] · [[CORE-711.3]]
- **Sequential:** [[CORE-711.4]] after .2 + .3 · [[CORE-711.5]] after .4 · [[CORE-711.6]] after .4 (parallel with .5) · [[CORE-711.7]] after .5 + .6 · [[CORE-711.8]] after .5
- **Synthesis:** [[CORE-711.N]] (audit; no extra parent synthesis task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Epic filed today; nothing has landed against it. Starter's file survey still matches the tree (drift check below).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — `N/A` for this Discovery (no code); recorded per-child ownership boundaries (viz / tools / text+folder) in Discovery Notes so children don't overlap

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

_Starter context (filed 2026-10-03) absorbed: locked decisions — no v5.x release first (3 docs-only commits ride into v6.0.0); rename GitHub repo (redirects cover old URLs); one fleet wave to `.flaitron/`; keep `ft-*` prefix; legacy/archived tasknote **content** untouched (folder still moves). Full original in git history at d6910914._

**Inventory — repo (2026-10-03).** 153 live tracked files / ~1,944 occurrences outside the fence (archive + `PLAN-ARCHIVE.md` hold 7,860 — untouched). By dir: claude 38, viz 35, SPEC 21, docs 16, codex 12, templates 8, `.flowtron` 5, brand 3, tools 2, cursor 2, grok 2, + root singletons (SPEC.md, README, AGENTS/CLAUDE, SECURITY, CONTRIBUTING, justfile, .editorconfig, .gitleaks.toml, ci.yml). Pattern classes: `.flowtron/` 744, `.flowtron/core` 282, `Flowtron` 197, `FLOWTRON_*` 75, `[Cc]ode/flowtron` 20, `github.com/fakeneuron/flowtron(.git)` 6. Code-level identifiers that must change together:
- viz: `workspace.ts` hard-codes `join(root, '.flowtron', …)` (PLAN, PLAN-ARCHIVE, tasknote, archive, `core/SPEC.md`); localStorage keys `flowtron-viz-{theme,view,active-project,prefs:}` (+ `public/theme-init.js`); env `FLOWTRON_VIZ_WORKSPACE`; `flowtronVersion`/`flowtronWatch` identifiers.
- tools: `update-adopters.mjs` — `FLOWTRON_REPO`, `SUBMODULE_PATH = .flowtron/core`, legacy `.flowtron/flowtron` detection, env `FLOWTRON_{VIZ_WORKSPACE,UPDATE_LATEST,FETCH_TIMEOUT_MS}`.
- Name lengths match (8 chars) → `docs/CONTEXT-BUDGET.md` byte budgets are unaffected by a pure substitution.

**Inventory — fleet.** 22 adopters (all on `.flowtron/core`, url `github.com/fakeneuron/flowtron.git`); `postiz` is not an adopter. ~450 relative symlinks `../../.flowtron/core/{claude/skills,claude/commands,codex/skills}/*` + one `../.flowtron`. Per-adopter live hit categories: `docs/*` 86, active tasknotes 34, audit forks 33, AGENTS.md 23, `.gitmodules` 23, PLAN.md 23, natabula-owned deposits (`.gitleaks.toml`, `.claudeignore`, `.cursorignore`, `.cursorrules`, `.pre-commit-config.yaml`, `.ignore`, `.claude/settings.json` deny rule `.flowtron/core/.flowtron/**`) ~22 each, README 21, CLAUDE.md 15. natabula: ~90 files (skills incl. `natabula-align` layout check, `configs/` deposit sources, fleet scripts, docs, frontend fixtures). Deposits must change in natabula `configs/` first and flow out via natabula's own layer-refresh (FLEET-ARCHITECTURE one-way flow).

**Inventory — global (`~/.claude/`, operator-approved this session).** 23 global symlinks into `~/Code/flowtron/claude/{skills,commands}` — **10 already dangling** (retired skills: ft-audit-context, ft-flowtron, ft-goal-task, ft-starter-task, ft-stats, ft-worktree-{start,end}; commands ft-audit-context/ft-flowtron/ft-stats); global `CLAUDE.md` L44 (`~/code/flowtron/` pointer); `settings.json` L105 (prose); `hooks/guard-path-access.sh` mentions flowtron (contents not read — hook blocked the read); Claude project memory dir `projects/-Users-fakeneuron-Code-flowtron/` is keyed to the folder path → must move with the folder rename. `path-access-roots` uses a bare `~/Code` root → unaffected. `~/Code/CLAUDE.md` names the "flowtron `wt-<ID>` worktree convention".

**Inventory — external.** `judedelparte` = the `~/Code/judedelparte` personal-site repo: `content/apps/flowtron.yml`, `frontend/public/app-icons/flowtron.svg`, tests, plus mentions in `content/apps/{caobunga,natabula}.yml` and `content/experience/fakeneuron-founder.yml`. `~/fakeneuron/` **not scanned** — the Path Access guard blocks it (not in `path-access-roots`); only the operator can add a root, so its inventory moves into the global/external child.

**Archive skim (probe over CORE-264/265/272/273/312/642 + 389.1/389.4/565.4/632.3).** Precedent: `_project/` → `.flowtron/` (CORE-264, v5.0.0 via CORE-265) — single `git mv` + two-pass longest-first sed over ~70 live files, archives untouched, hard cut, manual adopter recipe (no fleet tool then). Lessons: (1) moving the parent dir moves the submodule — that is how the accidental `.flowtron/flowtron` layout happened (CORE-272/273); rename both together and grep bootstrap docs; (2) read the submodule path from `.gitmodules`, don't hard-code; (3) update-adopters (CORE-312) **skips** any range containing a Migration-block/BREAKING tag and never re-wires symlinks — the migrate mode must lift both deliberately; (4) self-skip uses realpath because of `~/code` vs `~/Code` (CORE-592); (5) `.git/modules/<name>` relocation is uncovered by any prior note; (6) the `.flowtron/core/.flowtron/` dogfood-fence path lives in MIGRATION §1.1, all four AGENTS-snippets, and `/ft-new-project` Step 3b (CORE-632.3/642); (7) concurrent sessions may edit PLAN.md mid-wave (CORE-642).

**Drift check.** Starter's "Files to touch" dirs all exist and carry hits. One deviation from the starter: its ordering lean was "content → wave → repo rename + tag"; update-adopters pins to the latest release tag, so the tag must exist before the wave → operator chose content → v6.0.0 + renames → wave. PLAN epic line ("ships as v6.0.0 after the rename") stays true. No SPEC contract contradicted.

**Clarifications (AskUserQuestion, 2026-10-03).**
- Scan scope: `~/.claude/` + `~/fakeneuron/` approved (the guard still blocked `~/fakeneuron/`; see above).
- Back-compat: **hard cut** — viz, tools, env vars (`FLOWTRON_*` → `FLAITRON_*`), localStorage keys know only the new name; viz prefs reset once.
- Fleet mechanism: **migrate mode in `tools/update-adopters.mjs`**, run as the v6.0.0 bump wave on one confirm; outside adopters get a manual recipe in `docs/MIGRATION.md`.
- Ordering: **content → v6.0.0 + GitHub/folder renames → wave → natabula/global/external → audit**.
- Assumed from starter leans (not re-asked): VERSION-HISTORY and tags keep old names for past entries; wave commits stay local (no bulk push); case-insensitive FS — `mv` to a different name is safe, the stale `code/flowtron` additional-working-dir registration is session config only.

**Child ownership boundaries** (so parallel children don't collide): `.2` owns `viz/**`; `.3` owns `tools/**`; `.4` owns everything else in-repo including the self-host `.flowtron/` → `.flaitron/` move, which must land in the same commit as the skill/SPEC text that names the path (otherwise the workflow can't find PLAN.md mid-epic). Shared env name both `.2` and `.3` adopt: `FLAITRON_VIZ_WORKSPACE`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling — followed SPEC/epic.md child filing (numeric children nested before `.N`) and SPEC/tasknote-inserts.md Fan-out shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup — `N/A`, planning-only diff

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, no code

**Implementation Notes:**

Filed `.2`–`.8` nested under CORE-EPIC-711 before `.N`; flipped `.1` to stub; rewrote the epic line (trimmed 78→≤70 words, added hard-cut posture + child ordering, "judedelparte GitHub branding" → "judedelparte site"). Doc-drift sweep surfaced the `docs/EXTERNAL-AGENTS.md` same-closure caller-row rule → folded into `.4`'s line (caobunga caller-side row). Side finding recorded in `.5`: 10 global `~/.claude` ft-* symlinks already dangle (retired skills).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, markdown-only

- [x] Ran lint/type-check on changed code — `git diff --check` clean

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -nE '^  - \[ \] \*\*CORE-711\.[2-9]' .flowtron/PLAN.md` → 0 (7 rows, .2–.8)
- `grep -n 'CORE-EPIC-711' .flowtron/PLAN.md` → 0 (refined line, 70w cap respected)
- `.8` sits before `.N` (awk order check) → ok
- `grep -q '^## 🌳 Fan-out' .flowtron/tasknote/archive/core/CORE-711.1.md` → run post-move (see recap)
- Inventory / migration-shape criteria → `judgment`, operator-confirmed at the 🛠️ gate ("go")
- Quality assertions: `N/A`, no code.
- External review: `N/A` — planning-only markdown diff (PLAN rows + this note); the operator graded the child list at the 🛠️ gate.
- Frontend 👁️: `N/A`, no UI change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — no change to README, AGENTS, SPEC, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT (Discovery files work, renames nothing); EXTERNAL-AGENTS no change now, but its same-closure caller-row rule is carried onto `.4`

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Inventoried 153 live repo files (~1,944 refs), 22 adopters (~450 symlinks + natabula-owned deposits), global `~/.claude` surfaces, and the judedelparte site; settled hard-cut / update-adopters migrate mode / tag-before-wave ordering; filed CORE-711.2–.8 with Fan-out. `~/fakeneuron/` left unscanned (guard-blocked) → `.8`. `touches:` reconciliation: diff = PLAN.md + this note (moved to archive) — matches declared. Learnings: `N/A` — the guard-hook scope gap is operator-owned config, not an always-loaded-layer rule.

**Archived:** 2026-10-03
