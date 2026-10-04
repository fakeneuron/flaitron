---
title: model-roster-refresh
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: [CORE-303, CORE-259, CORE-256, CORE-353.3]
---

# CORE-373 | model-roster-refresh

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-303]] [[CORE-259]] [[CORE-256]] [[CORE-353.3]]

## 🎯 Goal

Refresh flowtron's model vocabulary for the current Claude 5 family (Fable 5 / Mythos 5 / Opus 5 / Sonnet 5, Haiku 4.5) across SPEC/model.md tier calibration + effort axis, viz ModelChip + parser tiering comment, ft-stats named buckets, and the step-1.5 edge-case token lists.

## ✅ Acceptance

- [x] `SPEC/model.md` heavy calibration names the current Claude 5 heavy family (`fable` / `mythos` / `opus`) without the stale "fable is the tier above opus" framing
- [x] `SPEC/model.md` medium calibration keeps `sonnet` on the medium rung and carries the Sonnet 5 narrowed-gap note (operator-confirmed)
- [x] `SPEC/model.md` effort axis states the current Claude ladder `low`/`medium`/`high`/`xhigh`/`max`, and extends the session-configuration carve-out to cover context-window variants (1M) alongside effort
- [x] `viz/src/ui/ModelChip.tsx` `HEAVY_MODELS` covers `mythos`; `ModelChip.test.tsx` asserts the refreshed set
- [x] `viz/src/parser.ts` "Recommended set" tiering comment reflects the Claude 5 roster
- [x] `/ft-stats` gains a `haiku` named bucket at every site (rule, field enum, Section A table, always-shown note, output template) — operator-confirmed; `mythos` stays in `other`
- [x] Both `step-1.5-model-edge.md` copies (ft-task + ft-micro-task) list the current roster tokens
- [x] `docs/GLOSSARY.md` `[model]` entry verified (no change or updated)
- [x] viz tests + lint + typecheck pass

## 🧩 Subtasks

- [x] `SPEC/model.md` — refresh heavy/medium/light calibration baseline (Claude 5 family; `mythos` alongside `fable`; Sonnet 5 note)
- [x] `SPEC/model.md` — refresh the effort axis (`xhigh` now standard, not "some models") and extend the session-config carve-out to context-window variants
- [x] `viz/src/parser.ts` — refresh the "Recommended set" tiering comment
- [x] `viz/src/ui/ModelChip.tsx` — add `mythos` to `HEAVY_MODELS`
- [x] `viz/src/ui/ModelChip.test.tsx` — cover the refreshed set
- [x] `claude/skills/ft-stats/SKILL.md` — add the `haiku` bucket at all 5 sites
- [x] `claude/skills/ft-task/step-1.5-model-edge.md` — refresh the legacy-entry token list
- [x] `claude/skills/ft-micro-task/step-1.5-model-edge.md` — same edit, second copy
- [x] `docs/GLOSSARY.md` — verify the `[model]` entry example names
- [x] Run viz test / lint / typecheck

## 🔗 Related

- [[CORE-303]] — added `fable` to the vocabulary (2026-06-09); direct precedent for this sweep's surface list
- [[CORE-259]] — added the `medium` tier rung to the ladder
- [[CORE-256]] — established `[heavy]`/`[medium]`/`[light]` as the primary labels
- [[CORE-353.3]] — added the 🧩 medium glyph to the next-move suggestion cue

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Flowtron's roster still describes `fable` as "the tier above opus" from the CORE-303 (2026-06-09) sweep and treats `xhigh` effort as available "on some models". The Claude 5 family has since settled (Fable 5 / Mythos 5 / Opus 5 / Sonnet 5 / Haiku 4.5, 1M context as the default on all but Haiku, the full `low`–`max` effort ladder). Mechanical multi-surface vocab refresh, exactly as filed.

- [x] Read relevant source files

- [x] **Best Practices Review** — the only executable surface is viz (`ModelChip.tsx`, `parser.ts`); the rest is markdown contract. `HEAVY_MODELS` is a single-responsibility lookup set in the component that owns the glyph — extending the set is the established shape (CORE-303 did exactly this). No refactor required; no dependency boundary touched. `parser.ts` keeps `TaskModel = string`, so no type change follows from a roster edit.

- [x] **Archive skim** — see Discovery Notes

- [x] **Drift check** — see Discovery Notes

- [x] Asked clarifying questions — two operator-owned curation calls, both answered as recommended:
  1. **Sonnet tier** → `sonnet` stays on the medium rung; SPEC/model.md gains a Sonnet 5 narrowed-gap note. Preserves the ⚠️ under-tier advisory on `[heavy]` tasks and keeps the ladder a task-cognitive-load label rather than a capability leaderboard (CORE-256/259 intent).
  2. **ft-stats named buckets** → add `haiku` only. Closes the gap where haiku is flowtron's named light-tier example but buckets as `other`. `mythos` stays in `other` (Project Glasswing-only access ⇒ a near-permanently empty row for every adopter; the no-speculative-features principle applies).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim** (`grep -l` per path across `archive/core/`):

