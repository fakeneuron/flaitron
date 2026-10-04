---
title: spec-agent-validation discovery
status: completed
tags: [enhancement, agent-capabilities, spec-driven, multi-agent]
created: 2026-07-10
due:
related-tasks: [CORE-EPIC-352]
---

# CORE-352.1 | spec-agent-validation discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-352]]

## 🎯 Goal

Scope the CORE-EPIC-352 epic (`spec-agent-validation`) before any implementation child fires; deliverable = filed concrete child scopes for CORE-352.2..5 in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-352.2 .. CORE-352.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-352.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-352.2 .. CORE-352.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-352 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic (spec-agent-validation); brief imported from prior chat (Kiro-inspired capabilities)
- [[CORE-EPIC-195]] — skill-add precedent (`/ft-debug`)
- [[CORE-EPIC-330]] — skill-add + wiring fan-out precedent (`/ft-goal-task`)
- [[CORE-EPIC-215]] — worktree multi-agent isolation precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-epic-discovery` with a multi-deliverable brief (new skill + docs + optional validation) that exceeds single-task scope. Gaps vs Kiro-style tools are real; Flowtron already owns persistent memory + worktrees + agent-neutrality — additive capabilities fit the epic bracket. Philosophy constraints (no new phase, no hooks/daemons, optional skills) reshape secondary scope but do not kill the primary `/ft-spec` deliverable.

- [x] Read relevant source files — `docs/PHILOSOPHY.md`, `docs/VISION.md` (§"What we won't accept"), `docs/WORKTREES.md`, `docs/PLATFORMS.md`, `docs/MIGRATION.md` §1.2, `claude/AGENTS-snippet.md`, `claude/skills/ft-starter-task/SKILL.md`, `claude/skills/ft-goal-task/SKILL.md` (peer pattern), `claude/skills/ft-flowtron/SKILL.md` (roster), `SPEC/procedures/README.md`, `SPEC.md` Phase 3, `templates/tasknote-template.md`, `SPEC/epic.md`.

- [x] **Archive skim** — load-bearing precedents:
  - **[[CORE-195.1]]** (`/ft-debug`): new tasknote skill = standard 4-phase template + methodology in skill drive; soft tone; SPEC "when to use" bullet + §1.2 symlink fan-out. Closest *skill-add* anatomy.
  - **[[CORE-330.1]]** (`/ft-goal-task`): 4-child split with separate **wiring** child; redraws VISION/README boundary when a new capability touches "what we won't accept"; dogfood-friendly.
  - **[[CORE-EPIC-215]] / WORKTREES.md**: multi-agent isolation already codified (one agent per tasknote per worktree) — external-agent docs should **extend** this, not invent orchestration.
  - **[[CORE-EPIC-271]] / [[CORE-EPIC-154]]**: cross-agent skill projection + multi-agent portability — any new skill must land Claude + Codex wrappers + roster counts, not Claude-only.
  - No prior `ft-spec` / EXTERNAL-AGENTS / property-based work in archive or HEAD.

- [x] **Drift check** (2026-07-10 HEAD):
  - `claude/skills/`: ✅ 25 dirs; `claude/commands/`: ✅ 25; `codex/skills/`: ✅ 25 — adding `/ft-spec` bumps all three inventories + adopter subset counts.
  - Adopter subset today: **nine** tasknote-family skills + worktree pair + `/ft-update` (`docs/MIGRATION.md` §1.2, `docs/PLATFORMS.md`). `/ft-spec` would make **ten** tasknote-adjacent / planning skills if auto-wired — or stay global/docs-only if not.
  - `docs/WORKTREES.md`: ✅ five locked conventions; no EXTERNAL-AGENTS.md yet.
  - Phase 3 is Testing & Linting only — no Validation phase; VISION rejects a fifth lifecycle phase and schema validators.
  - `SPEC/procedures/`: only `ft-task.md` SOP today; new optional procedure for `ft-spec` is possible but not required for Claude-first skills.
  - Brief-cited paths (`docs/PHILOSOPHY.md`, `docs/VISION.md`, `templates/`) ✅ match HEAD. No Kiro-specific content anywhere (expected).

- [x] Asked clarifying questions — **two AskUserQuestion rounds declined by operator**. Proceeding with **recommended locks as explicit assumptions** (table below); operator **go** on Phase 1→2 confirmed assumptions.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface inventory

| Surface | Role for this epic |
|---|---|
| `claude/skills/ft-spec/` + `claude/commands/ft-spec.md` | Primary: skill body + slash command |
| `codex/skills/ft-spec/` | Codex wrapper (pattern: route to canonical skill / neutral steps) |
| Optional `SPEC/procedures/ft-spec.md` + `grok/procedures/` pointer | Only if contract-only agents need a first-class SOP; can defer |
| `templates/` — optional spec output template | e.g. `templates/spec-template.md` for stable section order |
| `templates/tasknote-template.md` | Soft optional Validation / Phase 3 guidance bullets only — **no new phase** |
| `docs/EXTERNAL-AGENTS.md` (new) + `docs/WORKTREES.md` cross-link | External CLI agent patterns (Kiro, Claude, Codex); one agent / one tasknote |
| `docs/MIGRATION.md` §1.2, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `ft-new-project`, `ft-flowtron`, root `Agents.md` | Wiring fan-out if auto-wired into adopter subset |
| `SPEC/tasknote-selection.md` | "When to use" bullet for `/ft-spec` vs starter / epic-discovery |
| `docs/PHILOSOPHY.md` / `VISION.md` | Hard constraints: zero scripts, no daemons/hooks, no schema validators, optional not mandatory |

### Philosophy constraints (non-negotiable for child scopes)

1. **No new lifecycle phase** — validation guidance folds into Phase 3 Testing & Linting or optional template bullets; never a "Validation Gate."
2. **No post-close hooks / daemons** — brief's §4 Minimal Post-Closure Hooks is **out of epic scope** (VISION rejects loop runners / session tooling / hook systems in flowtron itself).
3. **Optional, not mandatory** — `/ft-spec` never becomes required before `/ft-task` or `/ft-epic-discovery`.
4. **Operator review over autonomy** — generate → review → then optionally write; never silent PLAN/tasknote creation.
5. **Extend worktrees for multi-agent** — document handoff to external CLIs; do not ship parallel orchestration runtime.
6. **Agent-neutral contract** — skill may be Claude-rich; docs + optional procedure keep contract agents viable.

### Recommended locks (assumptions after declined AskUserQuestion; confirmed via Phase 1→2 go)

| # | Topic | Assumed lock | Implication |
|---|---|---|---|
| 1 | Archetype | **Planning/filing peer** (like starter), not a 4-phase task driver | No PLAN line required to *run* `/ft-spec`; output is a reviewable artifact |
| 2 | Output landing | **Review-first, optional write** to `.flowtron/specs/<slug>.md` | Default interactive; optional `--fast` skips some review friction but still no auto PLAN |
| 3 | Spec format | Fixed section order: Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach | Template in `templates/spec-template.md`; editable markdown, not a schema |
| 4 | Spec evolution | Living markdown; edit in place; no version machine | Mid-epic requirement change = edit the spec file + note in tasknote |
| 5 | Task decomposition | Spec's Tasks section suggests Flowtron types (epic / starter / micro / sidequest / PLAN one-liner) + handoff cues | Conversion remains operator/skill-driven (`/ft-epic-discovery`, `/ft-starter-task`, …) |
| 6 | Secondary scope | **Docs + soft Phase 3 / template guidance**; no hooks | EXTERNAL-AGENTS.md + optional template bullets + short guidance (SPEC or docs) |
| 7 | External agents | **Docs only** this epic; no helper skill unless dogfood demands | One agent per tasknote; worktree isolation; clean handoff/return |
| 8 | Adopter wiring | **Auto-wire into adopter subset** (symlink set) | Separate wiring child; MIGRATION "nine" → "ten" planning-adjacent skills |
| 9 | Child cohort | **M=4 + `.N` audit** | `.2` skill · `.3` wiring · `.4` docs/validation · `.5` dogfood |
| 10 | Hooks | **Out of scope** | May file Future one-liner only if dogfood resurfaces need |

### Open risks for implementation children

- **Scope creep into "Kiro clone"** — keep each child under one context window; epic goal is high-ROI subset only.
- **`.flowtron/specs/` as accidental subsystem** — document as optional operator scratchpad, not a parallel PLAN.
- **Validation wording vs VISION anti-validator stance** — "property-based tests where appropriate" must read as engineering guidance, not a schema/validator product.
- **Kiro CLI specifics** — EXTERNAL-AGENTS.md should stay tool-agnostic with Kiro as an example, not a hard dependency.

**Resolved scoping** (operator declined structured asks; locks = Discovery recommendations; Phase 1→2 **go** confirmed):

| Question | Resolution |
|---|---|
| Filing inputs | CORE / `spec-agent-validation` · High · `[heavy]🧠` · M=4 · keep `.N` audit · default (non-deep) flow |
| `/ft-spec` archetype | Planning/filing peer — not a 4-phase driver |
| Spec landing | Review-first; optional `.flowtron/specs/<slug>.md` |
| Secondary deliverables | EXTERNAL-AGENTS docs + soft validation guidance; **hooks out** |
| Child split | `.2` skill · `.3` wiring · `.4` docs/validation · `.5` dogfood |
| Spec versioning | Living markdown edit-in-place; no version schema |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cohort-children filing pattern per CORE-EPIC-351 / CORE-EPIC-330 (2-space indent under parent; `[model]` + emoji; em-dash separator; ≤50w target / 70w hard cap). No new shape.

- [x] Implemented the minimal solution — four child lines (CORE-352.2–.5) written under the parent between the completed `.1` and `.N` audit lines; parent long description refined to reflect locked scope (optional skill + docs, no phases/hooks/orchestration).

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface).

**Implementation Notes:**

- 4 child lines written; word counts: `.2` 21w · `.3` 16w · `.4` 20w · `.5` 16w · parent refined 23w — all under 50w target / 70w hard cap.
- M held at 4; audit `.N` suffix unchanged.
- Downstream-impact scan (active High/Medium/Low/Future only):
  - **CORE-EPIC-351** (viz advisories + update-adopters) — **unaffected** (no shared skill/docs/template surface with 352 children).
  - Medium/Low/Future empty or unrelated — **no downstream impact**; no reconcile edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass instead.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on PLAN.md CORE-EPIC-352 block:
- ✅ 2-space child indent on `.1`–`.5` and `.N`
- ✅ Bold IDs `**CORE-352.* **` intact
- ✅ `[model]` tag + emoji on every new line
- ✅ `| shortname` ≤30 chars (`external-and-validation` = 24)
- ✅ Em-dash separator consistent
- ✅ Long descriptions under 70w; no trailing whitespace

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (Discovery filing only)
  - `SPEC.md` — no change (contract edits land in implementation children)
  - `docs/MIGRATION.md` — no change (wiring child CORE-352.3)
  - `claude/AGENTS-snippet.md` — no change (wiring child)
  - `codex/AGENTS-snippet.md` — no change (wiring child)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change (wiring/skill inventory child)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-10.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed CORE-EPIC-352 and closed Discovery with four implementation children scoped for optional `/ft-spec` (planning peer), adopter wiring, external-agent + soft validation docs, and dogfood — hooks and new lifecycle phases explicitly out. Technical: M=4 held; child word counts 16–21w; parent description refined; no downstream PLAN reconcile; pure filing (no AI-referenced doc updates).

**Archived:** 2026-07-10
