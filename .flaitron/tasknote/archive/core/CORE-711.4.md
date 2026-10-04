---
title: text sweep + self-host move
status: completed
tags: [rebrand, breaking]
created: 2026-10-03
due:
related-tasks: [CORE-EPIC-711, CORE-711.1, CORE-711.2, CORE-711.3, CORE-711.5, CORE-711.7, CORE-711.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC.md
  - SPEC/**
  - docs/**
  - claude/**
  - codex/**
  - cursor/**
  - grok/**
  - templates/**
  - brand/**
  - .github/workflows/ci.yml
  - README.md
  - AGENTS.md
  - SECURITY.md
  - CONTRIBUTING.md
  - justfile
  - .editorconfig
  - .gitleaks.toml
  - .flowtron/** → .flaitron/**
  - ~/Code/caobunga/.flowtron/PLAN.md
blocked-by:
  - CORE-711.2
  - CORE-711.3
---

# CORE-711.4 | text sweep + self-host move

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-711]] [[CORE-711.1]] [[CORE-711.3]] [[CORE-711.7]] [[CORE-711.N]]

## 🎯 Goal

Rename every live `flowtron` reference in-repo outside `viz/` and `tools/` to `flaitron`, add the manual v6 recipe to MIGRATION.md, and `git mv .flowtron .flaitron` in the same commit, so the checkout is fully rebranded and ready for the v6.0.0 release (`.5`).

## ✅ Acceptance

- [x] Self-host layout moved: `.flaitron/` holds PLAN, PLAN-ARCHIVE, tasknote/, sidequest/, specs/; `.flowtron/` gone — `test -d .flaitron/tasknote/archive/core && test ! -e .flowtron`
- [x] No live `flowtron` outside the historical fence (Discovery Notes §Fence) — `git grep -il flowtron -- ':!viz' ':!tools' ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` prints only fenced files, each hit reviewed — `judgment` on the residual list
- [x] Archive content untouched — `git diff --cached -M --stat -- .flaitron/tasknote/archive .flaitron/PLAN-ARCHIVE.md` shows renames only (0 line changes)
- [x] MIGRATION.md carries a manual v5→v6 recipe and the updater paragraph documents `.3`'s auto-migrate; SECURITY.md fleet-updater bullets match `tools/update-adopters.mjs` (`FLAITRON_*`, migrate commit) — `grep -q 'flowtron/` → `.flaitron/`' docs/MIGRATION.md` + `judgment` read against the tool
- [x] `flowtron-reconciled:` → `flaitron-reconciled:` across template, ft-update, ft-audit bootstrap, MIGRATION; `/ft-update` stops on a pre-rename layout with a pointer to the recipe — `! git grep -n 'flowtron-reconciled' -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md' ':!.flaitron/PLAN.md' ':!.flaitron/tasknote/CORE-711.4.md' ':!docs/MIGRATION.md'` (command amended: the v6 recipe step 6 and `.7`'s row must name the old key — §Fence item 4)
- [x] Caller-side row filed in caobunga (CBN-278, High) and CORE-711.7 notes it must land first; CORE-711.N line cites this note's fence; CORE-711.7 also rewrites adopter forks' `flowtron-reconciled:` — `grep -n 'CBN-278' ~/Code/caobunga/.flowtron/PLAN.md` + `grep -n 'CBN-278' .flaitron/PLAN.md`
- [x] CI-equivalent local checks pass (viz suite, updater suite, context budgets) — `npm --prefix viz test && node --test tools/update-adopters.test.mjs` + the ci.yml drift/budget steps run locally

## 🧩 Subtasks

- [x] Protected-token substitution (`FLOWTRON`→`FLAITRON`, `Flowtron`→`Flaitron`, `flowtron`→`flaitron`) over in-scope files, sentinel-protecting `ft-flowtron`, `.flowtron/flowtron`, `flowtron v5.2.0 bump`; skipping the fenced files/ranges
- [x] Hand edits: MIGRATION.md v6 section + updater paragraph + v4 section pointer; SECURITY.md fleet-updater bullets; ft-update pre-rename stop; VERSION-HISTORY / HARNESS-SURVEY headers only; PLAN.md header
- [x] `git mv .flowtron .flaitron` (untracked `.DS_Store` travels)
- [x] PLAN amendments: `.7` (land CBN-278 first; rewrite `flowtron-reconciled:` in forks), `.N` (cite this fence)
- [x] File CBN-278 in caobunga's PLAN.md; commit there locally (no push)
- [x] Review the full diff for anachronisms and wrong rewrites; run residual greps
- [x] Run viz + updater suites and the CI drift/budget checks locally

## 🔗 Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.1]] — Discovery; Fan-out: Sequential after .2 + .3
- [[CORE-711.2]] — `blocked-by:` (closed) — owns `viz/**`
- [[CORE-711.3]] — `blocked-by:` (closed) — owns `tools/**`; its closure deferred the MIGRATION/SECURITY drift here
- [[CORE-711.7]] — fleet wave; amended here
- [[CORE-711.N]] — audit; stray-grep fence amended here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` and `.3` closed today; the in-scope tree is untouched since `.1`'s inventory. The PLAN line's deliverables all exist as described.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — `N/A` for structure: a text rename. Coupling that must move together: the SPEC.md heading `# Flowtron — Workflow Specification` is the self-host detection string in 9 skills + ft-audit bootstrap/context pass + ft-update's bail; the `.flowtron/` path is in the global skill symlinks' own text (they point into this checkout), so the move and the skill text land in one commit; the AGENTS-snippets' `ln -s` blocks are parsed by `tools/update-adopters.mjs` at `toTag` ≥ v6 and must read `.flaitron/core` (`.3` closure)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Inventory (2026-10-03).** 115 in-scope files, 1,202 case-insensitive hits (claude 38, SPEC 21, docs 16, codex 12, templates 8, root 8, `.flowtron` 4, brand 3, cursor/grok 2 each, ci.yml). Shapes: `.flowtron/PLAN.md` 121, `.flowtron/tasknote/…` ~170, `.flowtron/core…` ~250, bare product name ~700, `FLOWTRON_VIZ_WORKSPACE` 8, `github.com/fakeneuron/flowtron.git` 4, `~/code/flowtron` 8. Untracked under `.flowtron/`: `.DS_Store` only (ignored); `screenshots/viz-board.png` is tracked.

**Archive skim.** `.1` (inventory, precedent CORE-264/265: single `git mv` + longest-first substitution, archives untouched, hard cut), `.2` (viz fenced the `flowtron v5.2.0 bump` parser fixture; deferred README/SECURITY/MIGRATION/WORKTREES/snippet env-var cites here), `.3` (deferred MIGRATION updater paragraph — "skips any repo whose range carries real migration steps" no longer holds for the rename tag — and SECURITY §"Fleet updater" names `FLOWTRON_UPDATE_LATEST`/`FLOWTRON_REPO` and "pathspec commit touching only the gitlink", now bump-only). CORE-661 recorded that ft-audit's flowtron-mode detection keys on the SPEC heading.

**Drift check.** PLAN line matches the tree. SPEC contracts honored: archive write-once (fenced), Cross-repo edit remit (caobunga change is a filed row, not an edit to its code), EXTERNAL-AGENTS same-closure caller row (two stable-surface rows move: closed-row set `.flowtron/PLAN-ARCHIVE.md`, tasknote location `.flowtron/tasknote/<ID>.md`). Transitional effect (accepted by the epic ordering): between this commit and `.5`'s tag, global skill symlinks into this checkout speak `.flaitron/` while every adopter still sits on `.flowtron/core` v5.35.0 with its own per-project skill copies.

**Clarifications (AskUserQuestion, 2026-10-03).**
- `flowtron-reconciled:` → **rename** to `flaitron-reconciled:`; `.7` also rewrites the key in adopter audit forks (its line amended).
- `/ft-update` at v6 → resolves `.flaitron/core/` only; a `.flowtron/` layout **stops** with a pointer to MIGRATION's v6 section / the fleet updater; the `.flowtron/flowtron` branch is dropped.
- **Fence approved** (§Fence below); `.N`'s line cites it.
- caobunga caller row → **CBN-278 `[medium]` under High**, committed locally there (no push); `.7` notes it lands first.

**§Fence — text that stays `flowtron` on purpose** (history, not live state):
1. `docs/VERSION-HISTORY.md` release entries (only the line-3 header renames).
2. `docs/CODEX-VERIFICATION.md` (dated receipt) and `docs/HARNESS-SURVEY.md` dated passes (only the pre-pass header renames).
3. Retired-skill names: `ft-flowtron` (MIGRATION retired table, CONTEXT-BUDGET, ci.yml comment), `/flowtron`.
4. MIGRATION §"Upgrading an existing adopter from v4.x" (`_project/` → `.flowtron/`), and every `.flowtron/flowtron` legacy-layout mention; plus the pre-rename names v6 text must state to describe the move: MIGRATION's v6 recipe + updater paragraph, `/ft-update`'s pre-rename stop (skill + command), SECURITY's migrate bullets, the VERSION-HISTORY header.
5. The `flowtron v5.2.0 bump` parser fixture (`SPEC/fixtures/plan/exclusions.md`, `SPEC/plan-parser.md`).
6. Closed PLAN rows (`codex-flowtron` shortnames etc.), `PLAN-ARCHIVE.md`, archived tasknotes, and the CORE-711 rows / this note, which describe the rename.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling — CORE-264's precedent (one `git mv` + mechanical substitution, archives untouched); the v6 recipe mirrors the v4 recipe's numbered shape; Pair Q's new pre-rename mapping sits beside its existing `.flaitron/core/` prefix strip

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup — `N/A`, rename + additive doc sections only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, no code; CI's Pair Q edit is verified by running the drift job locally (Testing Notes)

**Implementation Notes:**

- Sweep: a perl pass (`FLOWTRON`→`FLAITRON`, `Flowtron`→`Flaitron`, `flowtron`→`flaitron`) over 111 tracked files, sentinel-protecting `ft-flowtron`, `.flowtron/flowtron`, `flowtron v5.2.0 bump`, and skipping MIGRATION's v4 section, VERSION-HISTORY, CODEX-VERIFICATION, HARNESS-SURVEY, and PLAN.md (1,108 lines). Then by hand: the VERSION-HISTORY line-3 header (adds "named flowtron before v6.0.0"), the HARNESS-SURVEY pre-pass header, the PLAN.md title, and `Flaitron v5.x consolidated` → `Release v5.x consolidated` (anachronism).
- Missed by the literal pattern: `[Ff]lowtron` in `/ft-release` §7.1's global-symlink casing check → `[Ff]laitron`. A case-insensitive `lowtron` grep confirms no other variants.
- `docs/MIGRATION.md`: new §"Upgrading an existing adopter from v5.x (`.flowtron/` → `.flaitron/`)" (deinit/rm the old submodule → `git mv` → re-add at the flaitron URL pinned v6.0.0 → in-place symlink retarget loop, since the snippet's `ln -s` lines are not idempotent → `.gitignore` → prose/config/fork-key sweep → one commit). The updater paragraph names the `migrate` exception (steps 1–5 automated, in-place rename; step 6 per-project). The v4 section gains a one-line "historical, continue with v6" pointer and is otherwise verbatim.
- `SECURITY.md` §"Fleet updater": intro, shared `checkoutVerified`, `applyMigrate` in local-commits, the migrate commit's `--no-verify` scope (index verified clean, carries only what the migration staged), and its extra write footprint (`.git/config`, `.git/modules/`). Env/const names were already handled by the sweep.
- `/ft-update` (skill + command): resolves `.flaitron/core/` only; a `.flowtron/` layout stops before any write and points to the v6 section or the fleet updater; the `.flowtron/flowtron` branch is dropped.
- `flowtron-tracks:` (the sibling fork key) renamed alongside `flowtron-reconciled:`, same rationale; `.7`'s line names both. The operator-local, gitignored `.claude/skills/audit/SKILL.md` (this checkout's own overlay fork, outside `.7`'s reach) was renamed in place and is uncommitted by design.
- CI Pair Q: a pre-rename `.flowtron/` citation in fenced history (closed row CORE-650, MIGRATION's v4 recipe) resolves at its v6 location (`.flowtron/core/` stripped, `.flowtron/` → `.flaitron/`).
- `git mv .flowtron .flaitron`: 1,066 renames (1,062 archive/PLAN-ARCHIVE at R100); the ignored `.DS_Store` and this untracked note travelled with it.
- PLAN: `.7` → also rewrites fork keys and lands caobunga CBN-278 first; `.N` → excludes this note's §Fence. caobunga: CBN-278 filed under High, committed locally as `5097201` (no push).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz (SPEC fixtures feed its parser tests) + updater suites

- [x] Ran lint/type-check on changed code — markdown/YAML/shell only: CI drift job run locally, `git diff --cached --check`; viz lint/typecheck/build not run (`viz/` unchanged)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`, no UI change (`viz/` untouched)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:
- `test -d .flaitron/tasknote/archive/core && test ! -e .flowtron` → 0
- residual `git grep --cached -il flowtron` (in scope) → 13 files, all fenced: PLAN (CORE-711 + closed rows), this note, ci.yml (`ft-flowtron` comment + Pair Q pre-rename mapping), SECURITY (migrate bullets), parser fixture ×2, `/ft-update` stop ×2, CODEX-VERIFICATION, CONTEXT-BUDGET (`ft-flowtron`), HARNESS-SURVEY passes, MIGRATION (v4 + v6 recipes, retired table, updater paragraph), VERSION-HISTORY — `judgment`: each hit reviewed
- archive integrity: `git diff --cached -M --name-status` over the archive + PLAN-ARCHIVE → 1062 × R100 (0 content change)
- `grep -q 'flowtron/` → `.flaitron/`' docs/MIGRATION.md` → 0; SECURITY bullets read against `tools/update-adopters.mjs` (`applyMigrate` L905, `checkoutVerified` L791, `verifyPinnedSha` L756) → match
- `! git grep -n 'flowtron-reconciled' …` (amended exclusions) → 0
- `grep -c CBN-278` → 1 in caobunga PLAN (commit `5097201`), 1 in `.flaitron/PLAN.md`
- `npm --prefix viz test` → 0 (587/587); `node --test tools/update-adopters.test.mjs` → 0 (65/65); `node --check` ×2 → 0
- CI drift job, all 15 `run:` blocks extracted and run locally under GitHub's default `bash -e` → 0 each (Pair Q failed at first on two pre-rename citations in fenced history → mapping added, then 0); `gitleaks dir . --config .gitleaks.toml` → 0 (no leaks)
- `git diff --cached --check` → 0
- Quality: no code; doc additions are scoped (one MIGRATION section, one updater sentence, five SECURITY bullet edits, one ft-update stop).

External review (`/code-review medium`, scoped to this task's staged diff) — no blockers; 3 notes:
- **note** — `/ft-release` §7.1 casing check grouped only `[Ff]laitron`, but `.5` cuts the release before re-pointing the global links → false "multiple casings" → **fixed**: `[Ff]l(ow|ai)tron`.
- **note** — `.gitleaks.toml` claims byte-identity with natabula's `configs/` source, which still says `.flowtron/`; a layer-refresh before natabula updates would revert the allowlist → **covered by CORE-711.6** (its line moves natabula's `configs/` deposits to `.flaitron/` before the wave); no change here.
- **note** — v6 recipe step 7 didn't tell the reader to stage steps 4–6 → **fixed**: explicit staging (on whichever wiring dirs exist).
- The reviewer confirmed: CI shell, SECURITY vs the tool, URL/tag consistency, snippet `ln -s` blocks, `/ft-update` stop placement, residuals all fenced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — every entry is this task's deliverable: README, AGENTS, SPEC, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, WORKTREES, VISION → renamed; MIGRATION → + v6 section, updater exception; SECURITY → + migrate bullets; EXTERNAL-AGENTS → two stable-surface rows' paths moved (closed-row set, tasknote location) → caller row CBN-278 filed in caobunga this closure. No further drift

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Renamed every live flowtron reference outside `viz/` and `tools/` to flaitron (111 files, ~1,110 lines) and moved the self-host `.flowtron/` → `.flaitron/` (1,066 renames; 1,062 archive/PLAN-ARCHIVE at R100, content untouched) in one commit with the skill text that names the path. Added MIGRATION's manual v5→v6 recipe and the updater's `migrate` exception, brought SECURITY's fleet-updater bullets in line with `applyMigrate`, made `/ft-update` stop on a pre-rename layout, renamed the `flowtron-reconciled:` / `-tracks:` fork keys, and taught CI Pair Q to resolve pre-rename citations in fenced history. The historical fence (§Fence) is recorded for `.N`. Downstream: `.7` amended (fork keys; CBN-278 first), `.N` amended (fence), caobunga CBN-278 filed and committed locally (`5097201`, unpushed). Review: 0 blockers, 2 notes fixed, 1 covered by `.6`. `touches:` reconciliation: diff = the declared dirs/files + the `.flowtron/` → `.flaitron/` move + caobunga's PLAN. Undeclared but in scope: the gitignored `.claude/skills/audit/SKILL.md` (local, uncommitted). Transitional effect until `.5` tags v6.0.0: global skills in this checkout speak `.flaitron/` while adopters stay on `.flowtron/core` v5.35.0. For `.5`: `.claude/settings.local.json` carries absolute `~/Code/flowtron/viz` allow-rules (operator-local, folder-path-bound). Learnings: `N/A`. The bracket-class miss (`[Ff]lowtron`) is a sweep technique worth reusing in `.7`/`.N` (grep the case-insensitive stem `lowtron`), recorded here rather than in the always-loaded layer.

**Archived:** 2026-10-03