- `SPEC/model.md` → CORE-323, CORE-324.5, CORE-353.{1,2,3,4,5,N}
- `ModelChip` → CORE-023, CORE-042.4, CORE-098.{3,4,11,12}, CORE-138, **CORE-303**
- `ft-stats` → CORE-143, CORE-191, CORE-259, CORE-263, **CORE-303**, CORE-349.3, CORE-353.5, CORE-359.3
- `step-1.5-model-edge` → CORE-195.2, CORE-207, CORE-254.4, CORE-256, CORE-257, CORE-324.3, CORE-330.4, CORE-353.5

Load-bearing findings:

1. **CORE-303 is the direct precedent** — same task shape (add Fable to the vocabulary), and its surface list is broader than the four PLAN.md names: it also touched `viz/src/parser.ts`'s tiering comment, `docs/GLOSSARY.md`'s `[model]` entry, SPEC.md §"Task-line format", and **both** copies of `step-1.5-model-edge.md` (ft-task *and* ft-micro-task). Its acceptance line records the ft-stats bucket set as an **operator-confirmed decision**, not an assistant call — so the bucket question below follows precedent rather than inventing a gate.
2. **CORE-259 / CORE-256** establish that the ladder is deliberately **tier-count-agnostic** and read by position, and that the tier is a *cognitive-load label for the task*, not a model-capability leaderboard. Any move of `sonnet` between rungs has to be justified on that basis, not on benchmark position.
3. **CORE-353.3** locked the suggestion glyph at three values mirroring the ladder 1:1. A roster edit must not disturb that mapping.

**Drift check** — all four PLAN.md-named surfaces exist and match the description:

