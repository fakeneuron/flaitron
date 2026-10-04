---
title: positioning-oversight-checkpoints
status: completed
tags: []
created: 2026-07-31
due:
related-tasks: [CORE-383]
---

# CORE-382 | positioning-oversight-checkpoints

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-383]]

## 🎯 Goal

Reframe flowtron's outward pitch from context-economy ("keep AI context windows small") to agent-oversight checkpoints ("where you catch the agent before it wastes a session"), and unblock that framing by editing the `no PR review queue` audience line in `docs/VISION.md` §"Who it's for".

## ✅ Acceptance

- [ ] `docs/VISION.md` lede (:3) states agent-oversight checkpoints as the goal, with context economy demoted to a stated mechanism.
- [ ] `docs/VISION.md` §"Who it's for" no longer carries `no PR review queue`; the replacement bullet frames the solo dev as the agent's only reviewer.
- [ ] `SPEC.md` §"What is Flowtron" goal paragraph (:12-14) carries the same goal/mechanism ordering as VISION.
- [ ] `README.md` lede (:6-8) carries the 2-line hook; `## Documents` and all other README structure untouched (reserved for [[CORE-383]]).
- [ ] `claude/skills/ft-flowtron/SKILL.md` info-screen blurb (:27) matches the new pitch.
- [ ] Core Principle #3 ("One task per context window") is unedited in all four surfaces that carry it — the reframe moves the *pitch*, not the principle.
- [ ] The load-bearing checkpoint phrasing reads consistently across README / SPEC / VISION / ft-flowtron (the [[CORE-330.6]] cross-surface consistency precedent).
- [ ] `docs/PHILOSOPHY.md` and the SPEC↔VISION §"What we won't accept" 1:1 mirror ([[CORE-376]]) are untouched.

## 🧩 Subtasks

- [ ] Draft the canonical 2-line hook + the goal/mechanism sentence pair (the wording every other surface derives from).
- [ ] Rewrite `docs/VISION.md:3` lede to lead with checkpoints, context economy as means.
- [ ] Replace the `no PR review queue` bullet at `docs/VISION.md:11` with the checkpoint-positive audience line.
- [ ] Update `SPEC.md:12-14` goal paragraph to the same ordering.
- [ ] Update `README.md:6-8` lede to the 2-line hook (lede only — no structural edits).
- [ ] Update `claude/skills/ft-flowtron/SKILL.md:27` info-screen blurb.
- [ ] Verify Core Principle #3 untouched everywhere; grep the checkpoint phrase across all four surfaces for consistency.
- [ ] Reconcile the [[CORE-383]] PLAN line — its "2-line hook (from CORE-382)" clause is satisfied by this task, narrowing it to layout work.

## 🔗 Related

- [[CORE-383]] — README above-fold restructure; consumes the 2-line hook this task produces.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed same-day (2026-07-31) from a competitive-landscape review with explicit operator sign-off on moving the VISION audience line. The blocker it names (`docs/VISION.md:11`) is verbatim-present at HEAD and still rules out the framing. Nothing has drifted; the work is live.

- [x] Read relevant source files — `docs/VISION.md`, `README.md` (lede + `## Documents`), `SPEC.md` §"What is Flowtron" + §"Core principles", `claude/skills/ft-flowtron/SKILL.md`, `.flowtron/tasknote/README.md` §"AI-referenced docs".

- [x] **Best Practices Review** — `N/A` for code/module boundaries: this is a documentation-positioning task with no code surfaces. The doc-layer analogue *is* in scope and recorded below (SSOT ownership + the VISION↔SPEC mirror).

- [x] **Archive skim** — grepped `archive/core/` (479 tasknotes) for `VISION`; read the load-bearing hits. Findings below.

