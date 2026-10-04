---
title: release v5.1.0
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-267, CORE-267.2, CORE-267.3, CORE-267.4, CORE-265]
---

# CORE-268 | release v5.1.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-267]] · 🔗 [[CORE-265]]

## 🎯 Goal

Cut the v5.1.0 minor release tagging the `CORE-EPIC-267` dogfood-gate cohort (release-time dogfood-or-explicit-skip gate over the `last-verified` stamp surface) since v5.0.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.0.0` → `v5.1.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.0.0` → `v5.1.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.0.0` → `v5.1.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.0.0` → `v5.1.0`
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.1.0`, or recorded `skipped @ v5.1.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-268 — flowtron v5.1.0 (...)` commit lands
- [ ] Annotated `v5.1.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-268.md`

## 🧩 Subtasks

- [ ] Bump the 4 version pins (SPEC.md:3 · docs/MIGRATION.md example pin · SECURITY.md release-tag example pin · viz/src/ui/constants.ts VIZ_VERSION)
- [ ] Walk the dogfood gate — resolve Claude / Grok / Codex rows (refresh-from-verification or record `skipped @ v5.1.0`)
- [ ] Verify with single grep across the live doc set (residue expected only for skipped stamps + archived tasknotes)
- [ ] Phase 3: markdown mental-pass on prose edits + viz lint/typecheck
- [ ] Phase 4: doc-drift sweep (`/ft-audit-docs` subroutine) · draft annotated tag message · flip PLAN line + archive tasknote · 📦 gate
- [ ] Commit + tag + push (atomic on 🟢 commit-go)

## 🔗 Related

- [[CORE-EPIC-267]] — the dogfood-gate cohort this release tags
- [[CORE-267.2]] — convention (AGENT-COMPAT §"Reading the cells")
- [[CORE-267.3]] — ft-release-gate-wiring (the gate this very cut exercises for the first time)
- [[CORE-267.4]] — v5-skip-debt-discharge (live Grok/Codex stamps)
- [[CORE-265]] — prior release v5.0.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical minor-bump cut. Last tag `v5.0.0` matches `SPEC.md:3` (no aborted-release drift). 4× `feat:` + 1× `chore:` since the tag → minor → v5.1.0, matching the PLAN target. First cut to exercise the CORE-267.3 dogfood-gate wiring.

- [x] Read relevant source files — the 4 version-pin locations + the dogfood-gate stamp surface (below)

- [x] **Archive skim** — prior release tasknotes (CORE-265 v5.0.0, CORE-260 v4.5.0) follow the canonical recipe; the CORE-EPIC-267 cohort archives (`.2`/`.3`/`.4`) confirm the dogfood-gate surface this cut first exercises

- [x] **Drift check** — see Discovery Notes; one notable finding (MIGRATION.md historical-vs-example pins)

- [x] Asked clarifying questions — adopter impact resolved (none required); dogfood-gate per-agent walk deferred to Phase 2 (Step 5 AskUserQuestion)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Version-pin locations (drift check @ HEAD)

The 4 standard pins to bump `v5.0.0 → v5.1.0`:

- `SPEC.md:3` — `**Version:** v5.0.0` ✅
- `docs/MIGRATION.md:323` — `(e.g., \`v5.0.0\`)` illustrating `git describe --tags` output. **Example pin → bump.**
- `SECURITY.md:109` — `Pin to annotated release tags (e.g. \`v5.0.0\`)`. ✅
- `viz/src/ui/constants.ts:39` — `VIZ_VERSION = 'v5.0.0'`. ✅

**Notable drift finding — MIGRATION.md historical pins must NOT bump.** `docs/MIGRATION.md:352/358/361` reference `v5.0.0` as the version that introduced the `_project/` → `.flowtron/` dotfolder rename ("flowtron **v5.0.0** renames the convention directory…", the one-time rename steps, `git checkout v5.0.0`). These are **write-once historical migration content tied to the v5.0.0 release specifically** (per the CORE-046 precedent that historical version refs like `v1.0 additions` stay). Leave them. The post-edit grep will surface them as expected residue, alongside the dogfood-gate skipped stamps and archived tasknotes.

