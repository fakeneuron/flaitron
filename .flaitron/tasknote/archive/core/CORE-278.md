---
title: release v5.2.0
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271, CORE-272, CORE-269, CORE-268]
---

# CORE-278 | release v5.2.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]] · 🔗 [[CORE-272]]

## 🎯 Goal

Cut the v5.2.0 minor release tagging the `CORE-EPIC-271` cross-agent-skill-projection cohort (agent-neutral `ft-task` SOP + `SPEC/procedures/` layer + per-agent pointer wrappers) and the `CORE-272` `/ft-update` adopter submodule-bump skill since v5.1.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.1.0` → `v5.2.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.1.0` → `v5.2.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.1.0` → `v5.2.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.1.0` → `v5.2.0`
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.2.0`, or recorded `skipped @ v5.2.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-278 — flowtron v5.2.0 (...)` commit lands
- [ ] Annotated `v5.2.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-278.md`

## 🧩 Subtasks

- [ ] Bump the 4 version pins (SPEC.md:3 · docs/MIGRATION.md example pin · SECURITY.md release-tag example pin · viz/src/ui/constants.ts VIZ_VERSION)
- [ ] Walk the dogfood gate — resolve Claude / Grok / Codex rows (refresh-from-verification or record `skipped @ v5.2.0`)
- [ ] Verify with single grep across the live doc set (residue expected only for skipped stamps + archived tasknotes)
- [ ] Phase 3: markdown mental-pass on prose edits + viz lint/typecheck
- [ ] Phase 4: doc-drift sweep (`/ft-audit-docs` subroutine) · draft annotated tag message · flip PLAN line + archive tasknote · 📦 gate
- [ ] Commit + tag + push (atomic on 🟢 commit-go)

## 🔗 Related

- [[CORE-EPIC-271]] — the cross-agent-skill-projection cohort this release tags
- [[CORE-272]] — `/ft-update` adopter submodule-bump skill (new adopter-facing skill)
- [[CORE-269]] — dogfood-prompt-template (full cue-set enumeration)
- [[CORE-268]] — prior release v5.1.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical minor-bump cut. Last tag `v5.1.0` matches `SPEC.md:3` (no aborted-release drift). Commits since the tag: `feat:` ×8 (CORE-269 dogfood-prompt-template; CORE-270 epic-filed; CORE-271.1–.6 cross-agent-skill-projection; CORE-272 /ft-update) + `fix:` ×2 + `docs:` ×4 → highest rank `feat:`, no `feat!:`/BREAKING → minor → v5.2.0, matching the PLAN target.

- [x] Read relevant source files — the 4 version-pin locations + the dogfood-gate stamp surface + the new CORE-271 `SPEC/procedures/` stamp surface (below)

- [x] **Archive skim** — prior release CORE-268 (v5.1.0) follows the canonical recipe and is the live template for the dogfood-gate walk; the CORE-EPIC-271 child archives confirm the new `SPEC/procedures/` stamp surface this cut must reason about for the first time

- [x] **Drift check** — see Discovery Notes; one notable finding (new `SPEC/procedures/` currency stamps, not release pins)

- [x] Asked clarifying questions — adopter impact resolved (see below); dogfood-gate per-agent walk + the `SPEC/procedures/` stamp decision deferred to Phase 2 (Step 5 AskUserQuestion)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Version-pin locations (drift check @ HEAD)

The 4 standard pins to bump `v5.1.0 → v5.2.0`:

- `SPEC.md:3` — `**Version:** v5.1.0` ✅
- `docs/MIGRATION.md:324` — `(e.g., \`v5.1.0\`)` illustrating `git describe --tags` output. **Example pin → bump.** (The only live `v5.1.0` in MIGRATION.md; no historical-rename pins at this version.)
- `SECURITY.md:109` — `Pin to annotated release tags (e.g. \`v5.1.0\`)`. ✅
- `viz/src/ui/constants.ts:39` — `VIZ_VERSION = 'v5.1.0'`. ✅

### Dogfood-gate stamp surface (the Step 5 walk's targets)

Dogfooded rows = Claude / Grok / Codex, all currently at v5.1.0 with **no** skip suffix (the v5.1.0 cut discharged the prior skip-debt via real re-verification):

| Agent | Current stamp | Locations |
|---|---|---|
| Claude | `v5.1.0 · 2026-06-02 (dogfooded)` | `AGENT-COMPAT.md:36` + `CAPABILITIES.md:56` |
| Grok | `v5.1.0 · 2026-06-02 (dogfooded)` | `AGENT-COMPAT.md:37` + `PLATFORMS.md:238` |
| Codex | `v5.1.0 · 2026-06-02 (dogfooded)` | `AGENT-COMPAT.md:38` + `PLATFORMS.md:253` |

The 4 `unverified` rows (Cursor/Gemini/Aider/Amp) are noted-not-gated — skip. Each dogfooded agent's resolution touches all its locations together. Related prose to keep coherent at walk time: `AGENT-COMPAT.md:96` ("dogfooded and re-verified at v5.1.0") goes stale if all three refresh to v5.2.0; `AGENT-COMPAT.md:71` is the write-once skip-suffix format example (`v4.4.0 … skipped @ v5.0.0`) — keep.

