---
title: release v5.18.0
status: completed
tags: []
created: 2026-08-18
due:
related-tasks: [CORE-EPIC-445, CORE-444, CORE-443]
---

# CORE-449 | release v5.18.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]] [[CORE-444]] [[CORE-443]]

## 🎯 Goal

Cut the v5.18.0 minor release tagging CORE-EPIC-445 (graph-lite planning) and CORE-444 (NAS/TERM event cues) since v5.17.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.17.0` → `v5.18.0`
- [x] docs/MIGRATION.md example pin bumped `v5.17.0` → `v5.18.0`
- [x] SECURITY.md release-tag example pin bumped `v5.17.0` → `v5.18.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.17.0` → `v5.18.0`
- [x] `viz/package.json` `"version"` bumped `"5.17.0"` → `"5.18.0"` (bare semver, no `v` prefix), `viz/package-lock.json` resynced to match
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.18.0`, or recorded `skipped @ v5.18.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-449 — flowtron v5.18.0 (...)` commit lands
- [x] Annotated `v5.18.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.18.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-449.md`

## 🧩 Subtasks

- [x] 5 version edits (+ package-lock resync)
- [x] Dogfood gate walk (Claude / Grok / Codex / Cursor refresh-or-skip)
- [x] SOP-currency check (flag-don't-bump)
- [x] viz lint/typecheck/test + updater test suite
- [x] Doc-drift sweep + standing checks (wiring count · skill parity · installed surface · self-wiring · README counter · mirror pairs A–H)
- [x] Tag message drafted and approved
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-443]] — prior release v5.17.0 (precedent)
- [[CORE-EPIC-445]] — graph-lite planning (headline)
- [[CORE-444]] — 📡 NAS and 💻 TERM event cues

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:3` and `git describe --tags` both read `v5.17.0` (no drift). 17 commits since the tag — 7 `feat:`, 4 `chore:`, 3 `docs:`, 3 `fix:` — with zero `feat!:` and zero `BREAKING CHANGE:` bodies. Highest rank is minor → `v5.18.0`, matching the PLAN-line target and the user-confirmed bump (`go` on the suggested line).

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:447` example pin, `SECURITY.md:115` release-tag pin, `viz/src/ui/constants.ts:41`, `viz/package.json:4`, `viz/package-lock.json:3,9`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — [[CORE-443]] (v5.17.0) is the direct prior precedent: same five-pin, dogfood-gate (Claude / Grok / Codex / Cursor), SOP-currency, VERSION-HISTORY prepend, standing checks including mirror pairs A–H. **No structural drift in the release recipe** since that cut; this window's work is feature/docs, not recipe change. Older release shape ([[CORE-048]], [[CORE-046]]) is already superseded by CORE-443.

- [x] **Drift check** — all five pins resolved at `v5.17.0` pre-edit; last tag matched `SPEC.md:3`. PLAN line `release v5.18.0` matches the computed minor bump. No drift in the cited locations.

- [x] **Adopter migration impact** — classified all 17 commits; see Discovery Notes. **Verdict: no required project-side edits.**

- [x] No clarifications needed beyond the mandatory dogfood-gate resolution (asked via AskUserQuestion in Phase 2). Bump is minor, not major; adopter impact is unambiguous — no skill retired, no skill added, snippet `ln -s` count unchanged at 22.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** 17 commits since v5.17.0. Prefix mix: 7 `feat:` / 4 `chore:` / 3 `docs:` / 3 `fix:`. Zero `feat!:`, zero `BREAKING CHANGE:`.

Themes:

1. **Graph-lite planning** (headline). [[CORE-EPIC-445]] ships omit-when-absent YAML planning keys (`touches` / `blocked-by` / `parallel-safe-with`) as template comments, epic-worktree fan-out on Discovery `.1`, archive decision-link skim edges, and viz optional-edge chips. No validator; default board unchanged.
2. **Operator-cue vocabulary.** [[CORE-444]] adds 📡 NAS and 💻 TERM destructive-action cues and narrows ▶️ RUN to generic/agent-adjacent workspace commands.
3. **viz parser robustness.** [[FE-086]] groups completed rows by checkbox not heading; [[FE-087]] tolerates adopter PLAN.md near-misses (lettered subtasks, nested decimals, swapped `[!critical]`).
4. **Docs + CI hygiene.** [[CORE-446]]/[[CORE-447]]/[[CORE-448]] public-index leftovers, Cursor-only staging note, SECURITY reporting sentence; CI fetches full git history so updater tests can see release tags.

**Adopter impact: no required project-side edits.** Verified rather than assumed:

- **No skill retired and none added** — `git ls-tree v5.17.0:claude/skills` vs `ls claude/skills` are the same 18 slugs. `grep -c '^ln -s' claude/AGENTS-snippet.md` is **22 at both v5.17.0 and HEAD**.
- **Template diffs are comment-only optional YAML** — new keys are omit-when-absent; existing tasknotes need no rewrite. Next `/ft-task` copy from the submodule picks them up.
- **Contract and skill-body changes** (fan-out, decision-link skim, NAS/TERM cues) are picked up on bump with no project-side edit. Viz and CI live in this repo.

