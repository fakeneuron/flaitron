---
title: release v5.16.0
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-408, CORE-409, CORE-410, CORE-411, CORE-412, CORE-414, CORE-415, CORE-416, CORE-417, CORE-418, CORE-419, CORE-420, CORE-421, CORE-422, CORE-423, CORE-424, CORE-425, CORE-426, CORE-407, CORE-400, CORE-406, TEST-003, CORE-405]
---

# CORE-427 | release v5.16.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-420]] [[CORE-421]] [[CORE-424]] [[CORE-425]] [[CORE-405]]

## 🎯 Goal

Cut the v5.16.0 minor release tagging the 72 commits since v5.15.0 — headlined by release-gate hardening (the mirror-pair, parity, and SOP-drift standing checks), fleet-updater fail-closed safety, and the viz parser/interaction correctness cohort.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.15.0` → `v5.16.0`
- [x] docs/MIGRATION.md example pin bumped `v5.15.0` → `v5.16.0`
- [x] SECURITY.md release-tag example pin bumped `v5.15.0` → `v5.16.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.15.0` → `v5.16.0`
- [x] `viz/package.json` `"version"` bumped `"5.15.0"` → `"5.16.0"` (bare semver, no `v` prefix), `viz/package-lock.json` resynced to match
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.16.0`, or recorded `skipped @ v5.16.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-427 — flowtron v5.16.0 (...)` commit lands
- [x] Annotated `v5.16.0` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-427.md`

## 🧩 Subtasks

- [x] 5 version edits (+ package-lock resync)
- [x] Dogfood gate walk (Claude / Grok / Codex refresh-or-skip)
- [x] SOP-currency check (flag-don't-bump)
- [x] viz lint/typecheck/test + updater test suite
- [x] Doc-drift sweep + standing checks (wiring count · skill parity · installed surface · self-wiring · README counter · mirror pairs A–E)
- [x] Tag message drafted and approved
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-405]] — prior release v5.15.0 (precedent)
- [[CORE-420]] — mirror-pair epic (release-gate checklist this cut first exercises in full)
- [[CORE-424]] — fleet-updater fail-closed epic
- [[CORE-425]] — viz near-miss diagnostics epic
- [[CORE-412]] — archive-folder naming rule (the one adopter-recommended action in this cut)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:3` and `git describe --tags` both read `v5.15.0` (no drift). 72 commits since the tag — 30 `feat:`, 20 `fix:`, 18 `chore:`, 3 `docs:`, 1 `test:` — with zero `feat!:` and zero `BREAKING CHANGE:` bodies. Highest rank is minor → `v5.16.0`, matching the PLAN-line target and the user-confirmed bump.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:434` example pin, `SECURITY.md:109` release-tag pin, `viz/src/ui/constants.ts:41`, `viz/package.json:4`, `viz/package-lock.json:3,9`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — [[CORE-405]] (v5.15.0) is the direct prior precedent: same five-pin, dogfood-gate, SOP-currency, doc-sweep, tag, archive shape, reused here. **Structural drift since that cut:** the release skill gained six standing checks that did not exist at CORE-405 — self-wiring parity ([[CORE-410.2]]/[[CORE-413]]), README task-counter currency ([[CORE-411]]), and mirror-pairs A–E ([[CORE-420.5]], [[CORE-422]], [[CORE-420.N]]). This is the first cut to exercise the full set, so the §7.1 sweep is materially longer than CORE-405's.

- [x] **Drift check** — all five pins resolved at `v5.15.0` pre-edit; last tag matched `SPEC.md:3`. No drift in the cited locations.

- [x] **Adopter migration impact** — classified all 72 commits; see Discovery Notes. **Verdict: no required project-side edits**, one recommended alignment ([[CORE-412]]).

- [x] No clarifications needed beyond the mandatory dogfood-gate resolution (asked via AskUserQuestion in Phase 2). Bump is minor, not major; adopter impact is unambiguous — no skill retired, no skill added, snippet `ln -s` count unchanged at 22.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** 72 commits since v5.15.0 — the largest cut to date, spanning nine closed epics plus standalones. Six themes:

1. **Release-gate hardening** (the headline). [[CORE-409]] closed the SOP-drift detector gap; [[CORE-EPIC-410]] added shipped-skill parity, wired the stranded `/ft-spec`, and pruned stale globals; [[CORE-411]] made the README task counter a standing check; [[CORE-413]] caught copied-directory wiring that symlink checks miss; [[CORE-EPIC-420]] added the mirror-pair checklist (roster ↔ directory, Claude flags ↔ Codex wrappers, template back-link depth, README counter, `ft-flowtron` roster ↔ shipped skills) and [[CORE-422]] generalized the roster pair's grep so it catches the compressed `ft-flowtron` variant.
2. **Fleet-updater safety.** [[CORE-407]] added the prune check; [[CORE-EPIC-419]] added a pinned-ahead guard, `applyBump` rollback, and root-arg validation; [[CORE-EPIC-424]] made the updater exit non-zero with stderr on failure, made the migration gate **fail-closed** (an unclassifiable tag is now treated as migration-bearing rather than assumed safe), and added a mid-fleet apply-failure fixture; [[TEST-003]] decoupled the updater fixtures from live tags.
3. **viz correctness.** Parser fence-awareness ([[CORE-423]], [[CORE-421.2]]), duplicate-epic guard ([[CORE-421.3]]), devApi response hardening + error hygiene ([[CORE-421.4]], [[CORE-425.4]]), modal-gated keyboard nav ([[CORE-421.5]]), Escape precedence vs stale `expandedId` ([[CORE-425.2]]), near-miss heading diagnostic ([[CORE-425.3]]), plus the FE cohort: model-chip category tokens ([[FE-078]]), selector-menu ARIA ([[FE-079]]), wikilink flake fix ([[FE-082]]), row-props context ([[FE-083]]), task-line regex composition ([[FE-084]]).
4. **SPEC contract.** [[CORE-EPIC-415]] defined the emoji-surface contract, emitter propagation, and viz glyph tolerance; [[CORE-EPIC-416]] added the tick-through contract and viz closure-drift surface; [[CORE-417]] added superseded-claim pointers; [[CORE-418]] the audit-shortname flip; [[CORE-414]] the lowercase-path rationale; [[CORE-426]] the SPEC↔templates cross-ref. `SPEC/gates.md` gained the glyph-layer/reuse rules and the standalone-🟢 binding.
5. **Worktrees.** [[CORE-EPIC-408]] formalized the isolation contract, added the optional `## 🔄 Handoff` tasknote section for portable handoff, and synced wiring/docs. Ships the new `templates/subagent-probe-template.md` (added by [[CORE-408.2]]).
6. **Archive naming.** [[CORE-412]] replaced the partial archive-folder table with a mechanical rule — `<AREA>-*` → `archive/<area lowercased, trailing dash dropped>/`.

