---
title: personal-conventions-out
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-652.2, CORE-597, CORE-444]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .gitleaks.toml
  - justfile
  - brand/BRAND.md
  - brand/README.md
  - docs/CONVENTIONS.md
  - .gitignore
  - SPEC/gate-postures.md
  - docs/HARNESS-SURVEY.md
  - .flaitron/tasknote/README.md
  - docs/CODEX-VERIFICATION.md
  - claude/skills/ft-new-project/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - SPEC/layout.md
  - viz/src/parser.test.ts
  - viz/src/ui/App.test.tsx
  - viz/src/visibilityPrefs.test.ts
  - SPEC/cue-vocabulary.md
  - SPEC/gates.md
  - docs/AGENT-COMPAT.md
  - docs/DOGFOOD.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-724.6 | personal-conventions-out

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Remove the operator's personal conventions from flaitron core — natabula/caobunga names and paths, machine paths, personal-repo fixture names, `~/code` prose, and the NAS-specific 📡 label — so an adopter reads a self-standing surface, while kept taste (emoji cues, commit conventions, env-overridable `~/code` defaults) stays.

## ✅ Acceptance

- [x] No non-archive `natabula` hit outside history files — `git grep -n -i natabula -- . ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md' ':!.flaitron/PLAN.md' ':!docs/VERSION-HISTORY.md' ':!.flaitron/tasknote/CORE-724.6.md'` prints nothing
- [x] No non-archive `caobunga` hit (same exclusions) — `git grep -n -i caobunga …` prints nothing; `caobunga-status.md` still ignored locally — `git check-ignore -q caobunga-status.md` exits 0
- [x] No machine path — `git grep -n -e 'Users.fakeneuron' -- . <same exclusions>` prints nothing
- [x] No `~/code` prose in ft-new-project / ft-release SKILL.md / SPEC/layout.md — `git grep -n -i '~/code' -- claude/skills/ft-new-project claude/skills/ft-release/SKILL.md SPEC/layout.md` prints nothing (step-7.1 generic clone example kept by design)
- [x] No `fintown` / `invisipaw` in viz — `git grep -n -i -e fintown -e invisipaw -- viz` prints nothing; `npm --prefix viz test` passes
- [x] 📡 relabelled `REMOTE` everywhere — `git grep -n -w NAS -- SPEC docs claude codex cursor grok ':!docs/VERSION-HISTORY.md'` prints nothing
- [x] CI drift gates still green — Pair Q citation resolution + context-budget check (commands recorded in Testing Notes)

## 🧩 Subtasks

- [x] natabula: strip `~/Code/natabula/...` paths from `.gitleaks.toml`, `justfile`, `brand/BRAND.md`, `brand/README.md`; drop the "Natabula CI spine" name in `docs/CONVENTIONS.md`
- [x] caobunga: move the ignore to `.git/info/exclude` (local); genericize `SPEC/gate-postures.md`, `docs/HARNESS-SURVEY.md`, `.flaitron/tasknote/README.md`
- [x] Machine paths → placeholders in `docs/CODEX-VERIFICATION.md`
- [x] `~/code` prose out of ft-new-project (description + example), ft-release SKILL.md, `SPEC/layout.md`
- [x] Rename viz fixtures `fintown`/`invisipaw` → neutral names
- [x] Relabel 📡 `NAS` → `REMOTE` (cue-vocabulary, gates, AGENT-COMPAT, DOGFOOD)
- [x] Phase 3: acceptance greps, viz test/lint/typecheck, CI drift checks, external review

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic (context-diet)
- [[CORE-724.1]] — Discovery that inventoried these leaks
- [[CORE-652.2]] — predecessor: labelled natabula pointers `operator-private`; this task removes the remaining paths
- [[CORE-597]] — introduced the `caobunga-status.md` ignore
- [[CORE-444]] — introduced the 📡 NAS cue

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every leak named in the PLAN line still resolves at HEAD `7a2fc7b6`; the operator scoped this neutralization in CORE-724.1's Resolved scoping.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — N/A: prose/comment edits plus test-fixture renames, no module boundary touched; code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Leak inventory (git grep, HEAD `7a2fc7b6`).**
- natabula: `.gitleaks.toml:2`, `justfile:8`, `brand/BRAND.md:18`, `brand/README.md:21` (all `operator-private`-labelled paths, from CORE-652.2), plus `docs/CONVENTIONS.md:54` "the Natabula CI spine shape" (CORE-715, unlabelled).
- caobunga: `.gitignore:11-12`, `SPEC/gate-postures.md:264`, `docs/HARNESS-SURVEY.md` (6 sites), `.flaitron/tasknote/README.md:72` (not in the PLAN line, but the same leak class).
- Machine paths: `docs/CODEX-VERIFICATION.md:20,50,175`.
- `~/code`: `ft-new-project/SKILL.md:3,39`, `ft-release/SKILL.md:28`, `SPEC/layout.md:30`. **Kept:** `ft-release/step-7.1-standing-checks.md:93`, which explicitly protects `~/code/flaitron` as a generic clone example (CORE-410.4), and the env-overridable defaults in `tools/`.
- viz fixtures: `parser.test.ts`, `ui/App.test.tsx`, `visibilityPrefs.test.ts`.
- 📡 label: `SPEC/cue-vocabulary.md:133-140`, `SPEC/gates.md:25,57,80,86`, `docs/AGENT-COMPAT.md:161`, `docs/DOGFOOD.md:61`. Glyph-only sites (`🗄️/▶️/📡/💻`) need no edit.
- **Out of scope, kept:** `docs/PHILOSOPHY.md` origin story (fintown/InvisiPaw; kept per CORE-724.1); `docs/GATE-DISCIPLINE.md:34` "InvisiPaw FE-64" motivating case (history, not named in the PLAN line); `SPEC/scope-boundaries.md:19` (already unnamed).