**Sentinel note:** because the verdict is "no required edits", the tag's Migration block must open with the exact `No required project-side edits` sentinel — `tools/update-adopters.mjs:migrationBearingTags` does a `startsWith` on it, and as of [[CORE-424.3]] the gate is fail-closed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — five-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution — five pins landed; dogfood stamps resolved

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**Five version edits (landed):**
1. `SPEC.md:3` → `v5.18.0`
2. `docs/MIGRATION.md:447` example pin → `v5.18.0`
3. `SECURITY.md:115` release-tag pin → `v5.18.0`
4. `viz/src/ui/constants.ts` `VIZ_VERSION` → `v5.18.0`
5. `viz/package.json` + `viz/package-lock.json` bare `"5.18.0"`

**Residual `v5.17.0` grep (expected only):** write-once `docs/VERSION-HISTORY.md` v5.17.0 heading; `SPEC/procedures/ft-task.md` `last-verified: v5.17.0 · 2026-08-18` (SOP↔source stamp, never a release pin). Claude skip prefix stays `v5.16.0`.

**SOP currency: clean.** `SPEC/procedures/ft-task.md` last-verified date is 2026-08-18; zero tier-1 candidates on `claude/skills/ft-task/` / `templates/tasknote-template.md`; no tier-2 `SPEC.md` note. Stamp left un-bumped.

**Dogfood gate (resolved):**
- Claude — skipped @ `v5.18.0` (prefix stays `v5.16.0 · 2026-08-09`; matrix + `claude/CAPABILITIES.md`)
- Grok — refreshed → `v5.18.0 · 2026-08-18 (dogfooded)` (parallel Grok session evidence; matrix + `docs/PLATFORMS.md` footer). Contract read at v5.18.0; full cue vocabulary including NAS/TERM; Phase 1 on CORE-449 with default-skip; stamp files not touched by that session.
- Codex — refreshed → `v5.18.0 · 2026-08-18 (dogfooded)` (parallel Codex session wrote matrix + `docs/PLATFORMS.md` footer). Contract comprehension, cue-render, read-only Phase 1 on CORE-449.
- Cursor — refreshed → `v5.18.0 · 2026-08-18 (dogfooded)` (this `/ft-release` session; matrix + `docs/PLATFORMS.md` footer)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A (version strings + stamps; no logic)

- [x] (frontend) Visual confirmation — N/A (version string only; no UI chrome change)

**Testing Notes:**

- `npm --prefix viz test` — 22 files / 362 tests passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — 34/34 passed
- `node --check` on updater + test file — clean
- Markdown edits are single-token version substitutions plus dogfood stamps; frontmatter and fences untouched

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep report:**

### `/ft-audit docs` (subroutine mode — no PLAN writes)

**Pass 1 Claims vs. code** — clean after standing-check absorbs. Version pins match live files; dogfood stamps match matrix/footers; shipped skill inventories match snippets; installer counts still 22.

**Pass 2 Cross-doc consistency** — clean. The five release pins agree at `v5.18.0`. Dogfood tetrad (Grok/Codex/Cursor refreshed, Claude skipped @ v5.18.0) is consistent across `AGENT-COMPAT.md` + `CAPABILITIES.md` + `PLATFORMS.md`.

**Pass 3 Cross-references** — clean. No live broken links in the AI-referenced set; `ft-new-project` Step 8 prose "twenty-two" matches 22 `readlink` lines.

**Pass 4 Currency** — README counter corrected 677→**689**; date range 2026-04-28 → 2026-08-18. Filled `**Archived:**` date hits (694) exceed file count (689) by extra in-file matches, not missing dates — not material; no follow-up.

**Pass 5 Stale content** — clean. Residual `v5.17.0` hits are historical VERSION-HISTORY or the SOP `last-verified` stamp.

**Findings:** zero Critical / High / Medium / Low remaining after absorbing the README counter.

### Standing checks (§7.1)

| Check | Result |
|---|---|
| Claude symlink-wiring count (`ln -s` = 22 = MIGRATION 1.6 = ft-new-project Step 7/8) | clean |
| Shipped-skill parity (claude ↔ codex inventories) | clean |
| Installed-surface policy (adopter subset exact; forbidden slugs absent) | clean |
| Local self-wiring (`.claude/` ↔ shipped; no dangling / non-symlink) | clean |
| Global wiring (advisory) | clean — 23 links, one path casing (`/Users/fakeneuron/Code/flowtron`), no dangling |
| README task-counter | absorbed — 677→689, as-of 2026-08-18 |
| Mirror pairs A–H | clean |

AI-referenced docs: `README.md` (counter), `SPEC.md` / `docs/MIGRATION.md` / `SECURITY.md` (pins), `docs/AGENT-COMPAT.md` / `docs/PLATFORMS.md` / `claude/CAPABILITIES.md` (stamps) updated this cut; remaining entries no change.

**Final Summary:** Cut flowtron v5.18.0 — 17 commits since v5.17.0. Headline: graph-lite planning YAML (omit-when-absent keys, epic fan-out, archive decision links, viz optional edges) plus 📡 NAS / 💻 TERM cues. Viz parser robustness (FE-086/FE-087). Dogfood: Grok/Codex/Cursor refreshed, Claude skipped @ v5.18.0. Adopter impact: no required project-side edits. Migration block opens with the fail-closed sentinel.

**Archived:** 2026-08-18