**Adopter impact: no required project-side edits.** Verified rather than assumed:

- **No skill retired and none added** — `git ls-tree v5.15.0 claude/skills/` vs `ls claude/skills` differ only in sort order; same for `codex/skills/`. So no dangling symlinks and no new wiring. `grep -c '^ln -s' claude/AGENTS-snippet.md` is **22 at both v5.15.0 and HEAD**, and both `AGENTS-snippet.md` files are byte-unchanged since the tag.
- **Contract and skill-body changes are consumed by reference** from the submodule (`SPEC.md` +159, `SPEC/gates.md` +105, the ten touched skills) — a bump picks them up with no project-side edit.
- **`templates/subagent-probe-template.md` is new** but read by reference from the submodule, not copied at adoption.

**One recommended (not required) alignment — [[CORE-412]].** The archive-folder rule changed the canonical mapping for five prefixes: `BE-*`/`FE-*`/`DB-*`/`DEPLOY-*`/`TEST-*` now archive to `archive/be|fe|db|deploy|test/` rather than `archive/backend|frontend|database|deployment|testing/`. Two consequences for an existing adopter, both benign: their `.flowtron/tasknote/README.md` is a *seed copy* taken at adoption, so it still carries the old table and won't update on bump; and any archive folder they already created under an old name keeps that name. Nothing breaks — `viz/src/archiveCache.ts` discovers area folders dynamically with no lookup table (confirmed in CORE-412's own verification), and `archive/core/` is identical under both conventions, which is the only folder most adopters have. So this is a tidy-up an adopter can do at leisure, and the Migration block names it as recommended **after** the `No required project-side edits` sentinel rather than in place of it.

**Sentinel note:** because the verdict is "no required edits", the tag's Migration block must open with the exact `No required project-side edits` sentinel — `tools/update-adopters.mjs:migrationBearingTags` does a `startsWith` on it, and as of [[CORE-424.3]] the gate is fail-closed, so a reworded opener would now flag the entire fleet as migration-bearing.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — five-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**Five version edits (landed):**
1. `SPEC.md:3` → `v5.16.0`
2. `docs/MIGRATION.md:434` example pin → `v5.16.0`
3. `SECURITY.md:109` release-tag pin → `v5.16.0`
4. `viz/src/ui/constants.ts` `VIZ_VERSION` → `v5.16.0`
5. `viz/package.json` + `viz/package-lock.json` bare `"5.16.0"`