| Surface | Current state | Verdict |
|---|---|---|
| `SPEC/model.md:75` heavy calibration | `fable` (Anthropic's tier above opus), `opus` | stale phrasing — Fable 5 / Mythos 5 / Opus 5 now co-exist as a family |
| `SPEC/model.md:79-83` medium calibration | `sonnet`, `grok`, `codex` | needs a Sonnet 5 note (see question) |
| `SPEC/model.md:98-101` effort axis | "Claude's `low`/`medium`/`high`/`max`, with `xhigh` on some models" | stale — `xhigh` is standard across the Claude 5 family |
| `viz/src/ui/ModelChip.tsx:4` | `HEAVY_MODELS = new Set(['opus', 'fable'])` | matches |
| `claude/skills/ft-stats/SKILL.md` | named buckets `fable`/`opus`/`sonnet` (4 sites: rule L44, field enum L60, Section A table L82-84, always-shown note L92, output template L130) | matches |
| `claude/skills/{ft-task,ft-micro-task}/step-1.5-model-edge.md` | legacy-entry list `fable`/`opus`/`sonnet`/`grok`/`haiku` | matches — **two** copies, PLAN line names one |

**Scope additions beyond the PLAN.md line** (per the CORE-303 precedent, all example-token surfaces move together or the vocabulary drifts apart):

- `viz/src/parser.ts:8-11` — "Recommended set" tiering comment still says "fable is the tier above opus"
- `claude/skills/ft-micro-task/step-1.5-model-edge.md` — second copy of the legacy-entry token list
- `viz/src/ui/ModelChip.test.tsx` — covers the `HEAVY_MODELS` set
- `docs/GLOSSARY.md:73` — `[model]` entry example names (`fable`, `opus`, `grok`) — likely "no change", confirm at Phase 4

**Roster facts** (loaded from the `claude-api` skill per its trigger, rather than from memory):

| Model | ID | Context | Flowtron tier |
|---|---|---|---|
| Claude Fable 5 | `claude-fable-5` | 1M | heavy |
| Claude Mythos 5 | `claude-mythos-5` (Project Glasswing only) | 1M | heavy |
| Claude Opus 5 | `claude-opus-5` | 1M | heavy |
| Claude Sonnet 5 | `claude-sonnet-5` | 1M | medium (see question) |
| Claude Haiku 4.5 | `claude-haiku-4-5` | 200K | light |

Effort ladder is now `low` / `medium` / `high` / `xhigh` / `max` across the Claude 5 family (`xhigh` recommended for coding + agentic work); 1M context is the default, not a premium variant. Neither the context-window variant nor the effort setting should earn its own `[model]` token — both are session configuration, which SPEC/model.md already says for effort and should now say for context too.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-303 vocab-sweep shape exactly: extend the `HEAVY_MODELS` set in place, add one bucket row at each of the five ft-stats sites, refresh prose calibration in `SPEC/model.md`. No new abstraction; no shared roster constant introduced (the two executable sites — `HEAVY_MODELS` and the `parser.ts` comment — serve different consumers, and flowtron rejects abstractions without two-project precedent).

- [x] **Minimal refactor gate** — no refactor. Every edit is additive vocabulary or corrected prose in the touched path.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `ModelChip.test.tsx` gains a `mythos` case and converts the single negative case to an `it.each` over `sonnet`/`grok`/`haiku`, so a future tier promotion can't silently pass.

**Implementation Notes:**

Nine files, all additive:

| File | Change |
|---|---|
| `SPEC/model.md` | heavy baseline reframed (`fable` + `mythos`, no "tier above opus"); medium gains the Sonnet 5 narrowed-gap note; effort axis now `low`–`max` with `xhigh` standard; new paragraph excluding effort + context-window variants from the token vocabulary |
| `viz/src/ui/ModelChip.tsx` | `HEAVY_MODELS` += `mythos`; SPEC cross-reference comment |
| `viz/src/ui/ModelChip.test.tsx` | +`mythos` case; negative case widened to `it.each` |
| `viz/src/parser.ts` | "Recommended set" comment now tier-annotated and includes `haiku` |
| `claude/skills/ft-stats/SKILL.md` | `haiku` bucket at all 5 sites (rule, field enum, Section A table, always-shown note, output template) |
| `claude/skills/ft-task/step-1.5-model-edge.md` | legacy-entry list tier-ordered + no-variant-token rule |
| `claude/skills/ft-micro-task/step-1.5-model-edge.md` | same edit, second copy |
| `docs/AGENT-NEUTRALITY.md` | `SPEC/model.md` ledger row: example set + CORE-373 citation |

**Judgment calls, both stated rather than assumed:**

1. `mythos` earns a `HEAVY_MODELS` entry (one-line set member, correct if it ever appears) but **not** an ft-stats bucket row (a named row renders for every adopter; Glasswing-only access makes it permanently empty). Operator-confirmed.
2. The no-variant-token rule is new contract text, not just a roster refresh — but it is the direct consequence of "1M-context and effort variants" in the filing, and without it the next `[opus-1m]`-style filing has nothing to point at.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `ModelChip.test.tsx` 6/6, then full suite 242/242 across 18 files

- [x] Ran lint/type-check on changed code — `eslint src` clean, `tsc --noEmit` clean

- [x] **Quality assertions** — no duplication introduced (the two step-1.5 copies were already parallel by design, documented in AGENT-NEUTRALITY); no dead code; no public-surface growth (`TaskModel` stays `string`); the `parser.ts` and `ModelChip` comments now point at `SPEC/model.md` rather than restating tier facts, so the next roster shift has one authoritative site

- [x] (frontend) Visual confirmation — **N/A with reason.** `ModelChip` changed only by admitting a token (`mythos`) that appears in zero PLAN entries (`grep -c '\[mythos\]' .flowtron/PLAN.md` → 0), so the rendered board is byte-identical. Sending the operator to `localhost:5120` would confirm nothing.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 12 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — no roster content |
  | `SPEC.md` | no change — §"Task-line format" token list (`fable`/`opus`/`sonnet`/`haiku`/…) and the `[opus]` grammar examples are all still-valid current tokens |
  | `docs/MIGRATION.md` | no change — example PLAN lines use `[opus]`/`[sonnet]`, both current |
  | `claude/AGENTS-snippet.md` | no change |
  | `codex/AGENTS-snippet.md` | no change |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change |
  | `docs/AGENT-NEUTRALITY.md` | **updated** — the `SPEC/model.md` ledger row enumerates the example set and carries the citation chain; both went stale the moment this task edited that paragraph |
  | `docs/PLATFORMS.md` | no change — the `xhigh` reference is Codex's effort ladder, not Claude's |
  | `claude/CAPABILITIES.md` | no change — `/model opus` example and the 🧠/🧩/🔧 glyph mapping remain accurate; `last-verified` stamp (`v5.13.0 · 2026-07-16`) is a Claude Code capability stamp, not a roster stamp, so no bump owed |
  | `docs/AGENT-COMPAT.md` | no change |

  Also checked outside the declared set: `docs/GLOSSARY.md` `[model]` entry (`fable`, `opus`, `grok`, "etc.") — illustrative, not exhaustive, all current; no change.

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Refreshed flowtron's model vocabulary for the current Claude 5 family across nine files, and closed a contract gap the roster shift exposed: effort levels and context-window variants explicitly do **not** earn their own `[model]` tokens.

Two curation calls went to the operator rather than being assumed, following the CORE-303 precedent that records bucket decisions as operator-confirmed: `sonnet` stays on the medium rung with a Sonnet 5 narrowed-gap note (keeping the ladder a task-cognitive-load label, and preserving the ⚠️ advisory on `[heavy]` tasks), and `/ft-stats` gains a `haiku` bucket only — `mythos` stays in `other` because a Glasswing-only named row would render empty for every adopter.

Verification: viz 242/242 tests across 18 files, `eslint src` clean, `tsc --noEmit` clean. Frontend visual confirmation is N/A — the only viz behavior change admits a token with zero occurrences in PLAN data, so the board renders identically.

Maintainability effect: the tier facts now live in `SPEC/model.md` alone, with `parser.ts` and `ModelChip.tsx` pointing at it instead of restating it — the next roster shift has one authoritative site plus a mechanical list of co-varying surfaces (recorded in Discovery Notes for whoever runs the sweep after this one).

**Archived:** 2026-07-27