### Notable finding — new `SPEC/procedures/` currency stamps (CORE-271), NOT release pins

CORE-271 shipped a new `last-verified` stamp surface the v5.1.0 recipe predates. Two live `v5.1.0` hits:

- `SPEC/procedures/README.md:56` — **inside a fenced ```yaml example block** illustrating the SOP frontmatter schema. A format example, not a live stamp → write-once, leave (parallels `AGENT-COMPAT.md:71`).
- `SPEC/procedures/ft-task.md:4` — the **live `last-verified:` stamp** on the agent-neutral SOP. Per its own schema (`SPEC/procedures/README.md:48`) it is "bumped when the SOP is re-checked against `source:`" (`claude/skills/ft-task/SKILL.md`), explicitly mirroring the PLATFORMS/CAPABILITIES currency convention — i.e. it is a *currency stamp, not a release pin*. No commit since v5.1.0 touched the `ft-task` SKILL.md source, so the SOP is still in sync; bumping the stamp to v5.2.0 without a real re-check would be a false currency claim. **Recommendation: leave both at v5.1.0** (expected grep residue, same class as the dogfood skips + archived tasknotes). Operator can override and re-verify the SOP if desired — folded into the Phase 2 gate question.

### Adopter migration impact

Two additive items, **no required project-side edits**, but worth calling out in the tag's Migration block (context-sensitive, not the rote "none"):

1. **`/ft-update` (CORE-272) — new adopter-facing skill.** Existing adopters bumping to v5.2.0 gain the streamlined consumer-side bump command, but must wire its symlink once to invoke it (or use the manual bump procedure in `claude/AGENTS-snippet.md:61`). Documented at `AGENTS-snippet.md:59` and `MIGRATION.md:34`. Adopter action is *optional* (convenience), not required.
2. **Cross-agent projection layer (CORE-EPIC-271).** `SPEC/procedures/` (agent-neutral `ft-task` SOP + schema) and the `grok/` + `codex/` per-agent pointer wrappers now ship in the submodule. Grok/Codex adopters gain a contract-only `ft-task` path; consumed via pin, no project-side edits. The agent-neutral SPEC contract + templates are unchanged.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing surfaces (the 4 version pins + the `last-verified` stamp cells); no new shape invented

- [x] Implemented the minimal solution — 4 version pins + 6 dogfood-stamp refreshes + 1 stale-prose fix; 2 SPEC/procedures currency stamps left

- [x] Updated/added tests for non-trivial behavior — N/A (version-string + doc edits; viz lint/typecheck runs in Phase 3 for the one-line `constants.ts` change)

**Implementation Notes:**

### Phase 2 batch applied (2026-06-03)

- **4 version pins** v5.1.0→v5.2.0: `SPEC.md:3`, `docs/MIGRATION.md:324` (the example pin only), `SECURITY.md:109`, `viz/src/ui/constants.ts:39`.
- **Dogfood gate — RESOLVED, zero skips.** Operator opted to re-verify all three dogfooded rows at v5.2.0 (not skip), via real sessions:

  | Agent | Resolution | Resulting stamp | Locations |
  |---|---|---|---|
  | Claude | **Refreshed** (this `/ft-release` session: contract read + full cue render + CORE-278 Phase-1 drive) | `v5.2.0 · 2026-06-03 (dogfooded)` | AGENT-COMPAT.md:36 + CAPABILITIES.md:56 |
  | Grok | **Refreshed** (Grok 4.3 TUI ran `docs/DOGFOOD.md` at v5.2.0; PASS) | `v5.2.0 · 2026-06-03 (dogfooded)` | AGENT-COMPAT.md:37 + PLATFORMS.md:238 |
  | Codex | **Refreshed** (Codex GPT-5.5 ran `docs/DOGFOOD.md` at v5.2.0; PASS) | `v5.2.0 · 2026-06-03 (dogfooded)` | AGENT-COMPAT.md:38 + PLATFORMS.md:253 |

  All three current at v5.2.0 — no row carries a skip suffix this cut (second consecutive zero-skip release).
- **1 prose fix** in `AGENT-COMPAT.md:95` (§"Pre-adoption verification"): refreshed to "have now been dogfooded and re-verified at v5.2.0" (was "re-verified at v5.1.0"); also corrected a `dogfooted`→`dogfooded` typo introduced during the Grok-row refresh.
- **SPEC/procedures currency stamps left at v5.1.0** (decision confirmed): `SPEC/procedures/ft-task.md:4` (live SOP stamp) + `SPEC/procedures/README.md:56` (fenced schema example). Per `SPEC/procedures/README.md:48` these bump only on a real re-check of the SOP against `source:` (`claude/skills/ft-task/SKILL.md`); that source is unchanged since v5.1.0, so the SOP is still in sync and bumping would be a false currency claim. Both Grok and Codex independently reached the same "leave" call during their drives.
- **Date note:** the gate resolved on 2026-06-03 (Grok/Codex ran then); Claude's stamp aligned to 2026-06-03 for a coherent single-date matrix rather than splitting on the 06-02 scaffold date.
- **Intentional `v5.1.0` residue** (verified, not drift): the 2 SPEC/procedures currency stamps above + archived tasknotes. The skip-suffix format example at `AGENT-COMPAT.md:71` (`v4.4.0 … skipped @ v5.0.0`) is write-once and carries no live v5.1.0. No live row carries a skip suffix.

### Codex dogfood run — 2026-06-03

Ran `docs/DOGFOOD.md` under Codex CLI for the v5.2.0 gate.

- Step 1 contract comprehension complete at `v5.2.0`; Codex row before update was `v5.1.0 · 2026-06-02 (dogfooded)`.
- Step 2 cue-render check complete; all required glyphs rendered legibly in this surface, with uppercase labels present as fallbacks where defined.
- Step 3 Phase-1 drive used the open `CORE-278` release task. Verdict: Proceed. Archive skim found the prior release recipe in `CORE-268` and the CORE-271 procedure-wrapper precedents; drift check matched the current release-pin and dogfood-stamp surfaces. No clarifications needed; assumption is that this Codex run refreshes only the Codex row, with Claude/Grok resolved separately.
- Phase 1→2 exit-gate decision for the dogfood drive: default-skip, because Discovery surfaced no significant scope deviation.
- `git status --porcelain` was not clean because the release task already had pre-existing dirty work before this dogfood run (`SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md`, `viz/src/ui/constants.ts`, `.flowtron/PLAN.md`, and the active `CORE-278` tasknote). No files were written during the read-only dogfood steps before recording the result.
- Recording edits: refreshed Codex stamp in `docs/AGENT-COMPAT.md` and `docs/PLATFORMS.md` to `v5.2.0 · 2026-06-03 (dogfooded)`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no logic change; version-string + doc edits)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` + `typecheck` both clean (the one-line `VIZ_VERSION` change)