**Dogfood gate (resolved):**
- Claude — refreshed → `v5.16.0 · 2026-08-09 (dogfooded)` (matrix + `claude/CAPABILITIES.md`)
- Grok — refreshed → `v5.16.0 · 2026-08-09 (dogfooded)` (matrix + `docs/PLATFORMS.md` footer) — this cut dogfooded under Grok after Claude session limit
- Codex — skipped @ `v5.16.0` (prefix stays `v5.15.0 · 2026-08-02`; matrix + `docs/PLATFORMS.md` footer)

**SOP currency: clean.** Only `SPEC/procedures/ft-task.md` has a tier-2 advisory note (1 `SPEC.md` commit since stamp) — no tier-1 drift candidates; stamp left un-bumped.

**Residual `v5.15.0` grep (expected only):** SOP `last-verified` stamp; Codex skipped-row prefix; write-once retirement table in MIGRATION; historical prose in GLOSSARY / AGENT-COMPAT / ft-release skill.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions**

- [x] (frontend) Visual confirmation — N/A (version string only; no UI chrome change)

**Testing Notes:**

- `npm --prefix viz run lint` — clean
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz test` — 19 files / 300 tests passed
- `node --test tools/update-adopters.test.mjs` — 32/32 passed
- `node --check` on updater + test file — clean
- Markdown edits are single-token version substitutions; frontmatter and fences untouched

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**

- [x] Closed

- [x] **Evidence-based recap** drafted

**Doc-drift sweep report (resumed 2026-08-09 after Claude session limit):**

### `/ft-audit docs` (subroutine mode — no PLAN writes)

**Pass 1 Claims vs. code** — clean. Version pins match live files; dogfood stamps match matrix/footers; shipped skill inventories match snippets; installer counts still 22.

**Pass 2 Cross-doc consistency** — clean. The five release pins agree at `v5.16.0`. Dogfood triad (Claude/Grok refreshed, Codex skipped) is consistent across `AGENT-COMPAT.md` + `CAPABILITIES.md` + `PLATFORMS.md`.

**Pass 3 Cross-references** — clean. Illustrative `e.g.` / fenced paths only; no live broken links in the AI-referenced set. Adopter-side `.flowtron/core/…` paths correctly unresolved in flowtron-self (by design).

**Pass 4 Currency** — clean after README counter correction. Standing check: archive count **645** (`find .flowtron/tasknote/archive -name "*.md" | wc -l`); date range 2026-04-28 → 2026-08-09. Prior interrupted session had written **646** — corrected to **645** on resume (off-by-one). Two archive files lack filled `**Archived:**` dates (CORE-255, CORE-410.3) — archive-hygiene, not release drift; leave for a follow-up if material.

**Pass 5 Stale content** — clean. Residual `v5.15.0` hits are historical or deliberate skips (see Implementation Notes). `docs/WORKTREES.md` still accurately documents the five locked conventions; CORE-EPIC-408 additions live in skills/templates/SPEC and do not invalidate the convention doc.

**Findings:** zero Critical / High / Medium / Low.

### Standing checks (§7.1)

| Check | Result |
|---|---|
| Claude symlink-wiring count (`ln -s` = 22) | clean |
| Shipped-skill parity (claude ↔ codex inventories) | clean |
| Installed-surface policy (adopter subset exact; forbidden empty) | clean |
| Local self-wiring (`.claude/` ↔ shipped; no dangling; no non-symlink) | clean |
| Global wiring (advisory) | clean — 23 links, single path casing `/Users/fakeneuron/Code/flowtron`, no dangling |
| README task-counter | fixed 646→645; matches archive |
| Mirror pair A (templates roster) | clean |
| Mirror pair B (Claude flags ↔ Codex descriptions) | clean |
| Mirror pair C (template `../PLAN.md` depth) | clean |
| Mirror pair D (= README counter) | clean |
| Mirror pair E (`ft-flowtron` roster ↔ shipped + flags) | clean |

**Final Summary:** Cut flowtron v5.16.0 — 72 commits since v5.15.0. Headline: full release-gate standing-check suite (mirror pairs A–E, skill parity, installed-surface policy, self-wiring, README task-counter, SOP currency) first exercised end-to-end; fleet-updater fail-closed migration gate + rollback/exit hygiene; viz fence-awareness and interaction correctness cohort; SPEC emoji/tick-through/worktree contract work. Dogfood: Claude + Grok refreshed, Codex skipped @ v5.16.0. Adopter impact: no required project-side edits; recommended CORE-412 archive-folder alignment only. Migration block opens with the fail-closed sentinel.

**Archived:** 2026-08-09
