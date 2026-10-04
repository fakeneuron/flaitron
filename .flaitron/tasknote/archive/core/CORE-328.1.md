---
title: cc-agent-alignment discovery
status: completed
tags: []
created: 2026-07-02
related-tasks: [CORE-EPIC-328, CORE-EPIC-224, CORE-EPIC-271, CORE-EPIC-154]
---

# CORE-328.1 | cc-agent-alignment discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-328]]

## 🎯 Goal

Scope the `CORE-EPIC-328` epic (`cc-agent-alignment`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-328.2..4` in `.flowtron/PLAN.md` — only those that clear a strict net-positive filter.

## ✅ Acceptance

- [ ] Current Claude Code agent-pattern surface mapped against flowtron's existing model (Agent Skills / SKILL.md dispatch, filesystem persistent state, autonomous/`--fast` loops, sub-agents, observability) — captured in Discovery Notes
- [ ] Prior-art drift check against CORE-EPIC-154 / 224 / 271 so no settled work is re-filed — captured in Discovery Notes
- [ ] Each candidate opportunity scored on the net-positive filter (friction/reliability/capability gain vs maintenance burden vs lightweight-ethos + VISION.md "won't accept") — captured in a scoring table
- [ ] Concrete child scopes for CORE-328.2 .. CORE-328.4 filed in `.flowtron/PLAN.md` (each line ≤50w target / 70w hard cap); children that fail the filter documented as won't-file
- [ ] Audit line CORE-328.5 reviewed and confirmed as-filed (or renumbered if N shifts)
- [ ] Phase 4 doc-drift sweep at closure: no AI-referenced doc updates expected in pure Discovery filing (doc edits land inside the children)

## 🧩 Subtasks

- [ ] Map Claude Code agent patterns (mid-2026) against flowtron's existing surface — log in Discovery Notes
- [ ] Drift check / archive skim vs CORE-EPIC-154 / 224 / 271 — log what's already built
- [ ] Score candidate opportunities against the net-positive filter + VISION.md "won't accept" — table in Discovery Notes
- [ ] Surface / confirm scope with the user (done via the entry AskUserQuestion: Discovery-decides · include audit · Medium · [heavy])
- [ ] Draft refined long descriptions for CORE-328.2 .. CORE-328.4; word-count each (≤50w / 70w cap)
- [ ] Phase 2: write child lines into `.flowtron/PLAN.md` under CORE-EPIC-328 with 2-space indent; downstream-impact reconciliation scan
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits
- [ ] Phase 4: doc-drift sweep + flip .1 line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-328]] — parent epic (cc-agent-alignment)
- [[CORE-EPIC-224]] — agent-compatibility-surface: built AGENT-COMPAT.md matrix + capability-trigger wiring (claude/CAPABILITIES.md) + last-verified currency
- [[CORE-EPIC-271]] — cross-agent-skill-projection: built SPEC/procedures/ agent-neutral SOPs + thin grok/codex pointer wrappers
- [[CORE-EPIC-154]] — multi-agent-portability: locked the contract/wiring split + sibling-dir plug-in pattern

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-epic-discovery` to bracket an in-progress exploration of flowtron ↔ Claude Code agent-pattern alignment. Scope is multi-child and gated by a strict net-positive filter; warrants the Discovery+Audit bracket. Entry AskUserQuestion locked: Discovery-decides-children · include audit · Medium · [heavy].

- [x] Read relevant source files — `SPEC.md`, `docs/PHILOSOPHY.md`, `SPEC/epic.md`, `templates/tasknote-template.md`, `.flowtron/tasknote/README.md`; plus a background-agent synthesis of `README.md`, `docs/VISION.md`, `docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `claude/AGENTS-snippet.md`, `SPEC/procedures/{README,ft-task}.md`, `claude/skills/ft-task/SKILL.md`.

- [x] **Archive skim** — read `CORE-224.1` (agent-compat) + `CORE-271.1` (skill-projection) Discovery tasknotes in `archive/core/`; indexed the CORE-154 cohort. Findings below.

- [x] **Drift check** — all cited surfaces exist at HEAD (`docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `SPEC/procedures/`, `grok/`, `codex/`, the 23 `claude/skills/*/SKILL.md`). No drift. The gaps below are genuine absences, not stale cites.

- [x] Asked clarifying questions OR logged "No clarifications needed" — resolved via the entry AskUserQuestion (vehicle / audit / priority+model). No further clarifications needed to file children.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### What's ALREADY built (drift check — do not re-file)

| Claude Code agent pattern | flowtron's existing answer | Built by |
|---|---|---|
| Agent Skills / SKILL.md + on-demand loading | Full `.claude/skills/*/SKILL.md` bundle, canonical two-field (`name`/`description`) frontmatter, lazy SPEC-module + `step-*.md` progressive disclosure | pre-existing |
| Filesystem persistent state | `PLAN.md` + `tasknote/<ID>.md` → `archive/<area>/`, git-versioned; no DB/daemon | pre-existing |
| Capability triggers (effort, `--fast`, `/model`, `/clear`, structured-ask) | `claude/CAPABILITIES.md` per-agent trigger reference | CORE-224.3 |
| Agent-compat matrix + currency | `docs/AGENT-COMPAT.md` + manual `last-verified` convention | CORE-EPIC-224 |
| Cross-agent skill projection | `SPEC/procedures/` neutral SOPs + thin `grok/`/`codex/` wrappers | CORE-EPIC-271 |
| Self-test / dogfood harness | `docs/DOGFOOD.md` pasteable procedure + dogfood-or-skip release gate | CORE-267/269 |
| Parallel work | git-worktree convention (`/ft-worktree-start`/`-end`, `wt-<ID>`) | CORE-EPIC-215 |
| Observability | read-only `viz/` Kanban (global instance) | pre-existing |