- [x] (frontend) Asked the user for visual confirmation — N/A (version-string constant only; no UI/behavior change beyond the header version label)

**Testing Notes:**

viz lint + typecheck both pass on the `constants.ts` `VIZ_VERSION` bump. The markdown edits (SPEC/MIGRATION/SECURITY pins + AGENT-COMPAT/PLATFORMS/CAPABILITIES stamps + 1 AGENT-COMPAT prose fix) are single-token / single-clause substitutions, mental-passed: no frontmatter touched, no fenced blocks or table pipes broken, cross-refs intact.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (defers version to SPEC.md; `legacy-pre-v0.1.0` tag ref is historical)
  - `SPEC.md` — **updated** (version pin :3 → v5.2.0; retired-field refs v0.2.0/v0.8.0 historical, kept)
  - `docs/MIGRATION.md` — **updated** (example pin :324 → v5.2.0; v5.0.0 dotfolder-rename history :353/359/362 intentionally kept; "22 slash commands" :62 current)
  - `claude/AGENTS-snippet.md` — no change (no version pin; `/ft-update` documented :59)
  - `docs/CONVENTIONS.md` — no change (external SemVer/Conv-Commits URLs + v3.0.0 historical example)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — **updated** (release-tag example pin :109 → v5.2.0)
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — **updated** (Grok :238 + Codex :253 stamps → v5.2.0; 22 command/skill counts :175/:180 current)
  - `claude/CAPABILITIES.md` — **updated** (Claude stamp :56 → v5.2.0)
  - `docs/AGENT-COMPAT.md` — **updated** (3 stamps :36/:37/:38 → v5.2.0 + 1 prose fix :95; skip-format example :71/:73 kept)
  - Cross-doc check: no stale `v5.1.0` anywhere but the 2 intentional `SPEC/procedures/` currency stamps; skill/command counts consistent at 22.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-03.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-278.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v5.2.0, tagging the `CORE-EPIC-271` cross-agent-skill-projection cohort (agent-neutral `ft-task` SOP + `SPEC/procedures/` schema layer + Grok/Codex pointer wrappers) and the `CORE-272` `/ft-update` adopter submodule-bump skill. Bumped the 4 version pins (SPEC / MIGRATION / SECURITY / viz `constants.ts`) and resolved the dogfood gate for the second consecutive zero-skip cut: all three dogfooded rows (Claude / Grok / Codex) re-verified at v5.2.0 via real sessions — Claude inline during this `/ft-release`, Grok (4.3 TUI) and Codex (GPT-5.5) by pasting `docs/DOGFOOD.md`. Refreshed 6 `last-verified` stamps across AGENT-COMPAT / PLATFORMS / CAPABILITIES (uniform `v5.2.0 · 2026-06-03`), fixed 1 prose line the refresh made stale, and corrected a `dogfooted` typo introduced during the Grok-row edit. Correctly left the 2 new `SPEC/procedures/` currency stamps at v5.1.0 (SOP-vs-source sync, not a release pin; source unchanged) — a call all three agents reached independently. No adopter migration required: `/ft-update` and the cross-agent projection layer are additive and consumed via submodule pin; the agent-neutral SPEC contract and templates are unchanged.

**Archived:** 2026-06-03
