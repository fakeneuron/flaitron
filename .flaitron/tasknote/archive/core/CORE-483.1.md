---
title: screenshot-discipline discovery
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-483]
---

# CORE-483.1 | screenshot-discipline discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-483]]

## 🎯 Goal

Scope the `CORE-EPIC-483` epic (`screenshot-discipline`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-483.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (global CLAUDE.md rule, memory file, natabula deposits, SPEC contract impact, adopter .gitignores) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-483.2 .. CORE-483.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Phase 4 doc-drift sweep at closure: all 13 AI-referenced docs "no change" — pure Discovery filing; the epic's edits land in personal-layer files and natabula by design

## 🧩 Subtasks

- [x] Inventory shared design surface (global ~/.claude/CLAUDE.md Playwright rule, memory `feedback_playwright_artifact_paths.md`, natabula gitignore deposits, SPEC §Phase 3 frontend line, adopter .gitignore comments) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + cleanup policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-483.2 .. CORE-483.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-483 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-483]] — parent epic (screenshot-discipline)

## 🌳 Fan-out

- **Parallel:** [[CORE-483.3]] ∥ [[CORE-483.4]] — independent surfaces (natabula deposit wording vs filesystem prune); both unblock once policy lands
- **Sequential:** [[CORE-483.3]] after [[CORE-483.2]]; [[CORE-483.4]] after [[CORE-483.2]] — wording and prune both derive from the locked policy

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator explicitly invoked `/ft-epic-discovery` after questioning the screenshot habit's utility ("a live view of the site is generally better… why are we using screenshots?"). Discovery confirmed the habit is driven by a personal-layer rule, not a flowtron contract — cross-surface policy work warranting the epic bracket.

- [x] Read relevant source files — global `~/.claude/CLAUDE.md` (Playwright-screenshot path rule), memory `feedback_playwright_artifact_paths.md`, `SPEC.md` Phase 3 frontend line, `SPEC/epic.md`, natabula `.gitignore` deposit, adopter `.gitignore`s (adppro/marscharts/natabula), `~/.claude.json` playwright MCP config

- [x] **Best Practices Review** — N/A: no code surface; policy/doc/filesystem work across personal-layer files and gitignored artifacts

- [x] **Archive skim** — [[CORE-383]] is the load-bearing precedent (see Discovery Notes); no other archive tasknote establishes a screenshot convention

- [x] **Drift check** — all cited surfaces verified live at HEAD: global CLAUDE.md rule present; memory 117 days old and now contradicted by the CLAUDE.md rule (that contradiction is itself an epic deliverable); playwright MCP `--output-dir /tmp/playwright-mcp` confirmed in `~/.claude.json`; SPEC §Phase 3 `👁️ CONFIRM` line at SPEC.md:782. No plan/SPEC contradiction — SPEC already delegates visual acceptance to the operator; this epic aligns the personal layer with it.

- [x] Asked clarifying questions — six scoping decisions resolved via AskUserQuestion; see "Resolved scoping" table below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Root-cause inventory — why screenshots keep happening.** Flowtron mandates nothing: SPEC Phase 3's frontend line is *"Asked the user for visual confirmation (`👁️ CONFIRM`)"* — the live-view-first philosophy the operator wants is already the contract. The driver is the global `~/.claude/CLAUDE.md` rule ("Playwright screenshots must always be saved to `.flowtron/screenshots/<name>.png`"), which agents read as normalizing routine screenshotting. It also contradicts the older memory `feedback_playwright_artifact_paths.md` (`/tmp/playwright-mcp/`, "don't drop screenshot files in the project repo") and actively overrides the playwright MCP's own `--output-dir /tmp/playwright-mcp` default back *into* every repo.

**Accretion evidence.** 20 repos carry `.flowtron/screenshots/` (~300MB: fakeneuron 130M, adppro 50M, marscharts 46M, sciphoenix 26M…). All gitignored (verified adppro/marscharts/fakeneuron/sciphoenix/caobunga); flowtron alone tracks one file — README's `viz-board.png`. 68+ archived tasknotes in adppro+marscharts alone cite `screenshots/` paths git never preserves — dead evidence links, confirming persistence has no archival value.

**Utility verdict.** Screenshot-as-agent-eyeball is legitimate (accessibility snapshots show structure, not rendering — layout/CSS/theming checks need pixels); screenshot-as-persistent-evidence is not. Policy keeps the tool, retires the persistence.