**Archive skim.**
- CORE-652.2 chose to *keep* five natabula pointers labelled `operator-private`. This task deliberately goes further, as the operator scoped in 724.1, and removes the paths.
- CORE-597 / CORE-598.x added the `caobunga-status.md` ignore because orchestrator status writes were landing as commits; the ignore must survive locally.
- CORE-444 introduced 📡 NAS / 💻 TERM.
- `docs/EXTERNAL-AGENTS.md` §"Stable surfaces" does not list cue labels, and the orchestrator reads no SPEC prose (HARNESS-SURVEY §exposure), so the relabel needs no caller-side row.

**Drift check.** The PLAN line's targets all resolve. The one addition is `.flaitron/tasknote/README.md:72`, which is the same class and is noted above. No contradiction with the SPEC.

**Clarifications (AskUserQuestion, 2026-10-07):** 📡 label → `REMOTE` ("Remote-host command"); caobunga ignore → move to `.git/info/exclude`; HARNESS-SURVEY → genericize ("the external caller"), drop internal paths and CBN-235.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape; checked DRY / SRP boundaries

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, fixture renames only; no behavior change

**Implementation Notes:**

- **natabula:** removed the four `~/Code/natabula/...` paths and kept the `operator-private` qualifier only where a baseline is still being described (`.gitleaks.toml`). Dropped the justfile rationale pointer, because the comment already states its reason in place. Removed the "Natabula CI spine shape" label from CONVENTIONS and kept the `CORE-715` cite.
- **caobunga:** removed the `.gitignore` entry and added `caobunga-status.md` to this clone's `.git/info/exclude`, which is local and untracked. `git check-ignore` still matches. gate-postures, HARNESS-SURVEY and tasknote/README now say "an orchestrator" / "the external caller". HARNESS-SURVEY also drops the caller's internal paths, `phase_progress()`, and CBN-235. The renamed `### External-caller exposure` heading has no citers.
- **Machine paths:** `<self-host-root>` placeholder in CODEX-VERIFICATION (3 sites).
- **`~/code`:** removed from the ft-new-project description, which also meant the mirrored `claude/commands/ft-new-project.md` description (needed to keep Pair M in sync). Also removed from the ft-new-project example (`…/flowmagic`), the ft-release bail message, and `SPEC/layout.md`.
- **viz fixtures:** `fintown` → `acme`, `invisipaw` → `globex`.
- **📡:** label `NAS` → `REMOTE`, row name "Remote-host command", banner `Destructive REMOTE command`. The examples were neutralized (`on the server`, `ssh server`). Glyph-only `🗄️/▶️/📡/💻` sites are unchanged. `park-reason: destructive` is unaffected, and cue labels are not an EXTERNAL-AGENTS stable surface.
- Downstream-impact scan: none needed. No decision reached beyond this task.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — test fixtures only, no rendered UI change; Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (acceptance commands, exclusions as written in Acceptance):
- `git grep -n -i natabula -- . <excl>` → 1 (no hits)
- `git grep -n -i caobunga -- . <excl>` → 1 (no hits); `git check-ignore -q caobunga-status.md` → 0 (`.git/info/exclude:20`)
- `git grep -n -e 'Users.fakeneuron' -- . <excl>` → 1 (no hits)
- `git grep -n -i '~/code' -- claude/skills/ft-new-project claude/skills/ft-release/SKILL.md SPEC/layout.md` → 1 (no hits)
- `git grep -n -i -e fintown -e invisipaw -- viz` → 1 (no hits)
- `git grep -n -w NAS -- SPEC docs claude codex cursor grok ':!docs/VERSION-HISTORY.md'` → 1 (no hits)
- `npm --prefix viz test -- src/ui/App.test.tsx src/parser.test.ts src/visibilityPrefs.test.ts` → 0 (193/193). The full `npm --prefix viz test` run under load hit a 14s timeout in `App — navigateToTask > clicking a wikilink…`, which doesn't use any renamed fixture and passes in isolation. The reviewer's full run passed 587/587.
- `npm --prefix viz run typecheck` → 0; `npm --prefix viz run lint` → 0
- CI drift job steps extracted from `ci.yml`, run with `bash -e`: wrapper-name, skill parity, context budget, final newline, Pairs A/B/C/H/J/M/N/O/P/Q/R → all 0. Gitleaks was not run locally. Context budget and Pairs B/M/Q were re-run after the review fixes → 0.
- Structural quality: no dead code, and the change is prose plus fixture names only.

