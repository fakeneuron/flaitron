---
title: release v5.4.0
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-301, CORE-300]
---

# CORE-302 | release v5.4.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-301]] · 🔗 [[CORE-300]]

## 🎯 Goal

Cut the v5.4.0 minor release tagging CORE-EPIC-301 (downstream-impact reconciliation — the plan-cohesion blast-radius scan wired into inline filers, `/ft-epic-discovery`, `/ft-task`'s decision path, and propagated to the adopter snippet), plus the AGENTS.md dedup + AGENTS-snippet `ft-update` wiring fix, since v5.3.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.3.0` → `v5.4.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.3.0` → `v5.4.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.3.0` → `v5.4.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.3.0` → `v5.4.0`
- [ ] `viz/package.json` `"version"` bumped `"5.3.0"` → `"5.4.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.4.0`, or recorded `skipped @ v5.4.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-302 — flowtron v5.4.0 (...)` commit lands
- [ ] Annotated `v5.4.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-302.md`

## 🧩 Subtasks

- [ ] Bump the 5 version pins (SPEC.md:3 · docs/MIGRATION.md example pin · SECURITY.md release-tag example pin · viz/src/ui/constants.ts VIZ_VERSION · viz/package.json version)
- [ ] Walk the dogfood gate — resolve Claude / Grok / Codex rows (refresh-from-verification or record `skipped @ v5.4.0`)
- [ ] Verify with single grep across the live doc set (residue expected only for skipped stamps + illustrative `(e.g. v5.x)` examples + archived tasknotes)
- [ ] Phase 3: markdown mental-pass on prose edits + viz lint/typecheck/test
- [ ] Phase 4: doc-drift sweep (`/ft-audit-docs` subroutine) · draft annotated tag message · flip PLAN line + archive tasknote · 📦 gate
- [ ] Commit + tag + push (atomic on 🟢 commit-go)

## 🔗 Related

- [[CORE-301]] — downstream-impact reconciliation epic (the headline feature of this cut)
- [[CORE-300]] — prior release v5.3.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical minor-bump cut. Last tag `v5.3.0` matches `SPEC.md:3` (no aborted-release drift). Commits since the tag: `feat:` ×5 (CORE-301.1..301.5 — the reconciliation epic) + `chore:` (CORE-301.6 audit) + `docs:` ×2 (AGENTS.md dedup, AGENTS-snippet ft-update wiring) → highest rank `feat:`, no `feat!:`/BREAKING → minor → v5.4.0, matching the PLAN target.

- [x] Read relevant source files — the 5 version-pin locations + the dogfood-gate stamp surface (below)

- [x] **Archive skim** — prior release CORE-300 (v5.3.0) is the live template; it followed the canonical recipe with a one-skip dogfood gate (Codex skipped) and correctly left write-once illustrative `(e.g. v5.x)` example version refs. This cut applies the same treatment.

- [x] **Drift check** — all 5 pins confirmed at `v5.3.0` @ HEAD (grep verified); dogfood-stamp surface enumerated (see Discovery Notes)

- [x] Asked clarifying questions — adopter impact resolved (see below); dogfood-gate per-agent walk deferred to Phase 2 (Step 5 AskUserQuestion)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Version-pin locations (drift check @ HEAD)

The 5 standard pins to bump `v5.3.0 → v5.4.0`:

- `SPEC.md:3` — `**Version:** v5.3.0` ✅
- `docs/MIGRATION.md:371` — `(e.g., \`v5.3.0\`)` illustrating `git describe` output. **Example pin → bump.**
- `SECURITY.md:109` — `Pin to annotated release tags (e.g. \`v5.3.0\`)`. ✅
- `viz/src/ui/constants.ts:41` — `VIZ_VERSION = 'v5.3.0'`. ✅
- `viz/package.json:4` — `"version": "5.3.0"` (bare semver). ✅

### Dogfood-gate stamp surface (the Step 5 walk's targets)

| Agent | Current stamp | Locations |
|---|---|---|
| Claude | `v5.3.0 · 2026-06-06 (dogfooded)` | `AGENT-COMPAT.md:36` + `CAPABILITIES.md` §"Last verified" |
| Grok | `v5.3.0 · 2026-06-06 (dogfooded)` | `AGENT-COMPAT.md:37` + `PLATFORMS.md` Grok footer |
| Codex | `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.3.0)` | `AGENT-COMPAT.md:38` + `PLATFORMS.md` Codex footer |

The 4 `unverified` rows are noted-not-gated — skip.

### Adopter migration impact

Additive cohort, **no required project-side edits**, but worth a context-sensitive Migration block:

1. **Downstream-impact reconciliation (CORE-EPIC-301) — new adopter-facing workflow behavior.** Filing a new task and mid-flow direction-changing decisions now run a reconciliation scan that checks the new task/decision against existing active PLAN entries for stale / contradictory / redundant overlap and proposes one reconcile action per impacted entry behind a user-confirm gate (the plan is never auto-rewritten). Contract: `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation"; the adopter snippet (`claude/AGENTS-snippet.md`) gained a bullet describing it. Consumed via submodule pin — pre-bump adopters get the behavior on update; adopters maintaining a pasted snippet copy may want to refresh that paragraph. No required edits.
2. **AGENTS.md dedup + AGENTS-snippet `ft-update` wiring fix.** Flowtron-self doc hygiene + a snippet correction (ft-update added to the symlink wiring block); no adopter action.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing surfaces (the 5 version pins + the `last-verified` stamp cells); no new shape

- [x] Implemented the minimal solution — 5 version pins + dogfood-gate resolution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string + doc edits; viz lint/typecheck/test ran in Phase 3)

**Implementation Notes:**

### Phase 2 batch applied (2026-06-08)

- **5 version pins** v5.3.0→v5.4.0: `SPEC.md:3`, `docs/MIGRATION.md:371` (the `git describe` example pin only), `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4` (bare semver `"5.4.0"`).
- **Dogfood gate — RESOLVED, two skips (Grok + Codex):**

  | Agent | Resolution | Resulting stamp | Locations |
  |---|---|---|---|
  | Claude | **Refreshed** (this `/ft-release` session: contract read + CORE-302 Phase-1 drive + cue render) | `v5.4.0 · 2026-06-08 (dogfooded)` | AGENT-COMPAT.md:36 + CAPABILITIES.md:56 |
  | Grok | **Skipped @ v5.4.0** (operator deferred this round) | `v5.3.0 · 2026-06-06 (dogfooded; skipped @ v5.4.0)` | AGENT-COMPAT.md:37 + PLATFORMS.md:238 |
  | Codex | **Skipped @ v5.4.0** (operator deferred this round) | `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.4.0)` | AGENT-COMPAT.md:38 + PLATFORMS.md:253 |

- **No prose fix needed** at `AGENT-COMPAT.md:96` — it states Grok "re-verified at v5.3.0, and Codex CLI at v5.2.0", which remains accurate (both skipped this round, so their last *real* verifications still hold).
- **Intentional `v5.3.0`/`v5.2.0` residue** (verified, not drift): the Grok + Codex skip stamps (AGENT-COMPAT:37/38 + PLATFORMS:238/253) + the accurate Grok/Codex prose ref (AGENT-COMPAT:96) + write-once archived tasknotes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test`: 13 files, 175 tests pass

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` + `typecheck` clean (output shows `flowtron-viz@5.4.0`)

- [x] (frontend) Asked the user for visual confirmation — N/A (version-string constant only; header version label)

**Testing Notes:**

Markdown prose edits (SPEC/MIGRATION/SECURITY + stamp cells) are single-token substitutions; no frontmatter or fenced blocks touched. viz lint/typecheck/test all green at v5.4.0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — ran `/ft-audit-docs` subroutine over the 11-file AI-referenced doc set; **zero findings**. All version references resolved: 5 release pins → v5.4.0; Claude stamp refreshed to v5.4.0 (AGENT-COMPAT:36 + CAPABILITIES:56); Grok + Codex skip stamps recorded (AGENT-COMPAT:37/38 + PLATFORMS:238/253); AGENT-COMPAT:96 prose accurate; write-once illustrative/historical refs (MIGRATION:131/400/410/413, AGENT-COMPAT:71, AGENT-NEUTRALITY:73) left. README "seven tasknote skills" + 22/22 counts consistent.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-08.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-302.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v5.4.0, tagging CORE-EPIC-301 (downstream-impact reconciliation — a plan-cohesion blast-radius scan that checks each new task / mid-flow decision against existing active PLAN entries for stale / contradictory / redundant overlap and proposes one reconcile action per impacted entry behind a user-confirm gate; wired into the inline filers, `/ft-epic-discovery`, `/ft-task`'s decision path, and propagated to the adopter snippet), plus the AGENTS.md model-gloss + viz dev-server dedup and the AGENTS-snippet `/ft-update` wiring fix. Bumped the 5 version pins (SPEC / MIGRATION example / SECURITY / viz `constants.ts` / viz `package.json`). Dogfood gate: Claude refreshed inline during this `/ft-release` (v5.4.0 · 2026-06-08), Grok and Codex both recorded `skipped @ v5.4.0` (operator deferred). Doc-drift sweep returned zero findings. No adopter migration required — reconciliation is opt-in-on-bump, consumed via submodule pin; adopters with a hand-pasted snippet copy may optionally refresh the reconciliation paragraph.

**Archived:** 2026-06-08
</content>
</invoke>