**Archive skim findings (load-bearing):**

- **[[CORE-383]]** (README hero shot) — established the one legitimate *tracked* use of `.flowtron/screenshots/`: a deliberate, privacy-vetted docs asset (captured against an isolated `FLOWTRON_VIZ_WORKSPACE` to avoid leaking the private project roster). That carve-out survives this epic untouched.

**Resolved scoping (operator, 2026-08-27):**

| Question | Resolution |
|---|---|
| Epic shape | M=3, no `.N` audit (small policy epic) |
| Trigger clause | **Self-verification only** — agent screenshots only to check rendered UI of its own change, or on explicit ask; never routine per-task evidence. `👁️ CONFIRM` stays the acceptance mechanism. |
| Personal destination | Absolute `~/Code/_screenshots/<project>/<name>.png` (agents create the subfolder). Operator floated relative `../_screenshots`; absolute chosen for worktree/cwd robustness. |
| MCP output-dir | Repoint playwright MCP `--output-dir` → `~/Code/_screenshots` in `~/.claude.json` (retire `/tmp/playwright-mcp`) |
| Adopter layer | Flowtron mandates nothing; `.flowtron/screenshots/` stays only as the gitignored safety-net default documented in the natabula deposit |
| Prune scope | **Prune all** — delete contents of every adopter's gitignored `.flowtron/screenshots/`; keep dirs/gitignore entries; flowtron's tracked `viz-board.png` untouched |
| .3 propagation | natabula deposit only; adopter `.gitignore` comment drift rides `/natabula-layer-drift`, fixed from each repo's own sessions (no bulk edits/pushes) |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-EPIC-482 cohort filing pattern (2-space indent under parent, `[model]` tag per line, em-dash separator, per-child description ≤50w target)

- [x] **Minimal refactor gate** — N/A: pure PLAN.md filing, no code touched

- [x] Implemented the minimal solution — three child lines written under CORE-EPIC-483

- [x] Updated/added tests for non-trivial behavior — N/A: no executable surface

**Implementation Notes:**

Three child lines filed: `.2` screenshot-policy-rewrite `[medium]` (~35w), `.3` natabula-deposit-alignment `[light]` (~38w), `.4` screenshot-prune-sweep `[light]` (~33w) — all under the 50w target. M unchanged from the filing-time estimate (3). Downstream-impact scan: High / Low / Future Opportunities are empty; Medium holds only this epic — **no downstream impact**. Fan-out populated: `.3` ∥ `.4`, both sequential after `.2`; no Synthesis row (audit declined at filing). Model tags diverge per child from the epic-level `[medium]` per the Step 2 resolution (mechanical children ride `[light]`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only

- [x] Ran lint/type-check on changed code — N/A: markdown-only; mental-pass run instead (below)

- [x] **Quality assertions** — no duplication (each policy surface named once per child), no dead references, cross-refs verified

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass on the PLAN.md cohort block: indent, bold IDs, `[model]` tags, shortname lengths (25/26/21 chars), em-dash separators, word counts (~35/~38/~33), Fan-out wikilinks — all pass. No reconcile edits to pre-existing lines (active sections were empty).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · AGENTS.md: no change · SPEC.md: no change · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: no change · docs/PLATFORMS.md: no change. Pure Discovery filing; the epic's edits land in personal-layer files (`~/.claude/CLAUDE.md`, `~/.claude.json`, memory) and natabula — no flowtron contract doc is touched by design ("flowtron stays silent" is the .3 resolution).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline on conditional skip

**Final Summary:**

Filed CORE-EPIC-483 (screenshot-discipline) and closed its Discovery in one motion. Root cause established: the screenshot habit is driven by the global `~/.claude/CLAUDE.md` path rule, not by flowtron — SPEC Phase 3 already delegates visual acceptance to the operator's live view (`👁️ CONFIRM`). Policy locked with operator: screenshots stay as an ephemeral agent-self-verification tool only, landing in absolute `~/Code/_screenshots/<project>/`; playwright MCP `--output-dir` to be repointed; `.flowtron/screenshots/` remains only a gitignored adopter safety net (natabula-documented); ~300MB of accumulated gitignored PNGs across ~20 repos to be pruned. Children `.2..4` filed in PLAN.md (~35/~38/~33 words); no audit subtask (declined — small policy epic); Fan-out: `.3` ∥ `.4` after `.2`.

**Archived:** 2026-08-27