### Dogfood-gate stamp surface (the Step 5 walk's targets)

Dogfooded rows = Claude / Grok / Codex, stamps across 3 files:

| Agent | Current stamp | Locations |
|---|---|---|
| Claude | `v5.0.0 · 2026-06-01 (dogfooded)` | `AGENT-COMPAT.md:36` + `CAPABILITIES.md:56` |
| Grok | `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)` | `AGENT-COMPAT.md:37` + `PLATFORMS.md:236` |
| Codex | `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)` | `AGENT-COMPAT.md:38` + `PLATFORMS.md:247` |

The 4 `unverified` rows (Cursor/Gemini/Aider/Amp) are noted-not-gated — skip them. Each dogfooded agent's resolution must touch all its locations together (matrix + footer/CAPABILITIES). Note: `AGENT-COMPAT.md:71` carries a format-example using the live Grok stamp value — if Grok/Codex skip-suffixes bump to v5.1.0, decide whether to keep that example matching live (coherence) at walk time.

### Adopter migration impact

**None required.** The CORE-EPIC-267 cohort is entirely flowtron-self release tooling (`claude/skills/ft-release` — flowtron-self only, never shipped to adopters) plus flowtron's own agent-compat docs (`AGENT-COMPAT.md`/`PLATFORMS.md`/`CAPABILITIES.md`, consumed by flowtron-self). Adopters pin the submodule and consume the contract; nothing in this cut changes the agent-neutral SPEC contract or templates. Migration block → "no required project-side edits."

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing surfaces (the 4 version pins + the `last-verified` stamp cells); no new shape invented

- [x] Implemented the minimal solution — 4 version pins + 6 stamp refreshes + 2 stale-prose fixes

- [x] Updated/added tests for non-trivial behavior — N/A (version-string + doc edits; viz lint/typecheck runs in Phase 3 for the one-line `constants.ts` change)

**Implementation Notes:**

### Dogfood-gate walk (Step 5) — IN PROGRESS, gate open

First cut to exercise the CORE-267.3 wiring. Per-agent resolution (operator, 2026-06-02):

| Agent | Resolution | Resulting stamp | Locations |
|---|---|---|---|
| Claude | **Refreshed** | `v5.1.0 · 2026-06-02 (dogfooded)` | AGENT-COMPAT.md:36 + CAPABILITIES.md:56 |
| Grok | **Refreshed** (dogfood passed 2026-06-02) | `v5.1.0 · 2026-06-02 (dogfooded)` | AGENT-COMPAT.md:37 + PLATFORMS.md:236 |
| Codex | **Refreshed** (dogfood passed 2026-06-02) | `v5.1.0 · 2026-06-02 (dogfooded)` | AGENT-COMPAT.md:38 + PLATFORMS.md:247 |

Operator opted to actually re-verify Grok + Codex at v5.1.0 (not skip). **Gate RESOLVED 2026-06-02 — all three dogfooded rows refreshed; zero skips this cut.** The v5.0.0 skip-debt (Grok/Codex) is discharged by real re-verification rather than another recorded skip — the first release where every dogfooded row is current. Phase 2 batch applied (below).