External review (`/code-review medium`, working-tree diff), 7 findings, all **notes**:
1. The `<self-host-root>` shell placeholder breaks the copy-paste recipe → **fixed** (`/path/to/flowtron`).
2. The `NAS`→`REMOTE` rename called a breaking contract change → **no change**. Under `SPEC/versioning.md`, a breaking (major) change needs a project-side change; this one doesn't, and cue labels aren't an EXTERNAL-AGENTS stable surface. The rename goes into the release notes.
3. The `.git/info/exclude` rule is clone-local → **no change**. This was the operator's choice in Discovery; it's surfaced again in the recap.
4. CODEX-VERIFICATION's "exact absolute prefix" no longer showed a prefix → **fixed** with #1.
5. GATE-DISCIPLINE "InvisiPaw FE-64" and PHILOSOPHY still name personal repos → **no change**, already logged out of scope in Discovery (history and origin story).
6. ft-update "`~/code` fleet" wording → **fixed** ("adopter fleet").
7. layout.md sentence repeats its heading → **fixed** ("In this repo:").

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — CONVENTIONS (Natabula label dropped) and AGENT-COMPAT (label list `NAS`→`REMOTE`) updated in-diff; SPEC.md, README, AGENTS, MIGRATION, the four snippets, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES (glyph-only 📡), EXTERNAL-AGENTS, WORKTREES, VISION: no change; — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A; — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Removed the operator's personal conventions from flaitron core. The natabula paths, caobunga mentions, machine paths, `~/code` prose in skill and SPEC text, and personal-repo viz fixtures are gone. The 📡 cue is relabelled `REMOTE` (Remote-host command). The emoji cues, commit conventions, and env-overridable `~/code` defaults are kept.

- 22 tracked files changed, all prose/comments/test fixtures. No behavior change.
- `caobunga-status.md` is now ignored through this clone's `.git/info/exclude`, so any other checkout the orchestrator writes into needs the same local line.
- **Release note:** the 📡 label changed from `NAS` to `REMOTE`, and the banner from `Destructive NAS command` to `Destructive REMOTE command`. Adopters don't need to change anything; agents pick up the new label from the bumped SPEC.
- `touches:` reconciliation: also edited `claude/commands/ft-new-project.md` (mirrored description, Pair M) and `claude/skills/ft-update/SKILL.md` (review note #6). Both were undeclared. Every declared path changed.

**Archived:** 2026-10-07