- [x] **Drift check** — `docs/VISION.md:11` is verbatim `- You work alone (or in pairs at most) — no team handoff, no PR review queue.` §"Who it's for" exists as cited. `README.md` `## Documents` does run lines 10–54 and `LOGO.png` is present at repo root but unreferenced (CORE-383's premises hold too). No drift.

- [x] Asked clarifying questions — three scope calls resolved by operator via AskUserQuestion; answers recorded below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Surface survey — where the context-economy pitch lives.** Five surfaces state the *goal* as context economy; a sixth set states it as *mechanism* (Core Principle #3) and is deliberately out of scope.

| Surface | Line | Role | In scope |
|---|---|---|---|
| `docs/VISION.md` | 3 | outward identity lede | ✅ |
| `docs/VISION.md` | 11 | `no PR review queue` audience blocker | ✅ |
| `README.md` | 6–8 | public hook | ✅ (lede only) |
| `SPEC.md` | 12–14 | AI-facing contract lede | ✅ |
| `claude/skills/ft-flowtron/SKILL.md` | 27 | info-screen blurb | ✅ |
| Core Principle #3 | SPEC:20, VISION:23, ft-flowtron:36, PHILOSOPHY:43 | mechanism | ❌ untouched |

The distinction that makes the reframe safe: **the principle is a mechanism, not the pitch.** Demoting context economy in the lede while leaving Principle #3 intact is coherent — the principle explains *why the checkpoints are reviewable*, which is exactly the "demote to mechanism" framing the operator chose.

**Archive skim findings (load-bearing):**

- **[[CORE-376]]** — established the SPEC §"PR / suggestion archetypes" ↔ VISION §"What we won't accept" mirror is **1:1 and load-bearing**; a prior drift there was a filed defect. Constraint: this task must not touch either side of that mirror. It doesn't — the reframe lands in the lede/audience sections, well above it.
- **[[CORE-330.6]]** — precedent that a cross-cutting positioning phrase is verified **verbatim-consistent** across `SPEC.md` / `README.md` / `docs/VISION.md` (there: "contract the loop reports to"). Directly applicable: the new checkpoint phrasing needs the same consistency check, now across four surfaces including the ft-flowtron blurb. Promoted into Acceptance.
- **[[CORE-352.1]]** — noted that a new capability touching positioning "redraws the VISION/README boundary." Here the boundary is unchanged (VISION owns identity, README quotes it); only the content moves.
- **[[CORE-309]]** — precedent for listing "surfaces checked, no change needed" in the closure recap. Will mirror that for PHILOSOPHY.md and the won't-accept mirror.

**Doc-layer SSOT.** `docs/VISION.md` is the identity SSOT; `README.md` and the ft-flowtron blurb are derivations of it, and `SPEC.md`'s goal paragraph is the AI-facing restatement. Drafting the canonical hook **once** and deriving the other four (Subtask 1) is the doc-layer equivalent of the pattern survey — it's why the subtask order starts with wording rather than with a file.

**Clarifications resolved (operator, 2026-07-31):**

1. **Blast radius → all five surfaces, README included** (hook only, not structure). Widens the task past the PLAN line's "Requires editing `docs/VISION.md`". Rationale: leaving `SPEC.md:12` and the ft-flowtron blurb on the old framing would create exactly the cross-surface drift [[CORE-330.6]] set precedent against, and CORE-376 shows that kind of drift gets filed as a defect later.
2. **`no PR review queue` → replaced with a checkpoint-positive line** framing the solo dev as the agent's only reviewer. The old phrasing reads as "no review at all," which contradicts a checkpoint pitch; the solo/no-team signal that gates the "not for teams" line below is preserved in the replacement.
3. **Context economy → demoted to mechanism**, not deleted. Goal = catch the agent before it wastes a session; mechanism = the 4 phases + Relevance Assessment + Acceptance criteria are the checkpoints; small windows are what keep each checkpoint reviewable.

**Explicit assumptions:**

- `docs/PHILOSOPHY.md` is history, not pitch — untouched.
- Peer precedent (Backlog.md leading on spec/plan/code review checkpoints) is taken as given from the landscape review; not independently re-verified.
- README edits are confined to lines 6–8. `## Documents`, shields, `LOGO.png`, and the screenshot all remain [[CORE-383]]'s work.

**Downstream-impact reconciliation ([[CORE-383]]).** Widening scope to README's lede satisfies CORE-383's `2-line hook (from CORE-382)` clause in advance. Classification: **redundant** (one clause only, not the whole entry). Proposed action: **edit** — drop the hook clause from the CORE-383 line so it reads as pure layout work (logo → screenshot → quickstart → collapsed index → shields → dogfooding stat). No other active PLAN entry shares a surface with this decision.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the [[CORE-330.6]] doc-layer pattern: draft the load-bearing phrase once, then derive every surface from it so the phrase reads verbatim across all four. No new shape invented.

- [x] **Minimal refactor gate** — no structural doc changes. README edits confined to the lede paragraph (lines 6–8); `## Documents` and everything below untouched per the [[CORE-383]] boundary. Deferred: nothing.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, prose-only change. The existing viz suite is the relevant guard (it parses `PLAN.md`); ran unchanged, 242/242 pass.

**Implementation Notes:**

**Canonical wording (drafted first, then derived — Subtask 1):**

- **Goal:** catch the agent before it wastes a session.
- **Mechanism:** the four phases, the Relevance Assessment, and the Acceptance criteria are the checkpoints where you look.
- **Why it works:** one task per context window keeps each one small enough to actually review.

`catch the agent before it wastes a session` is the load-bearing phrase and appears **verbatim** in all four shipped surfaces.

**Edits (5 files, +13/−10):**

| File | Change |
|---|---|
| `docs/VISION.md:3` | Lede reframed — checkpoints lead, context economy reads as the mechanism that makes them reviewable. |
| `docs/VISION.md:11` | `no PR review queue` → `You are the only reviewer the agent gets — no team handoff, no second pair of eyes catching a bad session before it lands.` |
| `SPEC.md:12-14` | Goal paragraph → same goal/mechanism ordering (3 lines → 5). |
| `README.md:6-8` | Lede → the 2-line hook. Lowercase "relevance gate" / "acceptance criteria" here (README is prose-register); SPEC/VISION use the capitalized contract terms. |
| `claude/skills/ft-flowtron/SKILL.md:27` | Info-screen blurb → checkpoint framing, verbatim phrase. |

**PLAN reconcile (operator-confirmed):** `CORE-383`'s `2-line hook (from CORE-382) →` clause replaced with `the existing lede hook (already reframed by [[CORE-382]]) →`. The wikilink is a real cross-reference and parses into `relatedTasks` as intended.

**Deliberately untouched:**

- **Core Principle #3** — all four carriers (`SPEC.md:22`, `docs/VISION.md:23`, `ft-flowtron:36`, `docs/PHILOSOPHY.md:43`) byte-identical. The reframe moves the pitch, not the principle.
- **SPEC↔VISION §"What we won't accept" 1:1 mirror** — the [[CORE-376]] constraint; the reframe lands well above it.
- **`docs/PHILOSOPHY.md`** — history, not pitch.
- **`docs/VISION.md:13`** (`…for actual implementation, not just code review`) — checked for tension with the new bullet 11; reads coherently (the AI implements, you review), so left alone rather than expanding scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → **242 passed / 18 files**. Run because `PLAN.md` is a viz-parsed surface and this task edited the CORE-383 line (added a `[[CORE-382]]` wikilink).

- [x] Ran lint/type-check on changed code — `N/A`, all five changed files are markdown; no linted source touched.

- [x] **Quality assertions** — verified by grep across the shipped docs:
  - **No duplication drift** — `catch the agent before it wastes a session` appears verbatim in all four shipped surfaces (`SPEC.md:12`, `README.md:6`, `ft-flowtron:27`, `docs/VISION.md:3`); zero variants.
  - **No stale content** — zero residual `keep AI context windows small` / `Keeps context windows small` / `PR review queue` hits in any shipped doc. Remaining hits are the tasknote (recording the work) and CORE-382's own PLAN line (stubbed at closure).
  - **No public-surface growth** — no new sections, files, or doc entries; five in-place prose replacements.
  - **No unexplained complexity** — net +3 lines across the repo.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface changed. The `ft-flowtron` info screen is prose output, not rendered UI.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 §"AI-referenced docs" entries walked:

  | Doc | Verdict |
  |---|---|
  | `README.md` | **updated** — lede (6–8) reframed to the checkpoint hook |
  | `SPEC.md` | **updated** — §"What is Flowtron" goal paragraph (12–14) |
  | `docs/MIGRATION.md` | no change — carries no pitch language (grep: 0 hits) |
  | `claude/AGENTS-snippet.md` | no change — 0 hits |
  | `codex/AGENTS-snippet.md` | no change — 0 hits |
  | `docs/CONVENTIONS.md` | no change — its :100 MCP argument cites Principle #3 as a *mechanism*, which is exactly the framing this task preserves |
  | `CONTRIBUTING.md` | no change — 0 hits |
  | `SECURITY.md` | no change — 0 hits |
  | `docs/AGENT-NEUTRALITY.md` | no change — 0 hits; no new Claude-specific surface introduced |
  | `docs/PLATFORMS.md` | no change — its :287 Grok row cites the principle as a mechanism, still accurate |
  | `claude/CAPABILITIES.md` | no change — its :32 `/clear` row cites the principle as a mechanism, still accurate |
  | `docs/AGENT-COMPAT.md` | no change — 0 hits |

  Non-ledger surface also updated: `claude/skills/ft-flowtron/SKILL.md` (lazy-loaded, outside the cold-start sweep, but carries the pitch verbatim).

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Flowtron's outward pitch now leads with what it actually buys you — checkpoints where you catch the AI agent before it burns a session — instead of the context-economy claim ("keep AI context windows small") that read as ceremony and undersold the 4-phase gate. The audience line that ruled the framing out (`no PR review queue`) is gone, replaced by one that makes the solo developer the agent's only reviewer.

**Changed:** 5 files, +13/−10 (all markdown, no code).

- `docs/VISION.md` (2 edits) — identity lede + §"Who it's for" audience bullet. This is the positioning SSOT; the other four surfaces derive from it.
- `SPEC.md:12-14`, `README.md:6-8`, `claude/skills/ft-flowtron/SKILL.md:27` — same goal/mechanism ordering, derived from one canonical draft.
- `.flowtron/PLAN.md` — [[CORE-383]]'s `2-line hook (from CORE-382)` clause reconciled to `the existing lede hook (already reframed by [[CORE-382]])`, narrowing it to pure layout work (operator-confirmed at the 🛠️ gate).

**Verification:**

- `npm --prefix viz test` → **242 passed / 18 files** (run because `PLAN.md` is a viz-parsed surface).
- `grep "wastes a session"` → the load-bearing phrase appears **verbatim** in all four shipped surfaces; zero variants (the [[CORE-330.6]] cross-surface consistency precedent).
- `grep "keep AI context windows small|Keeps context windows small|PR review queue"` → **zero** hits in shipped docs.
- `grep "One task per context window"` → all four carriers byte-identical.

**Refactors:** none made, none deferred. Prose-only, in-place.

**Documentation verdict:** 2 of 12 ledger docs updated, 10 no-change; the three that reference context economy do so as a *mechanism* (Principle #3), which the reframe deliberately preserves — no consequential edits needed. `docs/PHILOSOPHY.md` and the [[CORE-376]] SPEC↔VISION won't-accept 1:1 mirror confirmed untouched.

**Maintainability effect:** one canonical sentence now governs the pitch, and every surface quotes it verbatim — a future reframe is a grep-and-replace rather than five independent judgment calls. Scope discipline held: `docs/VISION.md:13` was checked for tension with the new audience bullet and consciously left alone rather than widening the diff.

**Archived:** 2026-07-31