**Conclusion: the agent-alignment surface is mature.** Three prior epics built the compat/projection/trigger layers. The remaining net-positive space is narrow and documentation/convention-shaped — which is the *right* shape given VISION.md's rejections of machinery.

### Genuine gaps (from the map)

1. **No sub-agent / Task-tool concept anywhere.** Parallelism = worktrees + human-driven fresh sessions; no programmatic delegation notion.
2. **"One task per context window" is enforced socially, not mechanically** — it relies on the operator running `/clear` (the assistant cannot). An autonomous multi-task loop bypasses the discipline it depends on.
3. **Tasknotes-as-agent-memory is implicit, never positioned.** flowtron *is* a filesystem-memory layer for agents, but no doc frames it that way for heavy-agent adopters.
4. **SOP/skill duplication drift** (`SPEC/procedures/ft-task.md` hand-authored from the SKILL) — CORE-270 deferred a "generator epic."

### Net-positive filter — candidate scoring

| Candidate | Net-positive benefit | Downside / maintenance | Ethos fit | Verdict |
|---|---|---|---|---|
| **Tasknotes-as-agent-memory positioning** (gap 3) | Sharpens adopter pitch to heavy-agent users; sibling to the Obsidian positioning; zero machinery | +1 doc section to keep current | ✅ pure markdown, no moving parts | **FILE → .2** |
| **Skill-`description` dispatch audit** (Agent Skills on-demand loading) | Better agent auto-selection; edits existing frontmatter only | Low yield risk (descriptions already rich); bikeshed risk | ✅ additive, in-place | **FILE → .3** (bounded) |
| **Autonomous-loop / `/clear` guidance** (gaps 1+2) | Fills the biggest conceptual gap for autonomous-agent + sub-agent users; safe recommended pattern | Temptation to drift toward machinery — must stay doc-only | ✅ *if* descriptive-only (per VISION "won't accept") | **FILE → .4** (with guard) |
| **SOP/skill generator reconciliation** (gap 4) | Removes hand-author drift | A generator is a script → violates "Zero scripts"; manual reconcile = marginal | ⚠️ generator rejected; CORE-270 already deferred | **WON'T FILE** |
| **Programmatic sub-agent delegation machinery** | "True" parallel autonomy | New moving parts; heaviness; worktrees + .4 guidance already cover the need | ❌ against lightweight ethos | **WON'T FILE** |
| **New self-verify / reflection phase** | Agent self-checks | Existing gates (Relevance, drift check, pattern survey, doc-drift sweep) already cover; adding = bloat | ❌ scope creep | **WON'T FILE** |

Three candidates clear the filter (all doc/convention-level, no new moving parts) → N stays 5 (`.2`/`.3`/`.4` + audit `.5`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-224.1 / CORE-271.1 cohort filings are the precedent: 2-space child indent, `[model]` on every line, ` — ` em-dash, `| shortname` ≤30 chars, per-line ≤50w/70w cap. Extended that shape.

- [x] Implemented the minimal solution — wrote `.2`/`.3`/`.4` into `.flowtron/PLAN.md` between `.1` and audit `.5`.

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface).

**Implementation Notes:**

- 3 child lines written under `CORE-EPIC-328` (Medium section). Word counts (long-description only): `.2` ≈40w · `.3` ≈41w · `.4` ≈44w — all under the 50w target / 70w hard cap.
- Models: `.2`/`.4` `[heavy]` (positioning + gap-guidance are judgment-heavy prose); `.3` `[medium]` (audit-and-fix across 23 descriptions — well-scoped, not pure-mechanical). Parent + `.1` + audit `.5` stay `[heavy]` per the entry ask.
- **No audit-number bump** — N stays 5; audit remains `.5`. The three filtered candidates matched the provisional slot count exactly.
- **Won't-file (documented in Discovery scoring table):** SOP/skill generator reconciliation (generator = script → "Zero scripts"; CORE-270 already deferred), programmatic sub-agent delegation machinery (heaviness), new self-verify/reflection phase (existing gates cover; bloat). Each is a VISION "won't accept" or lightweight-ethos fail.
- **Downstream-impact reconciliation:** active board empty pre-cohort → no downstream impact.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose filing only).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the 3 new PLAN.md lines: 2-space child indent ✓ · bold `**CORE-328.N**` IDs ✓ · `[model]` token present ✓ · `| <shortname>` ≤30 chars ✓ · ` — ` em-dash separator ✓ · ≤70w hard cap ✓ · no trailing whitespace ✓ · backtick/quote inline code renders ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`): **no change**. This is a pure Discovery filing; any doc edits land inside children `.2`/`.4` (and possibly `.3`), not here.

- [x] Closed — `.1` PLAN.md line flipped to stub form `Completed 2026-07-02.`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the 📦 conditional-skip marker).

**Final Summary:**

Filed `CORE-EPIC-328` (`cc-agent-alignment`) + its `.1` Discovery + `.5` audit, then drove the Discovery to closure. Key finding: the Claude Code agent-alignment surface is already mature — CORE-EPIC-154/224/271 built the contract/wiring split, the AGENT-COMPAT matrix + capability-trigger wiring, and the cross-agent SOP projection — so the net-positive space is narrow and documentation-shaped. Applied a strict net-positive filter (benefit vs maintenance vs VISION "won't accept") to six candidates; three cleared and were filed as children `.2` agent-memory-positioning · `.3` skill-description-dispatch-audit · `.4` autonomous-loop-guidance (all doc/convention-level, zero new machinery). Three rejected (generator, sub-agent machinery, new reflection phase) as ethos/won't-accept fails. N unchanged at 5; audit stays `.5`.

**Archived:** 2026-07-02