**Codex dogfood result (2026-06-02):** PASS. Drove the 4-phase summary + Phase 1 Discovery correctly (Proceed verdict; correctly logged the missing target as an assumption-to-clarify; Phase 1→2 gate decision invoked `/ft-task`'s default-skip flavor by name). All requested cues render, labels survive, no tofu/strip/mojibake. **Finding for CORE-269:** the dogfood prompt requested only a cue *subset* — Codex flagged that canonical `SPEC/gates.md` entries (🗄️ DB, 👁️ CONFIRM, 🔍 AUDIT, ✅, 🔧 LIGHT, 🧠 HEAVY) were omitted. The dogfood-prompt-template should enumerate the *full* cue set.

**Grok dogfood result (2026-06-02):** PASS — most rigorous of the three. Full contract read (AGENTS + SPEC + SPEC/gates + templates + AGENT-COMPAT + tasknote/README); emitted the **complete** cue vocabulary (covering the CORE-269 gap Codex flagged); real archive skim that surfaced the CORE-259/256 parser-audit findings; genuine drift-check against `viz/src/parser.ts`; explicit assumptions logged; correct default-skip Phase 1→2 decision with the ✅ marker; `git status --porcelain` confirmed zero writes. All cues render, labels durable, no tofu/strip/mojibake.

### Phase 2 batch applied (2026-06-02)

- **4 version pins** v5.0.0→v5.1.0: `SPEC.md:3`, `docs/MIGRATION.md:323` (the example pin only), `SECURITY.md:109`, `viz/src/ui/constants.ts:39`.
- **6 dogfood stamps** refreshed → `v5.1.0 · 2026-06-02 (dogfooded)`: Claude (AGENT-COMPAT:36 + CAPABILITIES:56), Grok (AGENT-COMPAT:37 + PLATFORMS:236), Codex (AGENT-COMPAT:38 + PLATFORMS:247). Grok/Codex `; skipped @ v5.0.0` suffixes dropped.
- **2 stale-prose fixes** in AGENT-COMPAT.md made stale by the refresh: §"Pre-adoption verification" ("dogfooded once" → "dogfooded and re-verified at v5.1.0"); §"Cross-agent cue fallback policy" ("natural next step for the Grok and Codex rows" → redirected to the still-unverified rows).
- **Intentional `v5.0.0` residue** (verified, not drift): `MIGRATION.md:352/358/361` (v5.0.0 dotfolder-rename history, write-once per CORE-046 precedent) + `AGENT-COMPAT.md:71` (skip-suffix format example). No live row carries a skip suffix.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no logic change; version-string + doc edits)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` + `typecheck` both clean (the one-line `VIZ_VERSION` change)

- [x] (frontend) Asked the user for visual confirmation — N/A (version-string constant only; no UI/behavior change beyond the header version label)

**Testing Notes:**

viz lint + typecheck both pass on the `constants.ts` `VIZ_VERSION` bump. The five markdown edits (SPEC/MIGRATION/SECURITY pins + AGENT-COMPAT/PLATFORMS/CAPABILITIES stamps + 2 AGENT-COMPAT prose fixes) are single-token / single-clause substitutions, mental-passed: no frontmatter touched, no fenced blocks or table pipes broken, cross-refs intact.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (defers version to SPEC.md; no hardcoded pin)
  - `SPEC.md` — **updated** (version pin → v5.1.0)
  - `docs/MIGRATION.md` — **updated** (example pin :323 → v5.1.0; the v5.0.0 dotfolder-rename history :352/358/361 intentionally kept)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — **updated** (release-tag example pin :109 → v5.1.0)
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — **updated** (Grok :236 + Codex :247 stamps refreshed to v5.1.0; CORE-257/258 first-use prose kept as historical)
  - `claude/CAPABILITIES.md` — **updated** (Claude stamp :56 refreshed to v5.1.0)
  - `docs/AGENT-COMPAT.md` — **updated** (3 stamps refreshed + 2 stale-prose fixes; skip-format example :71/:73 kept)
  - Cross-doc check: no stale `v4.4.0`/`dogfooded once`/skip references remain anywhere but the intentional format examples.

- [ ] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [ ] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Cut flowtron v5.1.0, tagging the `CORE-EPIC-267` dogfood-or-explicit-skip release gate. Bumped the 4 version pins (SPEC / MIGRATION / SECURITY / viz `constants.ts`) and resolved the dogfood gate for the first time it's existed: all three dogfooded rows (Claude / Grok / Codex) were re-verified at v5.1.0 via real sessions — **zero skips** — discharging the v5.0.0 Grok/Codex skip-debt by actual re-dogfooding rather than another recorded skip. Refreshed 6 `last-verified` stamps across AGENT-COMPAT / PLATFORMS / CAPABILITIES and corrected 2 prose bits the refresh made stale. The v5.0.0 dotfolder-rename history (MIGRATION.md) and the skip-suffix format example (AGENT-COMPAT) were correctly preserved as write-once content. No adopter migration required — `ft-release` and the stamp surface are flowtron-self release machinery; the agent-neutral contract is unchanged. Codex's dogfood surfaced CORE-269 (the dogfood prompt should enumerate the *full* cue set); filed, not absorbed.

**Archived:** 2026-06-02
